import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MIN_PASSWORD_LENGTH } from '../../../utils/Variables';
import AlertContext from '../../../context/alert/alertContext';
import AuthContext from '../../../context/auth/authContext';
import './Register.scss';

interface IInputValidation {
    history: Array<string>;
    minLength?: number;
}

const Register: React.FC<IInputValidation> = (props: IInputValidation) => {
    const { setAlert } = useContext(AlertContext);
    const { register, error, clearErrors, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'User already exists') {
            setAlert(error, 'danger');
            clearErrors();
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        passwordRepeated: '',
    });

    const { name, email, password, passwordRepeated } = user;

    const onChange = (e: { target: { name: string | number; value: string | number } }) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert('PLease enter all field', 'danger');
        } else if (password !== passwordRepeated) {
            setAlert('Password do not match ', 'danger');
        } else {
            register({
                name,
                email,
                password,
            });
        }
    };
    return (
        <div className="form-container container">
            <h1 className="form-title">
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} placeholder={'Username'} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} placeholder={'Email'} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        minLength={MIN_PASSWORD_LENGTH}
                        placeholder={'Password'}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordRepeated">Confirm Password</label>
                    <input
                        type="password"
                        name="passwordRepeated"
                        value={passwordRepeated}
                        onChange={onChange}
                        minLength={MIN_PASSWORD_LENGTH}
                        placeholder={'Repeat Password'}
                    />
                </div>
                <input type="submit" value="Sign Up" className="form-btn" />
            </form>
            <p className="form-text">
                Already have an account?
                <Link to="/login">Sign in!</Link>
            </p>
        </div>
    );
};

export default Register;
