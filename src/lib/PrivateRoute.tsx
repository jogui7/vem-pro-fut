import { Redirect, Route, RouteProps } from 'react-router-dom';
import useFirebase from '../hooks/useFirebase';

const PrivateRoute = (props: RouteProps) => {
  const { auth } = useFirebase();

  if (auth) {
    return <Route {...props} />;
  }

  return <Redirect to="/login" />;
};

export default PrivateRoute;
