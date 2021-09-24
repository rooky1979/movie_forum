//middleware to use the JWT authentication token for the requests
import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    return (axios.defaults.headers.common['x-auth-token'] = token);
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
