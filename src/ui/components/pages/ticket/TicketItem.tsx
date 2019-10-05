import React, { useContext } from 'react';
import TicketContext from '../../../context/ticket/ticketContext';

interface IProps {
    ticket: any;
}

const TicketItem: React.FC<IProps> = ({ ticket }) => {
    const { img, name, date, time, row, seat, _id, screeningId } = ticket;
    const ticketContext = useContext(TicketContext);
    const { deleteTicket, updateScreeningRoom } = ticketContext;

    const onDelete = () => {
        deleteTicket(_id);
        updateScreeningRoom(screeningId, row, seat);
    };

    return (
        <li className="ticket__item">
            <p className="ticket__item-left">
                <img className="ticket__item-img" src={img} alt={name} />
            </p>
            <p className="ticket__item-right">
                <span className="ticket__item-name">{name}</span>
                <span className="ticket_item-date">{date}</span>
                <span className="ticket_item-time">{time}</span>
                <span className="ticket__item-place">
                    <span className="ticket__item-row">Row {row}, </span>
                    <span className="ticket__item-seat">Seat {seat}</span>
                </span>
            </p>
            <button className="ticket__btn" onClick={onDelete}>
                <i className="far fa-trash-alt ticket__btn-icon"></i>
                <span className="ticket__btn-text">Delete</span>
            </button>
        </li>
    );
};

export default TicketItem;
