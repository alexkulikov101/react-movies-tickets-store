import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { url } from '../../../utils/Variables';
import './Rating.scss';

import AuthContext from '../../../context/auth/authContext';

import StarForRating from './StarForRating';

const Rating = () => {
    const { user } = useContext(AuthContext);

    const [stateSelected, setStateSelected] = useState({
        value: 0,
        isSuccess: false,
        isDisabled: false,
    });

    useEffect(() => {
        const getRating = async () => {
            const id = localStorage.movieId;
            const res = await axios.get(`${url}/rating/${id}`);
            res.data.forEach((item: any) => {
                if (item.userId === user._id) {
                    setStateSelected({
                        ...stateSelected,
                        value: item.rating,
                        isDisabled: true,
                    });
                } else {
                    return;
                }
            });
        };
        getRating();
    }, []);

    const changeState = (i: any) => {
        setStateSelected({
            ...stateSelected,
            value: i,
            isSuccess: true,
        });
    };

    const postRating = async () => {
        const data = {
            _id: localStorage.movieId,
            rating: stateSelected.value,
            movieId: localStorage.movieId,
        };
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.post(`${url}/rating`, data, config);
        if (res.status === 200) {
            console.log('succesfuly');
        }
    };

    if (stateSelected.isSuccess) {
        postRating();
    }
    return (
        <>
            <p className="rating__user-score">
                <span>
                    User Score:{'  '}
                    {stateSelected.value}
                </span>
                /5
            </p>

            <div className="rating_user-stars star-rating">
                Your score:{'   '}
                {[1, 2, 3, 4, 5].map((n, i) => (
                    <StarForRating
                        key={i}
                        selected={i < stateSelected.value}
                        disabled={stateSelected.isDisabled}
                        onClick={() => changeState(i + 1)}
                    />
                ))}
            </div>
        </>
    );
};

export default Rating;
