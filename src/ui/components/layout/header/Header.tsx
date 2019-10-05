import React from 'react';

import './Header.scss';


interface Props {
    title?: string;
    icon?: string;
}


const Header: React.FC<Props> = props => {
    const { title, icon } = props;


    return (
        <header className="header">
            <div className="header__wrap container">
                <h1 className="header__title">
                    <i className={icon} />
                    {title}
                </h1>
            </div>
        </header>
    );
};

Header.defaultProps = {
    title: 'Movies Tickets Store',
    icon: 'fas fa-store-alt',
};

export default Header;
