import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DashboardItem = ({
  profile: {
    user: { _id, name, avatar },
    location,
    favouritecinema,
    favouritefilms,
    favouriteactors,
    favouritegenres,
    favouritedirectors,
  },
}) => {
  return (
    <div>
      <div className='profile bg-light'>
        <img src={avatar} alt='' className='round-img' />
        <div>
          <h2>{name}</h2>
          <p>
            <span>
              <strong>Location:</strong>{' '}
            </span>{' '}
            {location && <span>{location}</span>}
          </p>
          <p className='my-1'>
            <span>
              <strong>Favourite Theatre: </strong>{' '}
            </span>
            {favouritecinema && <span>{favouritecinema}</span>}
          </p>
          <Link to={`/profile/${_id}`} className='btn btn-primary my-1'>
            See Profile
          </Link>
        </div>
        <ul>
          <h3>Favourite Films</h3>
          {favouritefilms.slice(0, 4).map((film, index) => (
            <li key={index} className='text-primary'>
              <i className='fas fa-star'></i> {film}
            </li>
          ))}
        </ul>
      </div>
      <div className='profile bg-light'>
        <ul>
          <h3>Favourite Actors</h3>
          {favouriteactors.slice(0, 4).map((film, index) => (
            <li key={index} className='text-primary'>
              <i className='fas fa-star'></i> {film}
            </li>
          ))}
        </ul>
        <ul>
          <h3>Favourite Directors</h3>
          {favouritedirectors.slice(0, 4).map((film, index) => (
            <li key={index} className='text-primary'>
              <i className='fas fa-star'></i> {film}
            </li>
          ))}
        </ul>
        <ul>
          <h3>Favourite Genres</h3>
          {favouritegenres.slice(0, 4).map((film, index) => (
            <li key={index} className='text-primary'>
              <i className='fas fa-star'></i> {film}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

DashboardItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default DashboardItem;
