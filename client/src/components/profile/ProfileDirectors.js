import React from 'react';
import PropTypes from 'prop-types';

const ProfileDirectors = ({ profile: { favouritedirectors } }) => {
  return (
    <div className='profile-directors bg-dark p-2'>
      <h2 className='text-primary'>Favourite Directors</h2>
      <div className='favourites'>
        {favouritedirectors.map((director, index) => (
          <div key={index} className='p-1'>
            <i className='far fa-star'></i> {director}{' '}
            <i className='far fa-star'></i>
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileDirectors.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileDirectors;
