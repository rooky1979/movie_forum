import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    location,
    favouritecinema,
    favouritefilms,
  },
}) => {
  return (
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
        {favouritefilms.slice(0, 4).map((film, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-star'></i> {film}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
