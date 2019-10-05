import * as React from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import SetAuthToken from '../../utils/SetAuthToken';
import { url } from '../../utils/Variables';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
} from '../types';
import 'babel-polyfill';

interface IInitialState {
    token: string;
    isAuthenticated: boolean;
    loading: boolean;
    user: null;
    error: null;
}

const AuthState = (props: any) => {
    const initialState: IInitialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null,
    };

    const [state, dispatch] = React.useReducer(authReducer, initialState);

    //Load User
    const loadUser = async () => {
        //@to-do - load token into glodal header
        if (localStorage.token) {
            SetAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get(`${url}/api/auth`);

            dispatch({
                type: USER_LOADED,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
                payload: null,
            });
        }
    };

    //Register User
    interface IFormDataReg {
        name: string;
        email: string;
        password: string;
    }
    const register = async (formData: IFormDataReg) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const res = await axios.post(
                `${url}/api/users`,

                formData,
                config,
            );
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg,
            });
        }
    };

    //Login User
    interface IFormDataLog {
        email: string;
        password: string;
    }
    const login = async (formData: IFormDataLog) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post(`${url}/api/auth`, formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });

            loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg,
            });
        }
    };

    //Logout
    const logout = () => {
        dispatch({
            type: LOGOUT,
            payload: null,
        });
    };

    //Clear Errors
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS,
            payload: null,
        });
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
