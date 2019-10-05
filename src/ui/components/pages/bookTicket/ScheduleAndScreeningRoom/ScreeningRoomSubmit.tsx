import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../../../layout/modal/Modal';
import { url } from '../../../../utils/Variables';

interface IProps {
    screeningId: string;
    selectedSeats: Array<string>;
    resetSeats: ([]) => void;
    time: string;
    day: string;
    movieName: string;
    img: string;
}
const ScreeningRoomSubmit = (props: IProps) => {
    const { screeningId, selectedSeats, resetSeats, time, day, movieName, img } = props;
    const [stateReservation, setStateReservation] = useState({
        updateData: false,
        showModal: false,
    });

    const postReservation = async () => {
        if (stateReservation.updateData === false && selectedSeats.length === 0) {
            alert('Please, select seats!');
        } else {
            const data = {
                selectedSeats: selectedSeats,
                isOccupied: true,
            };
            const res = await axios.put(`${url}/screenings/${screeningId}`, data);

            resetSeats(res.data.seats);
            if (res.status === 200) {
                selectedSeats.map(async (item: any) => {
                    const dataTickets = {
                        img: img,
                        name: movieName,
                        date: day,
                        time: time,
                        row: item[0],
                        seat: item[1],
                        screeningId: screeningId,
                    };
                    const resTickets = await axios.post(`${url}/tickets`, dataTickets);
                    if (resTickets.status === 200) {
                        console.log('Ticket sent successfuly');
                    }
                });
                setStateReservation({ ...stateReservation, updateData: true });
                setStateReservation({ ...stateReservation, showModal: true });
            }
        }
    };
    return (
        <>
            <button onClick={postReservation} className="screening-room__btn">
                Book
            </button>

            {stateReservation.showModal && (
                <Modal
                    showModal={stateReservation.showModal}
                    selectedSeats={selectedSeats}
                    time={time}
                    day={day}
                    movieName={movieName}
                />
            )}
        </>
    );
};

export default ScreeningRoomSubmit;
