import { LOGIN_USER, LOGOUT, SIGN_UP, LOGINED_USER } from '../actions/authActions';

const initialState = {
  token: null,
  userId: null,
  name: '',
  image: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        token: action.userData.token,
        userId: action.userData.userId,
        name: action.userData.name,
        image: action.userData.image,
      };
    case SIGN_UP:
      return {
        ...state,
        token: action.userData.token,
        userId: action.userData.userId,
        name: action.userData.name,
        image: action.userData.image,

      };
    case LOGINED_USER: {
      return {
        ...state,
        token: action.userData.token,
        userId: action.userData.userId,
        name: action.userData.name,
        image: action.userData.image,

      }
    }
    case LOGOUT: {
      return state;
    }
    default:
      return state;
  }
};
