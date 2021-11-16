import { Redirect, Route, RouteProps } from 'react-router-dom';

export type SecureRouteConfig = {
  name: string;
};

export type SecureRouteProps = {
  logged: boolean;
  disabled?: boolean;
} & RouteProps;

export const hasAccessToSecureRoute = (logged: boolean) => logged;

const SecureRoute = ({
  logged,
  disabled,
  key,
  ...props
}: SecureRouteProps & { key?: string }) => {
  if (disabled) {
    return <Redirect to="/" />;
  }

  if (hasAccessToSecureRoute(logged)) {
    return <Route {...props} key={key} />;
  }

  return <Redirect key={key} to="/" />;
};

SecureRoute.defaultProps = {
  key: undefined,
};

export default SecureRoute;
