
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin,isSubscribed } from '../utils';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogin() && isSubscribed() ?
                <Component {...props} />
            : ( isLogin() ? 
            <Redirect to="/subscription" />
            : <Redirect to="/login" /> )
        )} />
    );
};

export default PrivateRoute;