import React from 'react';
import { Route as ReactDOMRoute, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/auth';
import DefaultLayout from '../pages/_layouts/default';
import AuthLayout from '../pages/_layouts/auth';

const Route = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth();

  console.log(user);

  if (!user && isPrivate) {
    return <Redirect to="/" />;
  }

  if (user && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  const Layout = user ? DefaultLayout : AuthLayout;

  return (
    <ReactDOMRoute
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );

  // return (
  //   <ReactDOMRoute
  //     {...rest}
  //     render={({ location }) => {
  //       return isPrivate === !!user ? (
  //         <Layout>
  //           <Component />
  //         </Layout>
  //       ) : (
  //         <Redirect
  //           to={{
  //             pathname: isPrivate ? '/' : '/dashboard',
  //             state: { from: location }
  //           }}
  //         />
  //       );
  //     }}
  //   />
  // );
};

export default Route;
