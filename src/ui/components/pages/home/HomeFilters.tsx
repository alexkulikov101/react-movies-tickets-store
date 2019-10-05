import React, { useState, useEffect, useContext } from 'react'

import MovieContext from "../../../context/movie/movieContext"

import HomeFilterInput from "./HomeFilterInput"
import HomeFilterSelect from "./HomeFilterSelect"
import HomeFilterCheckBox from "./HomeFilterCheckbox"


const HomeFilters = () => {

    const { filterMoviesPanel, clearFilter } = useContext(MovieContext)

    const [filterState, setFilterState] = useState({
        searchField: "",
        genreSelect: "All",
        isThreedCheckBox: false
    })



    const handleChangeInput = (e: string) => {
        setFilterState({
            ...filterState,
            searchField: e
        })

    }


    const handleChangeSelect = (e: string) => {

        setFilterState({
            ...filterState,
            genreSelect: e
        })
    }
    const handleChangeCheckbox = () => {

        setFilterState({
            ...filterState,
            isThreedCheckBox: !filterState.isThreedCheckBox
        })
    }


    useEffect(() => {
        filterMoviesPanel(filterState.isThreedCheckBox, filterState.genreSelect, filterState.searchField);
    }, [filterState.isThreedCheckBox, filterState.genreSelect, filterState.searchField])

    useEffect(() => {
        clearFilter()
    }, [])



    return (
        <>
            <HomeFilterInput handleChangeInput={handleChangeInput} />
            <HomeFilterSelect handleChangeSelect={handleChangeSelect} />
            <HomeFilterCheckBox handleChangeCheckbox={handleChangeCheckbox} checked={filterState.isThreedCheckBox} />
        </>
    )
}

export default HomeFilters
