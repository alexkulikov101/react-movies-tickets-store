import { createContext } from 'react';

interface ITicketContext {
    tickets: Array<object>;
    error: null;
    loading: boolean;
    filtered: object[];
    deleteTicket(_id: any): void;
    getTickets(): void;
    clearTickets(): void;
    filterTickets(text: string): void;
    clearFilter(): void;
    updateScreeningRoom(screeningId: string, row: string, seat: string): void;
}

const ticketContext = createContext<ITicketContext | null>(null);

export default ticketContext;
