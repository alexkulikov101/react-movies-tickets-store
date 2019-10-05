import React, { useState } from 'react';
import ScreeningRoom from './ScreeningRoom';
import moment from 'moment';
import uuid from 'uuid';

interface Iprops {
    screenings: Array<any>;
    movieName: string;
    img: string;
}

const Schedule = (props: Iprops) => {
    const { screenings, movieName, img } = props;

    const [stateSchedule, setStateSchedule] = useState({
        timeList: [],
        day: '',
        id: '',
        time: '',
        isShow: false,
        isActive: false,
    });

    const days = screenings
        .map(screening => {
            return screening.date;
        })
        .filter((value, index, self) => {
            return self.indexOf(value) === index;
        });

    const handleShowTime = (e: any, day: any) => {
        // e.target.classList.add('schedule__date-btn-active');
        // console.log(e.target);
        stateSchedule.timeList.splice(0, stateSchedule.timeList.length);
        screenings.map((item: any) => {
            if (day === item.date) {
                stateSchedule.timeList.push({ time1: item.time, id1: item._id });
            }

            setStateSchedule({
                ...stateSchedule,
                timeList: stateSchedule.timeList,
                day: day,
                isActive: true,
            });
        });
    };

    const handleShowScreeningRoom = (id: any, time: any) => {
        setStateSchedule({
            ...stateSchedule,
            id: id,
            time: time,
            isShow: true,
        });
    };

    return (
        <div className="book-ticket__schedule schedule">
            <h3 className="schedule__title">Select date and time</h3>
            <div className="schedule__dates">
                {days.map(day => {
                    return (
                        <button className="schedule__date-btn" key={uuid.v4()} onClick={e => handleShowTime(e, day)}>
                            {moment(new Date(day))
                                .format('ll')
                                .replace(new RegExp('[^.]?' + moment().format('YYYY') + '.?'), '')
                                .slice(0, -1)}
                        </button>
                    );
                })}
            </div>

            {stateSchedule.timeList.length !== 0 ? (
                <div className="schedule__times">
                    {stateSchedule.timeList.map((item: any) => {
                        return (
                            <React.Fragment key={uuid.v4()}>
                                {
                                    <button
                                        className="schedule__time-btn"
                                        key={uuid.v4()}
                                        onClick={() => handleShowScreeningRoom(item.id1, item.time1)}
                                    >
                                        {item.time1}
                                    </button>
                                }
                            </React.Fragment>
                        );
                    })}
                </div>
            ) : null}
            <div className="screening-room">
                {stateSchedule.isShow && (
                    <ScreeningRoom
                        id={stateSchedule.id}
                        time={stateSchedule.time}
                        day={stateSchedule.day}
                        movieName={movieName}
                        img={img}
                    />
                )}
            </div>
        </div>
    );
};

export default Schedule;
