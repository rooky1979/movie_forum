import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    user: { name },
  },
}) => {
  return (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <Fragment>
          <h2 className='text-primary'>
            {[name.trim().split(' ')[0].length - 1] === 's' ? (
              <span>{name.trim().split(' ')[0]}' Bio</span>
            ) : (
              <span>{name.trim().split(' ')[0]}'s Bio</span>
            )}
          </h2>
          <p>{bio}</p>
        </Fragment>
      )}
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
