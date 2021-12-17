import { Actions, ActionTypes } from './actionTypes';
import { User } from '../types'

export const userInfoReducer = (state: User, action: Actions) => {
  if (action.type === ActionTypes.SET_USER) {
    return action.payload
  }

  return state;
};
