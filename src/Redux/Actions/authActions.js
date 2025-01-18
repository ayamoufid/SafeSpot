import axios from 'axios';
import config from '../../config';

// Action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (username, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    const apiUrl = `${config.API_URL}${config.port ? `:${config.port}` : ''}/authent/login`;

    try {
      const response = await axios.post(apiUrl, { username, password });
      if (response.data && response.data.accessToken) {
        // Récupérer l'ID utilisateur
        const userIdResponse = await axios.get(
          `${config.API_URL}${config.port ? `:${config.port}` : ''}/authent/get-id?username=${username}`
        );

        dispatch({
          type: LOGIN_SUCCESS,
          payload: { accessToken: response.data.accessToken, userId: userIdResponse.data.id },
        });
      } else {
        dispatch({ type: LOGIN_FAILURE, payload: 'Unexpected response from server' });
      }
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response?.data?.message || 'An error occurred during login',
      });
    }
  };
};
