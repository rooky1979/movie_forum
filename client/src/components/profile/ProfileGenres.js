import React from 'react';
import PropTypes from 'prop-types';

const ProfileGenres = ({ profile: { favouritegenres } }) => {
  return (
    <div className='profile-genres bg-dark p-2'>
      <h2 className='text-primary'>Favourite Genres</h2>
      <div className='favourites'>
        {favouritegenres.map((genre, index) => (
          <div key={index} className='p-1'>
            <i className='fas fa-star'></i> {genre}{' '}
            <i className='fas fa-star'></i>
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileGenres.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileGenres;
