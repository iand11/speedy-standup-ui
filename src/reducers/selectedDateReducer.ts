import { Actions, ActionTypes } from './actionTypes';

export const selectedDateReducer = (state: Date, action: Actions) => {
  if (action.type === ActionTypes.SET_DATE) {
    return action.payload;
  }

  return state;
};
