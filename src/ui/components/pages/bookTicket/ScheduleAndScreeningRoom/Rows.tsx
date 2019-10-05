import React, { useState, useEffect } from 'react';
import SeatsInRow from './SeatsInRow';
import './ScheduleAndScreeningRoom.scss';

interface IProps {
    seats: Array<any>;
    selectSeat: (row: string, seat: string) => void;
}
const Rows = (props: IProps) => {
    const { seats, selectSeat } = props;

    const [stateRows, setStateRows] = useState({
        seats: seats,
        rows: [],
    });

    useEffect(() => {
        const rows = [];

        for (let i = 0; i < stateRows.seats.length; i++) {
            if (rows.indexOf(stateRows.seats[i].row) === -1) {
                rows.push(stateRows.seats[i].row);
            }
        }

        setStateRows({
            ...stateRows,
            rows: rows,
        });
    }, [props]);

    return (
        <>
            {stateRows.rows.length === 0
                ? null
                : stateRows.rows.map((row: any) => {
                      const seats = stateRows.seats.filter((item: any) => {
                          if (item.row === row) return item;
                          return false;
                      });
                      return (
                          <ul key={row} className="screening-room__row">
                              <span className="screening-room__row-number">{row}</span>
                              <SeatsInRow seats={seats} selectSeat={selectSeat} />
                          </ul>
                      );
                  })}
        </>
    );
};

export default Rows;
