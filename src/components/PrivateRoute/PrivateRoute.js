import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppState } from 'components/AppState';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const [{currentUser}] = useAppState();
    console.log('PrivateRoute', roles, rest);

    return (
        <Route {...rest} render={props => {
            
            if (!currentUser) {
                // not logged in so redirect to login page with the return url
                return <Redirect to="/Home" />
            }

            // if(currentUser && currentUser.user && currentUser.user.role == Role.SuperAdmin) {
            //     if(!selectedInstitute && props.location && (props.location.pathname != "/" && props.location.pathname != "/home")
            //         && props.location.pathname != "/admin/superadmin") {
            //         return <Redirect to={{ pathname: '/home', state: {from: props.location, message: "You need to select an institute first!"}}} />
            //     }
            // }

            if(currentUser.user) {
                if (roles && roles.indexOf(currentUser.user.role) === -1) {
                    return <Redirect to="/Home" />
                }
            }

            // authorised so return component
            return <Component {...props} />
        }} />
    );
}
