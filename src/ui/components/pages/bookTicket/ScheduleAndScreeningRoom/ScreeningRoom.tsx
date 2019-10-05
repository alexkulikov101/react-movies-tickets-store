import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rows from './Rows';
import ScreeningRoomSubmit from './ScreeningRoomSubmit';
import { url } from '../../../../utils/Variables';
import { Animated } from 'react-animated-css';
import { spread } from 'q';

interface IProps {
    id: string;
    time: string;
    day: string;
    movieName: string;
    img: string;
}

const ScreeningRoom = (props: IProps) => {
    const { id, time, day, movieName, img } = props;

    const [screeningRoomState, setScreeningRoomState] = useState({
        id: '',
        seats: [],
        selectedSeats: [],
        loading: true,
    });

    useEffect(() => {
        switchingLoading();
        const handleShowScreening = async () => {
            const res = await axios.get(`${url}/screenings/${id}`);
            setScreeningRoomState({
                ...screeningRoomState,
                id: res.data._id,
                seats: res.data.seats,
                loading: false,
            });
        };

        handleShowScreening();
    }, [props]);

    const switchingLoading = () => {
        setScreeningRoomState({
            ...screeningRoomState,
            loading: true,
        });
    };

    const selectSeat = (row: string, seat: string) => {
        const seats = screeningRoomState.selectedSeats;
        let index = seats.findIndex(item => {
            return item.toString() === [row, seat].toString();
        });
        if (index !== -1) seats.splice(index, 1);
        else seats.push([row, seat]);

        setScreeningRoomState({
            ...screeningRoomState,
            selectedSeats: seats,
        });
    };

    const resetSeats = (seats: []) => {
        setScreeningRoomState({ ...screeningRoomState, seats: seats });
    };

    return (
        <>
            {!screeningRoomState.loading ? (
                <>
                    <Animated
                        animationIn="zoomIn"
                        animationOut="fadeOut"
                        animationInDuration={1000}
                        animationOutDuration={1000}
                        isVisible={true}
                    >
                        <div className="screening-room__wrap">
                            <div className="screening-room__description">
                                <h3 className="screening-room__title">Select a seat</h3>
                                <div className="screening-room__info">
                                    <p className="screening-room__sigh">
                                        <span className="screening-room__sigh-color   screening-room__sigh-color--selected"></span>
                                        <span>Selected</span>
                                    </p>
                                    <p className="screening-room__sigh">
                                        <span className="screening-room__sigh-color   screening-room__sigh-color--booked"></span>
                                        <span>Booked</span>
                                    </p>
                                    <p className="screening-room__sigh">
                                        <span className="screening-room__sigh-color   screening-room__sigh-color--available"></span>
                                        <span>Available</span>
                                    </p>
                                </div>
                                <p className="screening-room__sigh">
                                    <span className="screening-room__screen"></span>
                                    <span>Screen</span>
                                </p>
                            </div>
                            <div className="screening-room__seats">
                                <Rows seats={screeningRoomState.seats} selectSeat={selectSeat} />
                            </div>
                        </div>
                        <div className="screening-room__submit">
                            <ScreeningRoomSubmit
                                screeningId={screeningRoomState.id}
                                selectedSeats={screeningRoomState.selectedSeats}
                                resetSeats={resetSeats}
                                time={time}
                                day={day}
                                movieName={movieName}
                                img={img}
                            />
                        </div>
                    </Animated>
                </>
            ) : null}
        </>
    );
};

export default ScreeningRoom;
