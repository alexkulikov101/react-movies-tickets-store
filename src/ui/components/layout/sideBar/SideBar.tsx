import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import AuthContext from '../../../context/auth/authContext';
import TicketContext from '../../../context/ticket/ticketContext';

import './SideBar.scss';

type SideProps = {
    classAdd(wrap: string): void;
};

const SideBar = ({ classAdd }: SideProps) => {
    const { user, logout } = useContext(AuthContext);
    const { clearTickets } = useContext(TicketContext);

    const onLogout = () => {
        logout();
        clearTickets();
    };

    const [sideStatus, setSideStatus] = useState({
        condition: false,
        showSide: false,
    });

    const handleClickOpen = () => {
        setSideStatus({
            condition: true,
            showSide: true,
        });
    };
    const handleClickClose = () => {
        setSideStatus({
            condition: false,
            showSide: false,
        });
    };

    useEffect(() => {
        {
            sideStatus.showSide ? classAdd(wrap) : classAdd('');
        }
    }, [sideStatus.showSide]);

    let navCoverStyle = { display: sideStatus.showSide ? 'none' : 'block' };
    let wrap = 'show-side';

    return (
        <aside className="sidebar">
            <h2 className="visually-hidden">Main Navigation</h2>
            <button className="sidebar__btn sidebar__btn--open" style={navCoverStyle} onClick={handleClickOpen}>
                <i className=" sidebar__btn-icon fas fa-arrow-right"></i>
                <span className="sidebar__btn-text">Open Menu</span>
            </button>
            {sideStatus.condition && (
                <div className="sidebar__back">
                    <button className="sidebar__btn" onClick={handleClickClose}>
                        <i className=" sidebar__btn-icon fas fa-arrow-left"></i>
                        <span className="sidebar__btn-text">Close Menu</span>
                    </button>
                    <nav>
                        <ul className="sidebar__list">
                            <li className="sidebar__item sidebar__item--name">
                                Hello <span className="sidebar__user-name">{user && user.name}</span>{' '}
                            </li>
                            <li className="sidebar__item">
                                <NavLink
                                    to="/"
                                    className="sidebar__link-noactive"
                                    activeClassName={location.pathname === '/' ? `sidebar__link-active` : ''}
                                >
                                    Now Airing
                                </NavLink>
                            </li>
                            <li className="sidebar__item">
                                <NavLink
                                    to="/tickets"
                                    className="sidebar__link-noactive"
                                    activeClassName={location.pathname === '/tickets' ? `sidebar__link-active` : ''}
                                >
                                    My Tickets
                                </NavLink>
                            </li>
                            <li className="sidebar__item">
                                <a onClick={onLogout} href="#!">
                                    <span className="hide-sm">Log Out</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </aside>
    );
};

export default SideBar;
