import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFilms } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const ProfileFilms = ({ getFilms, films }) => {
  useEffect(() => {
    getFilms();
  }, [getFilms]);

  return (
    <div className='profile-films bg-light p-2'>
      <h1 className='text-primary my-1'>Favourite Films</h1>
      {films === null ? (
        <Spinner />
      ) : (
        films.map((film, index) => (
          <div key={index} className='films'>
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
  films: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  films: state.profile.films,
});

export default connect(mapStateToProps, { getFilms })(ProfileFilms);
