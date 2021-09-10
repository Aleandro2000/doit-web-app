
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin, isSubscribed } from '../utils';

const GatewayRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogin() && !isSubscribed() ?
                <Component {...props} />
            : ( isLogin() ? 
            <Redirect to="/dashboard" />
            : <Redirect to="/login" /> )
        )} />
    );
};

export default GatewayRoute;