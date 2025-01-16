const initialState = {
  isLoading: false,
  isLoggedIn: false,
  token: null,
  userId: null, // Ajouter cette ligne pour l'ID utilisateur
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        token: action.payload.accessToken,
        userId: action.payload.userId, // Stocker l'ID utilisateur
      };
    case 'LOGIN_FAILURE':
      return { ...state, isLoading: false, isLoggedIn: false, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
