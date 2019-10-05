import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import HomeHeader from '../home/HomeHeader';
import SideBar from '../../layout/sideBar/SideBar';
import Spinner from '../../layout/spinner/Spinner';
import Schedule from './ScheduleAndScreeningRoom/Schedule';
import Rating from '../../layout/rating/Rating';
import { url } from '../../../utils/Variables';

import AuthContext from '../../../context/auth/authContext';

import './BookTicket.scss';

const BookTicket = () => {
    const { loadUser, user } = useContext(AuthContext);
    const [classValue, setClassValue] = useState({
        value: '',
    });
    const classAdd = (item: string) => {
        setClassValue({
            value: item,
        });
    };

    const [movieState, setMovieState] = useState({
        id: '',
        name: '',
        description: '',
        rating: '',
        img: '',
        loading: true,
        screenings: [],
    });

    useEffect(() => {
        loadUser();
        const fetchData = async () => {
            const id = localStorage.movieId;
            const res = await axios.get(`${url}/book-ticket/${id}`);
            setMovieState({
                ...movieState,
                id: res.data.id,
                name: res.data.name,
                description: res.data.description,
                rating: res.data.rating,
                img: res.data.img,
                loading: false,
                screenings: res.data.screenings,
            });
        };

        fetchData();
    }, []);

    return (
        <>
            {!movieState.loading && user !== null ? (
                <main className={`book-ticket home__wrap ${classValue.value}`}>
                    <SideBar classAdd={classAdd} />
                    <div className="book-ticket__wrap ">
                        <div className=" book-ticket__section-wrap home__sections-wrap">
                            <HomeHeader title={'Book ticket'} />
                            <div className="book-ticket__section container">
                                <div className="book-ticket__movie-image">
                                    <img
                                        className="book-ticket__film-image-img"
                                        src={movieState.img}
                                        alt={movieState.name}
                                    />
                                </div>
                                <div className="book-ticket__info">
                                    <h2 className="book-ticket__movie-title">{movieState.name}</h2>
                                    <p className="book-ticket__movie-description">{movieState.description}</p>
                                    <div className="book-ticket__rating rating">
                                        <h3 className="rating__title">Average rating</h3>
                                        <div className="rating__info">
                                            <div className="rating__user-wrap">
                                                {}
                                                <Rating />
                                            </div>

                                            <div className="rating__imdb-wrap">
                                                IMDB: <span className="rating__imdb-score">{movieState.rating}</span>
                                                /10
                                            </div>
                                        </div>
                                    </div>
                                    <Schedule
                                        screenings={movieState.screenings}
                                        movieName={movieState.name}
                                        img={movieState.img}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            ) : (
                <Spinner />
            )}
        </>
    );
};

export default BookTicket;
