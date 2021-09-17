import { GET_DISCUSSIONS, DISCUSSION_ERROR } from '../actions/types';

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

    case DISCUSSION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
