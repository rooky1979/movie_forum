//redux recducer for the discussion posts
import {
  GET_DISCUSSIONS,
  DISCUSSION_ERROR,
  UPDATE_LIKES,
  DELETE_DISCUSSION,
  ADD_DISCUSSION,
  GET_DISCUSSION,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from '../actions/types';

const initialState = {
  discussions: [],
  discussion: null,
  loading: true,
  error: {},
};

export default function discussion(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DISCUSSIONS:
      return {
        ...state,
        discussions: payload,
        loading: false,
      };
    case GET_DISCUSSION:
      return {
        ...state,
        discussion: payload,
        loading: false,
      };
    case ADD_DISCUSSION:
      return {
        ...state,
        discussions: [payload, ...state.discussions],
        loading: false,
      };
    case DELETE_DISCUSSION:
      return {
        ...state,
        discussions: state.discussions.filter(
          (discussion) => discussion._id !== payload
        ),
        loading: false,
      };
    case DISCUSSION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        discussions: state.discussions.map((discussion) =>
          discussion._id === payload.id
            ? { ...discussion, likes: payload.likes }
            : discussion
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        discussion: {
          ...state.discussion,
          comments: payload,
        },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        discussion: {
          ...state.discussion,
          comments: state.discussion.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
    default:
      return state;
  }
}
