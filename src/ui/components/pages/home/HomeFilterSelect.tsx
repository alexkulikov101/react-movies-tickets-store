import React from 'react';

interface IProps {
    handleChangeSelect(e: string): void;
}

const HomeFilterSelect = (props: IProps) => {
    return (
        <select className="home__filter-select" onChange={e => props.handleChangeSelect(e.target.value)}>
            <option value="All">All</option>
            <option value="Action">Action</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Drama">Drama</option>
            <option value="Crime">Crime</option>
        </select>
    );
};

export default HomeFilterSelect;
