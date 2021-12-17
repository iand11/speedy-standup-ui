import { Blocker } from '../types';

export interface InitialStateType {
  userInfo: {
    name: string,
    email: string,
    _id: string
  },
  blockers: Blocker[],
  selectedDate: Date,
  isAuthenticated: boolean
}

export const initialState: InitialStateType = {
  userInfo: {
    name: "",
    email: "",
    _id: "",
  },
  blockers: [],
  selectedDate: new Date(),
  isAuthenticated: false,
};
