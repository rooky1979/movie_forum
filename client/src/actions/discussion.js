import axios from 'axios';
import { setAlert } from './alert';
import { GET_DISCUSSIONS, DISCUSSION_ERROR } from './types';

//GET discussions
export const getDiscussions = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/discussions');

    dispatch({
      type: GET_DISCUSSIONS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DISCUSSION_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
