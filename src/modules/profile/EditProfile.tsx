import {
  Grid, Typography, Button, Box,
} from '@material-ui/core';
import { collection, doc, updateDoc } from 'firebase/firestore';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Form } from 'react-final-form';
import * as yup from 'yup';
import ButtonWithFeedback, { ButtonStatusVariant } from '../../components/ButtonWithFeedback';
import RFFDropzone from '../../components/ReactFinalForms/RFFDropzone';
import RFFSelect from '../../components/ReactFinalForms/RFFSelect';
import RFFTextField from '../../components/ReactFinalForms/RFFTextField';
import useFirebase from '../../hooks/useFirebase';
import useUpload from '../../hooks/useUpload';
import yupValidation from '../../lib/yupValidation';
import inputConfig from '../../utils/inputConfig';
import { useApplicationContext } from '../context/ApplicationContext';
import { User } from '../context/types';

const loginSchema = yup.object().shape({
  name: yup.string().trim().required('Obrigatório'),
  city: yup.string().trim().nullable().required('Obrigatório'),
  state: yup.string().trim().nullable().required('Obrigatório'),
});

const validate = async (values: any) => yupValidation(loginSchema)({ ...values });

type EditProfileProps = {
  toggleEdit: () => void;
  initialValues?: User;
  getUser: () => Promise<void>;
};

const EditProfile = ({ toggleEdit, getUser, initialValues }: EditProfileProps) => {
  const [UFs, setUFs] = useState<{ value: string; label: string; }[]>([]);
  const [cities, setCities] = useState<{ value: string; label: string; }[]>([]);
  const [selectedUF, setSelectedUF] = useState('');
  const [status, setStatus] = useState<ButtonStatusVariant>();
  const { state } = useApplicationContext();
  const { firestore } = useFirebase();
  const upload = useUpload();

  const formHandleSubmit = async (data: any) => {
    setStatus('loading');
    try {
      const users = collection(firestore, 'users');

      const city = cities.find(item => item.value === data.city);
      const uf = UFs.find(item => item.value === data.state);

      await updateDoc(doc(users, state?.user?.id), {
        ...data,
        city: city?.label,
        state: uf?.label,
      });
      await getUser();
      setStatus('success');
    } catch (e) {
      setStatus('error');
    }
  };

  const fetchCities = useCallback(async () => {
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`);

    if (response.ok) {
      const data = await response.json();
      setCities(data.map((city: { id: string; nome: string; }) =>
        ({ value: city.id, label: city.nome })));
    }
  }, [selectedUF]);

  const fetchUFs = useCallback(async () => {
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');

    if (response.ok) {
      const data = await response.json();
      setUFs(data.map((uf: { id: string; sigla: string; }) => ({ value: uf.id, label: uf.sigla })));
    }
  }, [setUFs]);

  useEffect(() => {
    fetchUFs();
  }, [fetchUFs]);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const formatValue = async (file: File) => upload.image(file);

  const initialValuesA = useMemo(() => {
    const uf = UFs.find(item => item.label === initialValues?.state)?.value;
    if (uf) setSelectedUF(uf);
    return ({
      ...initialValues,
      state: uf,
      city: cities.find(item => item.label === initialValues?.city)?.value,
    });
  }, [initialValues, UFs, cities]);

  return (
    <Form onSubmit={formHandleSubmit} validate={validate} initialValues={initialValuesA}>
      {({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs="auto">
                  <Box
                    maxWidth={250}
                    maxHeight={250}
                  >
                    <RFFDropzone
                      name="avatar"
                      acceptTypes={['image/*']}
                      formatValue={formatValue}
                      defaultValue={values.avatar}
                    />
                  </Box>
                </Grid>
                <Grid item xs>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <RFFTextField
                        label="nome"
                        name="name"
                        {...inputConfig}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <RFFSelect
                        label="estado"
                        name="state"
                        formControlProps={{ size: 'small' }}
                        items={UFs}
                        inputProps={{
                          onChange: (e: any) =>
                            setSelectedUF(e.target.value),
                        }}
                        {...inputConfig}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <RFFSelect
                        label="cidade"
                        name="city"
                        formControlProps={{ size: 'small' }}
                        items={cities}
                        disabled={!values.state}
                        {...inputConfig}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h6">sobre</Typography>
                </Grid>
                <Grid item xs={12}>
                  <RFFTextField
                    name="about"
                    multiline
                    rows={5}
                    {...inputConfig}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1} justifyContent="flex-end">
                <Grid item xs={12} sm={3}>
                  <Button
                    size="medium"
                    variant="text"
                    onClick={toggleEdit}
                    fullWidth
                  >
                    {status === 'success' ? 'voltar' : 'cancelar'}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <ButtonWithFeedback
                    loadingLabel="aguarde..."
                    successLabel="alterações salvas"
                    errorLabel="ops!"
                    status={status}
                    variant="contained"
                    size="medium"
                    color="primary"
                    type="submit"
                    fullWidth
                  >
                    salvar
                  </ButtonWithFeedback>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
};

EditProfile.defaultProps = {
  initialValues: undefined,
};

export default EditProfile;
