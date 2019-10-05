import React, { useState } from 'react';
import Portal from '../../../utils/Portal';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './Modal.scss';

interface IProps {
    showModal: boolean;
    selectedSeats: Array<any>;
    time: string;
    day: string;
    movieName: string;
}
const Modal = (props: IProps) => {
    const { showModal, selectedSeats, time, day, movieName } = props;

    const [state, setState] = useState({
        show: showModal,
    });

    // const handleClose = (e: any) => {
    //     e.preventDefault();
    //     setState({
    //         ...state,
    //         show: false,
    //     });
    // };
    return (
        <>
            {state.show && (
                <Portal>
                    <div className="modal-overlay">
                        <div className="modal-window">
                            <div className="modal-header">
                                <h3 className="modal-title">Booking successful!</h3>
                            </div>
                            <div className="modal-body">
                                <span className="modal-movie-name">{movieName}</span>
                                <span className="modal-movie-date">{moment(new Date(day)).format('ll')}</span>
                                <span className="modal-movie-time">{time}</span>
                                {selectedSeats.map((item: string, index: number) => (
                                    <React.Fragment key={index + item}>
                                        <p className="modal-movie-row-seat" key={index + item}>
                                            <span className="modal-movie-row" key={index + item}>
                                                {index === 0 ? (index = index + 1) : (index = index + 1)}. Row {item[0]}
                                                ,{' '}
                                            </span>
                                            <span className="modal-movie-seat" key={index + item}>
                                                seat {item[1]}{' '}
                                            </span>
                                        </p>
                                    </React.Fragment>
                                ))}
                            </div>
                            <div className="modal-footer">
                                <Link to="/tickets" className="modal-btn" href="#">
                                    Browse your tickets
                                </Link>
                                <Link to="/" className="modal-btn" href="#">
                                    Back to movie page
                                </Link>
                            </div>
                        </div>
                    </div>
                </Portal>
            )}
        </>
    );
};

export default Modal;
