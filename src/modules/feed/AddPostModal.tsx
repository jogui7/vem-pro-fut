import {
  collection, addDoc, Timestamp, doc, setDoc,
} from 'firebase/firestore';
import {
  Dialog, DialogTitle, Box, DialogContent, Grid, Button, makeStyles,
} from '@material-ui/core';
import { Form } from 'react-final-form';
import * as yup from 'yup';
import { useState } from 'react';
import RFFDatePicker from '../../components/ReactFinalForms/RFFDatePicker';
import RFFTextField from '../../components/ReactFinalForms/RFFTextField';
import yupValidation from '../../lib/yupValidation';
import datePickerConfig from '../../utils/datePickerConfig';
import inputConfig from '../../utils/inputConfig';
import { useApplicationContext } from '../context/ApplicationContext';
import useFirebase from '../../hooks/useFirebase';

const useStyles = makeStyles(() => ({
  iframe: {
    aspectRatio: '1.45',
    border: 'none',
  },
}));

type AddPostModalProps = {
  open: boolean;
  handleClose: () => void;
  reload: () => void;
};

const addPostSchema = yup.object().shape({
  address: yup.string().trim().required('Obrigatório'),
  date: yup.string().trim().required('Obrigatório'),
  description: yup.string().trim().required('Obrigatório'),
});

const validate = async (values: any) => yupValidation(addPostSchema)({ ...values });

const AddPostModal = ({ open, handleClose, reload }: AddPostModalProps) => {
  const [address, setAddress] = useState();
  const { state } = useApplicationContext();
  const { firestore, app } = useFirebase();

  const classes = useStyles();

  const formHandleSubmit = async (values: any) => {
    if (state.user) {
      const connectionCol = collection(firestore, 'posts');

      const response = await addDoc(connectionCol, {
        ...values,
        date: Timestamp.fromDate(values.date.toDate()),
        ownerId: state.user.id,
        ownerName: state.user.name,
      });

      const participantsCol = collection(firestore, 'posts', response.id, 'users');
      const participantsDoc = doc(participantsCol, state.user.id);

      await setDoc(participantsDoc, {
        ...state.user,
      });

      handleClose();

      reload();
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        <Box p={1}>adicionar publicação</Box>
      </DialogTitle>
      <DialogContent>
        <Box p={1}>
          <Form onSubmit={formHandleSubmit} validate={validate}>
            {({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <RFFTextField
                      label="endereço"
                      name="address"
                      InputProps={{
                        endAdornment: (
                          <Button variant="text" color="primary" onClick={() => setAddress(values.address)}>
                            validar
                          </Button>
                        ),
                      }}
                      {...inputConfig}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <RFFDatePicker
                      label="data"
                      name="date"
                      {...datePickerConfig}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <RFFTextField
                      label="descrição"
                      name="description"
                      multiline
                      rows={4}
                      {...inputConfig}
                    />
                  </Grid>
                  {address && (
                    <Grid item xs={12}>
                      <iframe
                        className={classes.iframe}
                        title="aaa"
                        width="100%"
                        allowFullScreen
                        src={`https://www.google.com/maps/embed/v1/place?key=${app.options.apiKey}&q=${address}`}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Grid container spacing={3} justifyContent="flex-end">
                      <Grid item xs={12} sm={4}>
                        <Button variant="text" onClick={handleClose} color="primary" fullWidth>cancelar</Button>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>criar</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            )}
          </Form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddPostModal;
