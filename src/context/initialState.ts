import { Blocker } from '../types';

export interface InitialStateType {
  userInfo: {
    name: string,
    email: string,
    id: string
  },
  blockers: Blocker[],
  selectedDate: Date,
  isAuthenticated: boolean,
  loginError: boolean
}

export const initialState: InitialStateType = {
  userInfo: {
    name: "",
    email: "",
    id: "",
  },
  blockers: [],
  selectedDate: new Date(),
  isAuthenticated: false,
  loginError: false,
};
