import React from 'react';
import Seat from './Seat';

interface IProps {
    seats: any;
    selectSeat: (row: string, seat: string) => void;
}

const SeatsInRow = (props: IProps) => {
    const { seats, selectSeat } = props;

    const createSeats = () => {
        let i = 0;
        const result = seats.map((item: any) => {
            if (item.isOccupied === true) {
                return (
                    <li
                        className="screening-room__place"
                        key={item.row + item.seat}
                        style={{ backgroundColor: '#f73636' }}
                    >
                        {item.seat}
                    </li>
                );
            }

            return (
                <Seat
                    key={item.row + item.seat}
                    selectSeat={selectSeat}
                    seatRow={item.row}
                    seatNumber={item.seat}
                ></Seat>
            );
        });

        return result;
    };

    return createSeats();
};

export default SeatsInRow;
