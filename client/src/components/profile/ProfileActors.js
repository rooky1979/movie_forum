import React from 'react';
import PropTypes from 'prop-types';

const ProfileActors = ({ profile: { favouriteactors } }) => {
  return (
    <div className='profile-actors bg-light p-2'>
      <h2 className='text-primary '>Favourite Actors</h2>
      <div className='favourites'>
        {favouriteactors.map((actor, index) => (
          <div key={index} className='p-1'>
            <i className='fas fa-star'></i> {actor}{' '}
            <i className='fas fa-star'></i>
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileActors.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileActors;
