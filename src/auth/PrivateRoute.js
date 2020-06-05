import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';


const PrivateRoute = ({ component: Component, ...rest }) => (
    // If the user is authenticated then we render the component, otherwise we redirect them.
    // props means we can pass down components to this PrivateRoute component
    <Route {...rest} render={props => isAuthenticated() ? (
        <Component {...props} />
    ) : (
        <Redirect
            to={{
                pathname: "/signin",
                state: {from: props.location}
            }}
        />
    )}/>
);

export default PrivateRoute;
