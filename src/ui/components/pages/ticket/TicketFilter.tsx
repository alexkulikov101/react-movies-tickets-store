import React, { useContext, useState, useEffect } from 'react';
import TicketContext from '../../../context/ticket/ticketContext';

const TicketFilter = () => {
    const ticketContext = useContext(TicketContext);
    const { filterTickets } = ticketContext;

    const [state, setState] = useState({
        isActiveLinkAll: false,
        isActiveLinkUpcoming: false,
        isActiveLinkPast: false,
    });

    useEffect(() => {
        setState({
            ...state,
            isActiveLinkAll: true,
            isActiveLinkUpcoming: false,
            isActiveLinkPast: false,
        });
    }, []);
    const handleClick = (e: any) => {
        filterTickets(e.target.value);
        if (e.target.value === 'All') {
            setState({
                ...state,
                isActiveLinkAll: true,
                isActiveLinkUpcoming: false,
                isActiveLinkPast: false,
            });
        }
        if (e.target.value === 'Upcoming') {
            setState({
                ...state,
                isActiveLinkAll: false,
                isActiveLinkUpcoming: true,
                isActiveLinkPast: false,
            });
        }
        if (e.target.value === 'Past') {
            setState({
                ...state,
                isActiveLinkAll: false,
                isActiveLinkUpcoming: false,
                isActiveLinkPast: true,
            });
        }
    };

    return (
        <ul className="ticket__filter-list">
            <li className="ticket__filter-item">
                <input
                    className={`ticket__filter-btn` + ' ' + (state.isActiveLinkAll ? `ticket__filter-btn-active` : '')}
                    type="button"
                    value="All"
                    onClick={handleClick}
                />
            </li>
            <li className="ticket__filter-item">
                <input
                    className={
                        `ticket__filter-btn` + ' ' + (state.isActiveLinkUpcoming ? `ticket__filter-btn-active` : '')
                    }
                    type="button"
                    value="Upcoming"
                    onClick={handleClick}
                />
            </li>
            <li className="ticket__filter-item">
                <input
                    className={`ticket__filter-btn` + ' ' + (state.isActiveLinkPast ? `ticket__filter-btn-active` : '')}
                    type="button"
                    value="Past"
                    onClick={handleClick}
                />
            </li>
        </ul>
    );
};

export default TicketFilter;
