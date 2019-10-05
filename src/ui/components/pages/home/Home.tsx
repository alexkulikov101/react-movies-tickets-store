import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/auth/authContext';

import SideBar from '../../layout/sideBar/SideBar';
import HomeHeader from './HomeHeader';
import HomeFilters from './HomeFilters';
import HomeMovies from './HomeMovies';

import './Home.scss';

const Home = () => {
    const authContext = useContext(AuthContext);

    const [classValue, setClassValue] = useState({
        value: '',
    });

    const classAdd = (item: string) => {
        setClassValue({
            value: item,
        });
    };

    useEffect(() => {
        authContext.loadUser(); //after reload user doesnt leave page
    }, []);

    return (
        <main className="home">
            <div className={`home__wrap ${classValue.value}`}>
                <SideBar classAdd={classAdd} />
                <div className="home__sections-wrap">
                    <HomeHeader title={'Now airing'} />
                    <div className="home__filter-wrap">
                        <form className="home__filter">
                            <HomeFilters />
                        </form>
                    </div>
                    <HomeMovies />
                </div>
            </div>
        </main>
    );
};

export default Home;
