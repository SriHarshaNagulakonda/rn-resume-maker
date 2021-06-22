import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
  userId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      console.log(action.userId,'reducer')
      return {
        ...state,
        userId: action.userId
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};