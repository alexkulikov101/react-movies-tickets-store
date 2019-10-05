import React, { useState } from 'react';
import './ScheduleAndScreeningRoom.scss';

interface IProps {
    seatRow: string;
    seatNumber: string;
    selectSeat: (row: string, seat: string) => void;
}
const Seat = (props: IProps) => {
    const { seatRow, seatNumber, selectSeat } = props;
    const [stateSeat, setStateSeat] = useState({
        seatRow: seatRow,
        seatNumber: seatNumber,
        backColor: '#dedede',
    });

    const setColor = () => {
        const color = stateSeat.backColor === '#21bc5f' ? '#dedede' : '#21bc5f';
        setStateSeat({
            ...stateSeat,
            backColor: color,
        });
    };

    const selectSeatFunc = (e: any) => {
        e.preventDefault();
        selectSeat(stateSeat.seatRow, stateSeat.seatNumber);

        setColor();
    };
    return (
        <li
            className="screening-room__place"
            style={{ backgroundColor: stateSeat.backColor }}
            key={stateSeat.seatNumber}
            onClick={selectSeatFunc}
        >
            {stateSeat.seatNumber}
        </li>
    );
};

export default Seat;
