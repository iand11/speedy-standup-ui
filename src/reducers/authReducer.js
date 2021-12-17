import { actionTypes } from './actionTypes';

export const authReducer = (state, action) => {
  if (action.type === actionTypes.SET_IS_AUTHENTICATED) {
    return action.payload;
  }

  return state;
};
