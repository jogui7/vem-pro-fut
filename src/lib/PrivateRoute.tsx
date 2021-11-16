import { Redirect, Route, RouteProps } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import useFirebase from '../hooks/useFirebase';

const PrivateRoute = (props: RouteProps) => {
  const firebase = useFirebase();
  if (getAuth(firebase).currentUser) {
    return <Route {...props} />;
  }

  return <Redirect to="/login" />;
};

export default PrivateRoute;
