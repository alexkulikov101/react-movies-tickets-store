import React from 'react';
import { Link } from 'react-router-dom';
import icon from './3d.png';

interface IMovie {
    movie: any;
}

const HomeMoviesItem: React.FC<IMovie> = ({ movie }) => {
    const { img, name, threed, _id } = movie;

    const removeLocal = () => {
        localStorage.setItem('movieId', _id);
    };

    return (
        <li className="home__movie-item">
            <figure>
                <img className="home__movie-img" src={img} width="200" alt={name} />

                <figcaption className="home__movie-title">{name}</figcaption>
                {threed ? (
                    <span className="home__movie-threed">
                        <img className="home__icon-img" src={icon} alt="3d" />
                    </span>
                ) : null}

                <Link className="home__movie-btn" onClick={removeLocal} to="/book-ticket">
                    Buy ticket{' '}
                </Link>
            </figure>
        </li>
    );
};

export default HomeMoviesItem;
