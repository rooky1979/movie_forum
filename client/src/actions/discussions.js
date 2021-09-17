import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR } from './types';

export const getDiscussions = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/discussions');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
