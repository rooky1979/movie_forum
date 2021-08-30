import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';

export const getCurrentProfile = () => async (dispatch) => {
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
