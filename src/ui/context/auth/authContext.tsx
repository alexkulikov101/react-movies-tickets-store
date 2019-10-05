import { createContext } from 'react';

interface IUser {
    _id: string;
    data: string;
    email: string;
    name: string;
}

interface IAuthContext {
    token?: string;
    isAuthenticated?: boolean;
    loadUser?: () => Promise<void>;
    error?: null;
    loading?: boolean;
    user?: IUser;
    login: any;
    logout(): void;
    register?: any;
    clearErrors?: any;
}

const AuthContext = createContext<IAuthContext | null>(null);

export default AuthContext;
