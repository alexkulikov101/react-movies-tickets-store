import React from 'react'


interface IProps {
    handleChangeCheckbox(): void,
    checked: boolean
}

const HomeFilterCheckbox = (props: IProps) => {

    return (
        <p className="home__checkbox-wrap">
            <input className="home__filter-checkbox"
                type="checkbox"
                checked={props.checked}
                onChange={props.handleChangeCheckbox}
                id="checkbox" />
            <label htmlFor="checkbox">3D</label>
        </p>
    )
}

export default HomeFilterCheckbox
