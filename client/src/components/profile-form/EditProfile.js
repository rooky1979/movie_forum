import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  getCurrentProfile,
  createProfile,
  history,
}) => {
  useEffect(() => {
    getCurrentProfile();

    setFormData({
      location: loading || !profile.location ? '' : profile.location,
      bio: loading || !profile.bio ? '' : profile.bio,
      favouritecinema:
        loading || !profile.favouritecinema
          ? ''
          : profile.favouritecinema.join(', '),
      favouritegenres:
        loading || !profile.favouritegenres
          ? ''
          : profile.favouritegenres.join(', '),
      favouritefilms:
        loading || !profile.favouritefilms
          ? ''
          : profile.favouritefilms.join(', '),
      favouriteactors:
        loading || !profile.favouriteactors
          ? ''
          : profile.favouriteactors.join(', '),
      favouritedirectors:
        loading || !profile.favouritedirectors
          ? ''
          : profile.favouritedirectors.join(', '),
      youtube: loading || profile.social ? '' : profile.social.youtube,
      facebook: loading || profile.social ? '' : profile.social.facebook,
      twitter: loading || profile.social ? '' : profile.social.twitter,
      instagram: loading || profile.social ? '' : profile.social.instagram,
    });
  }, [loading, getCurrentProfile]);

  const [formData, setFormData] = useState({
    location: '',
    bio: '',
    favouritecinema: '',
    favouritegenres: '',
    favouritefilms: '',
    favouriteactors: '',
    favouritedirectors: '',
    youtube: '',
    facebook: '',
    twitter: '',
    instagram: '',
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    location,
    bio,
    favouritecinema,
    favouritegenres,
    favouritefilms,
    favouriteactors,
    favouritedirectors,
    youtube,
    facebook,
    twitter,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>
        <i className='fas fa-user-edit'></i> Create/Edit Profile
      </h1>
      <p className='lead'>
        Add to or update your profile to make you stand out!
      </p>
      <small>* = required field</small>
      <form
        action='create-profile.html'
        className='form'
        onSubmit={(e) => onSubmit(e)}
      >
        <div className='form-group'>
          <input
            type='text'
            name='favouritefilms'
            value={favouritefilms}
            onChange={(e) => onChange(e)}
            placeholder='* Favourite films? Top four will be shown.'
          />
          <small className='form-text'>
            Please use comma separated values (e.g. Matrix, Goonies, Gremlins,
            Big)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
            placeholder='Location?'
          />
          <small className='form-text'>
            Tell us where you are in the world
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='favouritecinema'
            value={favouritecinema}
            onChange={(e) => onChange(e)}
            placeholder='Favourite Theatre?'
          />
          <small className='form-text'>
            Tell us your favourite cinema or theatre
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='favouritegenres'
            value={favouritegenres}
            onChange={(e) => onChange(e)}
            placeholder='Favourite genres? Top four will be shown.'
          />
          <small className='form-text'>
            Please use comma separated values (e.g. Horror, Action, Sci-Fi,
            Whodunnit)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='favouriteactors'
            value={favouriteactors}
            onChange={(e) => onChange(e)}
            placeholder='Favourite Actors? Top four will be shown.'
          />
          <small className='form-text'>
            Please use comma separated values (e.g. Amy Adams, Robert De Niro,
            Jason Mamoa, Harrison Ford)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='favouritedirectors'
            value={favouritedirectors}
            onChange={(e) => onChange(e)}
            placeholder='Favourite Directors? Top four will be shown.'
          />
          <small className='form-text'>
            Please use comma separated values (e.g. Martin Scorcese, George
            Lucas, Rian Johnson, J. J. Abrahms)
          </small>
        </div>
        <div className='form-group'>
          <textarea
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}
            placeholder='About you...'
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>
        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='dashboard.html'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
