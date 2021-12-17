import { userInfoReducer } from "../reducers/userInfoReducer";
import { blockersReducer } from "./blockersReducer";
import { initialState } from "../context/initialState";
import { selectedDateReducer } from "./selectedDateReducer";
import { authReducer } from "./authReducer";
import { actionTypes } from "./actionTypes";

const combineReducers = (
  { userInfo, blockers, selectedDate, isAuthenticated },
  action
) => ({
  userInfo: userInfoReducer(userInfo, action),
  blockers: blockersReducer(blockers, action),
  selectedDate: selectedDateReducer(selectedDate, action),
  isAuthenticated: authReducer(isAuthenticated, action),
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.RESET) {
    sessionStorage.removeItem(process.env.SESSION_STORAGE_KEY);
    return {
      ...initialState,
    };
  }
  return combineReducers(state, action);
};

export default rootReducer;
