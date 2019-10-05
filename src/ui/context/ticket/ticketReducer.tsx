import {
    GET_TICKETS,
    DELETE_TICKET,
    TICKET_ERROR,
    FILTER_TICKETS,
    CLEAR_FILTER_TICKETS,
    CLEAR_TICKETS,
    STUB,
} from '../types';
import moment from 'moment';

export default (state: any, action: { type: string; payload: any }) => {
    switch (action.type) {
        case GET_TICKETS:
            return {
                ...state,
                tickets: action.payload,
                loading: false,
            };
        case DELETE_TICKET:
            return {
                ...state,
                tickets: state.tickets.filter((item: any) => item._id !== action.payload),
                filtered: state.tickets.filter((item: any) => item._id !== action.payload),
                loading: false,
            };
        case FILTER_TICKETS:
            return {
                ...state,
                filtered: state.tickets.filter((item: any) => {
                    const today = new Date();

                    switch (action.payload) {
                        case 'Upcoming':
                            if (moment(new Date(today.toISOString().substring(0, 10))).isBefore(item.date)) {
                                return item;
                            }
                            break;
                        case 'Past':
                            if (moment(new Date(today.toISOString().substring(0, 10))).isAfter(item.date)) {
                                return item;
                            }
                            break;
                        case 'All':
                            return item;
                            break;
                        default:
                            break;
                    }
                }),
            };
        case CLEAR_FILTER_TICKETS:
            return {
                ...state,
                filtered: null,
            };
        case TICKET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case CLEAR_TICKETS:
            return {
                ...state,
                tickets: null,
                error: null,
            };
        case STUB:
            return state;
        default:
            return state;
    }
};
