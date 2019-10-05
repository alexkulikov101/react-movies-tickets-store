import React, { useReducer } from 'react';
import axios from 'axios';
import MovieContext from './movieContext';
import movieReducer from './movieReducer';
import { url } from '../../utils/Variables';
import { FILTER_MOVIES_PANEL, CLEAR_FILTER, GET_MOVIES, MOVIE_ERROR } from '../types';

interface IInitialState {
    movies?: Array<object>;
    filtered?: object[];
    loading?: boolean;
}

const MovieState = (props: any) => {
    const initialState: IInitialState = {
        movies: [],
        filtered: null,
        loading: true,
    };

    const [state, dispatch] = useReducer(movieReducer, initialState);

    //Filter Movies Panel
    const filterMoviesPanel = (checkbox: boolean, select: string, input: string | number) => {
        dispatch({
            type: FILTER_MOVIES_PANEL,
            payload: {
                checkbox,
                select,
                input,
            },
        });
    };

    //Clear Filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER,
            payload: '',
        });
    };
    //Get Movies
    const getMovies = async () => {
        try {
            const res = await axios.get(`${url}/`);

            dispatch({
                type: GET_MOVIES,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: MOVIE_ERROR,
                payload: err.response.msg,
            });
        }
    };

    return (
        <MovieContext.Provider
            value={{
                movies: state.movies,
                filtered: state.filtered,
                loading: state.loading,
                filterMoviesPanel,
                clearFilter,
                getMovies,
            }}
        >
            {props.children}
        </MovieContext.Provider>
    );
};

export default MovieState;
