import { me } from "../api/auth";
import { ActionTypes } from "../reducers/actionTypes";
import { ContextDispatch } from '../context/ComponentContext';
import { login } from "../api/auth";
import { set, clear } from '../services/storage';

const { SET_IS_AUTHENTICATED, SET_USER } = ActionTypes;

const setUserInfo = (name: string, email: string, _id: string, dispatch: ContextDispatch) => {
  dispatch({ type: SET_USER, payload: { name: name, email, _id } });
}

export const checkAuth = async (dispatch: ContextDispatch) => {
  try {
    const { data } = await me();
    type UserInfo = {
      name: string,
      _id: string,
      email: string,
    }

    if (data) {
      const { _id, name, email }: UserInfo = data;
      setUserInfo(name, email, _id, dispatch);
      dispatch({ type: SET_IS_AUTHENTICATED, payload: true });
    }

  } catch (err) {
    logoutUser(dispatch);
    console.error(err);
  }
};

export const loginUser = async (userEmail: string, password: string, dispatch: ContextDispatch) => {
  try {
    const { data } = await login(userEmail, password);
    const { token, name, email, _id } = data;


    set("token", token);
    setUserInfo(name, email, _id, dispatch);
    dispatch({ type: ActionTypes.SET_IS_AUTHENTICATED, payload: true });
  } catch (err) {
    logoutUser(dispatch);
    dispatch({ type: ActionTypes.SET_AUTH_ERROR, payload: true })
  }
}

export const logoutUser = (dispatch: ContextDispatch) => {
  clear();
  dispatch({ type: ActionTypes.SET_IS_AUTHENTICATED, payload: false });
  dispatch({ type: ActionTypes.RESET, payload: true })
}
