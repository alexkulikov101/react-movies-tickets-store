import { SET_ALERT, REMOVE_ALERT } from '../types';

export default (state: any, action: any) => {
    switch (action.type) {
        case SET_ALERT:
            return [...state, action.payload];
        case REMOVE_ALERT:
            return state.filter((alert: { id: string | number }) => alert.id !== action.payload);
        default:
            return state;
    }
};
