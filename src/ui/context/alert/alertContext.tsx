import { createContext } from 'react';

interface IAlertContext {
    setAlert: (msg: string, type: string, timeout?: number) => void;
    alerts?: any;
}

const AlertContext = createContext<IAlertContext | null>(null);

export default AlertContext;
