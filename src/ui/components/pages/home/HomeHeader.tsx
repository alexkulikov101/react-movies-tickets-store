import React from "react";

interface IProps {
    title?: string;
}

const HomeHeader = (props: IProps) => {
    return (
        <div className="home__header ">
            <h2>{props.title}</h2>
        </div>
    );
};

export default HomeHeader;
