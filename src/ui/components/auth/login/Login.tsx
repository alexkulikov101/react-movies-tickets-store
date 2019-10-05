import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';
import './Login.scss';

interface Props {
    history: Array<string>;
}

const Login = (props: Props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'Ivalid Credentials') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const { email, password } = user;

    const onChange = (e: { target: { name: string | number; value: string | number } }) =>
        setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please fill in all fields', 'danger');
        } else {
            login({
                email,
                password,
            });
        }
    };

    return (
        <div className="form-container container  ">
            <h1 className="form-title">
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} required placeholder={'Email'} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        //required
                        placeholder={'Password'}
                    />
                </div>
                <input type="submit" value="Sign In" className="form-btn" />
            </form>
            <p className="form-text">
                Dont have an account?
                <Link to="/register">Sign up!</Link>
            </p>
        </div>
    );
};

export default Login;
