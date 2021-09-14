import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFilms } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const ProfileFilms = ({ profile: { favouriteFilms } }) => {
  useEffect(() => {
    getFilms();
  }, [getFilms]);

  return (
    <div class='profile-films bg-light p-2'>
      <h1 class='text-primary my-1'>Favourite Films</h1>
      {favouriteFilms === null ? (
        <Spinner />
      ) : (
        favouriteFilms.map((film) => (
          <div key={film.imdbID} class='films'>
            <div>
              <img src={film.Poster} alt={film.Title} />
              <p>
                <strong>
                  {' '}
                  {film.Title} ({film.Year})
                </strong>
              </p>
              <p>
                <strong>Director: </strong>
                {film.Director}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileFilms.propTypes = {
  getFilms: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getFilms })(ProfileFilms);
