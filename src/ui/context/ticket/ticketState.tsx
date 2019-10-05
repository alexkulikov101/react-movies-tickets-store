import React, { useReducer } from 'react';
import axios from 'axios';
import { url } from '../../utils/Variables';
import ticketContext from './ticketContext';
import ticketReducer from './ticketReducer';

import {
    GET_TICKETS,
    DELETE_TICKET,
    TICKET_ERROR,
    FILTER_TICKETS,
    CLEAR_FILTER_TICKETS,
    CLEAR_TICKETS,
    STUB,
} from '../types';

interface IInitialState {
    tickets: Array<object>;
    error: null;
    loading: boolean;
    filtered: object[];
}
const TicketState = (props: any) => {
    const initialState: IInitialState = {
        tickets: null,
        error: null,
        loading: true,
        filtered: null,
    };

    const [state, dispatch] = useReducer(ticketReducer, initialState);

    //Get Tickets
    const getTickets = async () => {
        try {
            const res = await axios.get(`${url}/tickets`);
            dispatch({
                type: GET_TICKETS,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: TICKET_ERROR,
                payload: err.response.msg,
            });
        }
    };

    //Delete Ticket
    const deleteTicket = async (id: any) => {
        try {
            await axios.delete(`${url}/tickets/${id}`);
            dispatch({
                type: DELETE_TICKET,
                payload: id,
            });
        } catch (err) {
            dispatch({
                type: TICKET_ERROR,
                payload: err.response.msg,
            });
        }
    };
    //Clear Tickets
    const clearTickets = () => {
        dispatch({
            type: CLEAR_TICKETS,
            payload: null,
        });
    };

    //Filter Tickets
    const filterTickets = (text: string) => {
        dispatch({
            type: FILTER_TICKETS,
            payload: text,
        });
    };

    //Clear Filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER_TICKETS,
            payload: null,
        });
    };
    //Update Screening Room
    const updateScreeningRoom = async (screeningId: string, row: string, seat: string) => {
        const data = {
            row: row,
            seat: seat,
        };
        try {
            await axios.put(`${url}/screenings/${screeningId}`, data);

            dispatch({
                type: DELETE_TICKET,
                payload: null,
            });
        } catch (err) {
            dispatch({
                type: TICKET_ERROR,
                payload: err.response.msg,
            });
        }
    };
    return (
        <ticketContext.Provider
            value={{
                tickets: state.tickets,
                loading: state.loading,
                filtered: state.filtered,
                error: state.error,
                deleteTicket,
                getTickets,
                clearTickets,
                filterTickets,
                clearFilter,
                updateScreeningRoom,
            }}
        >
            {props.children}
        </ticketContext.Provider>
    );
};

export default TicketState;
