//redux actions for the user profile

import axios from 'axios';
import { setAlert } from './alert';
import {
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_FILMS,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_FILMS,
} from './types';
//GET current logged in user profile
export const getCurrentProfile = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    //request to the current profile
    const res = await axios.get('/api/profile/me');
    //get the current profile and return the data
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    //get the error message(s)
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    //get the error message(s)
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//GET a profile by user ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    //get the error message(s)
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//GET the favourite films from the OMDB API by user ID
export const getFilms = (userId) => async (dispatch) => {
  const res = await axios.get(`/api/profile/movies/${userId}`);
  dispatch({ type: CLEAR_FILMS });
  try {
    dispatch({
      type: GET_FILMS,
      payload: res.data,
    });
  } catch (error) {
    //get the error message(s)
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//CREATE a new profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      //request to post the updated/created profile data
      const res = await axios.post('/api/profile', formData, config);

      //get current profile data
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));
      //push user to dashboard if profile is created (false) with history object
      if (!edit) {
        history.push('/dashboard');
      }
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      //get the error message(s)
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
//DELETE the logged in user account
export const deleteAccount = () => async (dispatch) => {
  //alert the user to confirm if they want to delete the account
  if (
    window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    )
  ) {
    try {
      await axios.delete('/api/profile');
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert('Your account has been permanantly deleted'));
    } catch (error) {
      //get the error message(s)
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};
