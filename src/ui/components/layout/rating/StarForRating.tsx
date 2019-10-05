import React from 'react';

import './Rating.scss';

interface IProps {
    selected: boolean;
    onClick: () => void;
    disabled: boolean;
}

const StarForRating = (props: IProps) => (
    <input
        type="button"
        disabled={props.disabled}
        className={props.selected ? 'star selected' : 'star'}
        onClick={props.onClick}
    />
);

export default StarForRating;
