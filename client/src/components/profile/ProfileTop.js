import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    location,
    favouritecinema,
    user: { name, avatar },
    social,
  },
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img my-1' src={avatar} alt='' />
      <h1 className='large'>{name}</h1>
      <p className='lead'>
        <strong>Location: </strong>
        {location}
      </p>
      <p>
        <strong>Favourite Theatre: </strong> {favouritecinema}{' '}
      </p>
      <div className='icons my-1'>
        {social && social.youtube && (
          <a
            className='bg-primary'
            href={social.youtube}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-youtube fa-2x'></i>
          </a>
        )}

        {social && social.facebook && (
          <a
            className='bg-primary'
            href={social.facebook}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-facebook fa-2x'></i>
          </a>
        )}
        {social && social.twitter && (
          <a
            className='bg-primary'
            href={social.twitter}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-twitter fa-2x'></i>
          </a>
        )}
        {social && social.instagram && (
          <a
            className='bg-primary'
            href={social.instagram}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-instagram fa-2x'></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
