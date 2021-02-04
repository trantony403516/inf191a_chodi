import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isLogin = () => {
  if(localStorage.getItem("user") != null) {
    return true;
  }
  return false;
}

const PrivateRoute = ({ component: Component, user, ...rest }) => (
    <Route {...rest} render={props => (
      isLogin()
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )

  export default PrivateRoute;