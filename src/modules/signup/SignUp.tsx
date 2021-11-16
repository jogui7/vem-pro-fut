import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import classnames from 'classnames';
import { useState } from 'react';
import { Form } from 'react-final-form';
import { Redirect, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@material-ui/core';
import ButtonWithFeedback, { ButtonStatusVariant } from '../../components/ButtonWithFeedback';
import Logo from '../../components/Logo';
import RFFPassword from '../../components/ReactFinalForms/RFFPassword';
import RFFTextField from '../../components/ReactFinalForms/RFFTextField';
import yupValidation from '../../lib/yupValidation';
import useFirebase from '../../hooks/useFirebase';
import useLoginStyles from '../login/useLoginStyles';

const SignUp = () => {
  const [signUpStatus, setSignUpStatus] = useState<ButtonStatusVariant>('normal');
  const loginClasses = useLoginStyles();
  const firebase = useFirebase();
  const history = useHistory();

  const loginSchema = yup.object().shape({
    email: yup.string()
      .trim()
      .required('Obrigatório')
      .email('email inválido'),
    confirmPassword: yup
      .string()
      .trim()
      .required('Obrigatório')
      .equals([yup.ref('password')], 'as senhas não estão iguais')
      .min(8, 'Mínimo de oito caracteres'),
    password: yup.string().trim().required('Obrigatório'),
  });

  const validate = async (values: any) => yupValidation(loginSchema)({ ...values });

  const formHandleSubmit = async ({ email, password }: { email: string, password: string }) => {
    setSignUpStatus('loading');
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSignUpStatus('success');
    } catch (e) {
      setSignUpStatus('error');
    }
  };

  if (getAuth(firebase).currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className={loginClasses.background}>
      <Paper
        className={classnames(loginClasses.paper, loginClasses.root)}
        elevation={0}
      >
        <Container maxWidth="xs" disableGutters>
          <Grid container justify="center" spacing={3}>
            <Grid item xs={8}>
              <Logo primary />
            </Grid>
            <Grid item xs={12}>
              <Form onSubmit={formHandleSubmit} validate={validate}>
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} direction="column">
                      <Grid item>
                        <RFFTextField
                          fullWidth
                          label="E-mail"
                          name="email"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item>
                        <RFFPassword
                          helperText="A senha deve conter no mínimo 8 characteres"
                          fullWidth
                          label="senha"
                          name="password"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item>
                        <RFFPassword
                          helperText="A senha deve conter no mínimo 8 characteres"
                          fullWidth
                          label="confirmar senha"
                          name="confirmPassword"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2} justify="flex-end">
                          <Grid item xs={12} sm={6}>
                            <Button
                              size="medium"
                              variant="text"
                              onClick={() => history.push('/login')}
                              fullWidth
                            >
                              voltar
                            </Button>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <ButtonWithFeedback
                              loadingLabel="Aguarde..."
                              successLabel="bem-vindo"
                              errorLabel="ops!"
                              status={signUpStatus}
                              variant="contained"
                              size="large"
                              color="primary"
                              type="submit"
                              fullWidth
                            >
                              cadastrar-se
                            </ButtonWithFeedback>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Form>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </div>
  );
};

export default SignUp;
