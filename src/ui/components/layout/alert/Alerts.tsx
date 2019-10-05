import React, { useContext } from 'react';
import AlertContext from '../../../context/alert/alertContext';
import './Alert.scss';

// interface IItems {
//     id: string,
//     msg: string,
//     type: string
// }

const Alerts = () => {
    const alertContext = useContext(AlertContext);

    return (
        alertContext.alerts.length > 0 &&
        alertContext.alerts.map((alert: any) => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle" /> {alert.msg}
            </div>
        ))
    );
};

export default Alerts;
