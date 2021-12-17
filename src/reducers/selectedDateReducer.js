import { actionTypes } from './actionTypes';

export const selectedDateReducer = (state, action) => {
  if (action.type === actionTypes.SET_DATE) {
    return action.payload;
  }

  return state;
};
