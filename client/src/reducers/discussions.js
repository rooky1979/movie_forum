import { GET_POSTS, POST_ERROR } from '../actions/types';

const initialState = {
  discussions: [],
  discussion: null,
  errors: {},
  loading: true,
};

export default function discussion(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        discussions: payload,
        loading: false,
      };

    case POST_ERROR:
      return {
        ...state,
        error: { payload },
        loading: false,
      };

    default:
      return state;
  }
}
