// // src/Redux/Store.js

// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk'; // Import redux-thunk middleware
// import rootReducer from '../Reducers/rootReducer'; // Import the root reducer

// // Create the Redux store with thunk middleware
// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;


// src/Redux/Store.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../Reducers/rootReducer'; // Import the root reducer

const store = configureStore({
  reducer: rootReducer, // Set your root reducer
});

export default store;
