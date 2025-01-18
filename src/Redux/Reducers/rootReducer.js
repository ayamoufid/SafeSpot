import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Import your authentication reducer

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
  auth: authReducer, // Add the auth slice here
  // Other reducers can go here if needed
});

export default rootReducer;
