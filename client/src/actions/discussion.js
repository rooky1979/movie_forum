import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_DISCUSSIONS,
  DISCUSSION_ERROR,
  UPDATE_LIKES,
  DELETE_DISCUSSION,
  ADD_DISCUSSION,
  GET_DISCUSSION,
  REMOVE_COMMENT,
  ADD_COMMENT,
} from './types';

//GET all discussions
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
//GET a SINGLE discussion post
export const getDiscussion = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/discussions/${id}`);

    dispatch({
      type: GET_DISCUSSION,
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
//LIKE a discussion post
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/discussions/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
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
//UNLIKE a discussion post
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/discussions/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
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
//DELETE a discussion post
export const deleteDiscussion = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/discussions/${id}`);

    dispatch({
      type: DELETE_DISCUSSION,
      payload: id,
    });
    dispatch(setAlert('Discussion Removed', 'success'));
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
//ADD a discussion post
export const addDiscussion = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/discussions', formData, config);

    dispatch({
      type: ADD_DISCUSSION,
      payload: res.data,
    });
    dispatch(setAlert('Discussion Added', 'success'));
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
//ADD a comment
export const addComment = (discussionID, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `/api/discussions/comment/${discussionID}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment Added', 'success'));
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
//DELETE a comment
export const deleteComment = (discussionID, commentID) => async (dispatch) => {
  try {
    await axios.delete(`/api/discussions/comment/${discussionID}/${commentID}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentID,
    });
    dispatch(setAlert('Comment Removed', 'success'));
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
