import React, { useContext, useRef, useEffect } from 'react'

import MovieContext from "../../../context/movie/movieContext";

interface Iprops {
    handleChangeInput(e: string | number): void;
}

const HomeFilterInput = (props: Iprops) => {

    const movieContext = useContext(MovieContext);
    const text = useRef<HTMLInputElement>(null)

    const { filtered } = movieContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = ""

        }
    })

    return (

        <input className="home__filter-input" ref={text} type="text" placeholder="Search movie name..." onChange={(e) => props.handleChangeInput(e.target.value)} />

    )
}

export default HomeFilterInput
