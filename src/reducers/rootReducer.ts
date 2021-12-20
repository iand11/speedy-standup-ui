import { userInfoReducer } from "./userInfoReducer";
import { blockersReducer } from "./blockersReducer";
import { initialState, InitialStateType } from "../context/initialState";
import { selectedDateReducer } from "./selectedDateReducer";
import { authenticatedReducer, authErrorReducer } from "./authReducer";
import { ActionTypes } from "./actionTypes";
import { Actions } from "./actionTypes";

const combineReducers = (
  { userInfo, blockers, selectedDate, isAuthenticated, loginError }: InitialStateType,
  action: Actions
) => ({
  userInfo: userInfoReducer(userInfo, action),
  blockers: blockersReducer(blockers, action),
  selectedDate: selectedDateReducer(selectedDate, action),
  isAuthenticated: authenticatedReducer(isAuthenticated, action),
  loginError: authErrorReducer(loginError, action),
});

const rootReducer = (state: InitialStateType, action: Actions) => {
  if (action.type === ActionTypes.RESET) {
    sessionStorage.removeItem(process.env.SESSION_STORAGE_KEY || '');
    return {
      ...initialState,
    };
  }
  return combineReducers(state, action);
};

export default rootReducer;
