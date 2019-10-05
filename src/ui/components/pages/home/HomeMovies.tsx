import React, { useContext, useEffect, useState } from 'react';
import { Animated } from 'react-animated-css';

import InfiniteScroll from 'react-infinite-scroller';
import HomeMoviesItem from './HomeMoviesItem';
import Spinner from '../../layout/spinner/Spinner';

import MovieContext from '../../../context/movie/movieContext';

const HomeMovies = () => {
    const movieContext = useContext(MovieContext);

    const { movies, filtered, getMovies, loading } = movieContext;

    const [movieState, setMovieState] = useState({
        allposts: movies,
        posts: [],
        hasMore: true,
        curpage: 0,
        pagesize: 4,
        totalPage: 0,
        total: 0,
    });

    useEffect(() => {
        getMovies();
    }, []);

    useEffect(() => {
        let curpage = movieState.curpage;
        let posts = movieState.allposts.slice(curpage * movieState.pagesize, (curpage + 1) * movieState.pagesize);
        setMovieState({
            ...movieState,
            allposts: movies,
            posts: posts,
            total: movies.length,
            totalPage: Math.ceil(movies.length / movieState.pagesize),
        });
    }, [movies.length]);

    const loadmoreItem = () => {
        if (movieState.curpage + 1 < movieState.totalPage) {
            let curpage = movieState.curpage < movieState.totalPage ? movieState.curpage + 1 : movieState.curpage;

            let posts = movieState.allposts.slice(0, (curpage + 1) * movieState.pagesize);
            setMovieState({
                ...movieState,
                posts: posts,
                curpage: curpage,
            });
        } else {
            setMovieState({ ...movieState, hasMore: false });
        }
    };

    const renderMovies = () => {
        if (filtered !== null) {
            return filtered.map((movie: any) => (
                <Animated
                    animationIn="zoomIn"
                    animationOut="fadeOut"
                    animationInDuration={1000}
                    animationOutDuration={1000}
                    isVisible={true}
                    key={movie._id}
                >
                    <HomeMoviesItem movie={movie} />
                </Animated>
            ));
        }

        return movieState.posts.map((movie: any) => (
            <Animated
                animationIn="zoomIn"
                animationOut="fadeOut"
                animationInDuration={1000}
                animationOutDuration={1000}
                isVisible={true}
                key={movie._id}
            >
                <HomeMoviesItem movie={movie} />
            </Animated>
        ));
    };

    if (movies.length === 0 && loading) {
        return <Spinner />;
    }

    return (
        <>
            {movies !== null && !loading ? (
                <InfiniteScroll
                    element={'ul'}
                    className="home__movie-list"
                    pageStart={0}
                    hasMore={movieState.hasMore}
                    loadMore={loadmoreItem}
                >
                    {renderMovies()}
                </InfiniteScroll>
            ) : null}
        </>
    );
};

export default HomeMovies;
