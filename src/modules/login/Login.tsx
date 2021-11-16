import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import { useState } from 'react';
import { Form } from 'react-final-form';
import { Link, Redirect, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@material-ui/core';
import ButtonWithFeedback, { ButtonStatusVariant } from '../../components/ButtonWithFeedback';
import Logo from '../../components/Logo';
import RFFPassword from '../../components/ReactFinalForms/RFFPassword';
import RFFTextField from '../../components/ReactFinalForms/RFFTextField';
import yupValidation from '../../lib/yupValidation';
import useLoginStyles from './useLoginStyles';
import useFirebase from '../../hooks/useFirebase';

const wrongCredentialsMessage = 'Usuário ou senha inválidos';

const Login = () => {
  const [loginStatus, setLoginStatus] = useState<ButtonStatusVariant>('normal');
  const loginClasses = useLoginStyles();
  const firebase = useFirebase();
  const history = useHistory();

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required('Obrigatório')
      .email('email inválido'),
    password: Yup.string().trim().required('Obrigatório'),
  });

  const validate = async (values: any) => yupValidation(loginSchema)({ ...values });

  const formHandleSubmit = async ({ email, password }: { email: string, password: string }) => {
    setLoginStatus('loading');
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoginStatus('success');
    } catch (e) {
      setLoginStatus('error');
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
                        <Grid container>
                          <Grid item>
                            <Typography variant="body2">
                              <Link
                                to="/recuperar-senha"
                                className={loginClasses.link}
                              >
                                esqueceu sua senha?
                              </Link>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2} justify="flex-end">
                          <Grid item xs={12} sm={6}>
                            <Button
                              size="medium"
                              variant="text"
                              onClick={() => history.push('/cadastre-se')}
                              fullWidth
                            >
                              cadastrar-se
                            </Button>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <ButtonWithFeedback
                              loadingLabel="Aguarde..."
                              successLabel="bem-vindo"
                              errorLabel={wrongCredentialsMessage}
                              status={loginStatus}
                              variant="contained"
                              size="large"
                              color="primary"
                              type="submit"
                              fullWidth
                            >
                              ENTRAR
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

export default Login;
