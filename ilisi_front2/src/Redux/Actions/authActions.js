import axios from 'axios';
import config from '../../config';

// Action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Asynchronous login action
export const login = (username, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST }); // Start the login process

    const apiUrl = `${config.API_URL}${config.port ? `:${config.port}` : ''}/authent/login`;

    try {
      const response = await axios.post(apiUrl, { username, password });
      // If successful, dispatch the LOGIN_SUCCESS action
      if (response.data && response.data.accessToken) {
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      } else {
        // If unexpected response, dispatch LOGIN_FAILURE
        dispatch({ type: LOGIN_FAILURE, payload: 'Unexpected response from server' });
      }
    } catch (error) {
      // Handle errors during login
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response?.data?.message || 'An error occurred during login',
      });
    }
  };
};
