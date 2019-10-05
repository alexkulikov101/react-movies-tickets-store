import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

interface IProps {
    component: any;
    path: string;
    exact?: boolean;
}

const PrivateRoute = ({ component: Component, ...rest }: IProps) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading } = authContext;
    return (
        <Route
            {...rest}
            render={props => (!isAuthenticated && !loading ? <Redirect to="/login" /> : <Component {...props} />)}
        />
    );
};

export default PrivateRoute;
