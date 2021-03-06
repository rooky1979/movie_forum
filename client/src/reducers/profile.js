//redux reducer for profile actions
import {
  CLEAR_FILMS,
  CLEAR_PROFILE,
  GET_FILMS,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  films: [], //maybe not used
  loading: true,
  error: {},
};

export default function profile(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return { ...state, error: payload, loading: false, profile: null };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
        films: [],
      };
    case GET_FILMS:
      return {
        ...state,
        films: payload,
        loading: false,
      };
    case CLEAR_FILMS:
      return {
        ...state,
        films: [],
        loading: false,
      };
    default:
      return state;
  }
}
