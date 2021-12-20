import { me } from "../api/auth";
import { ActionTypes } from "../reducers/actionTypes";
import { ContextDispatch } from '../context/ComponentContext';
import { login, create } from "../api/auth";
import { set, clear } from '../services/storage';

type CreateProps = {
  name: string;
  email: string;
  password: string;
  dispatch: ContextDispatch
}

type LoginProps = {
  email: string;
  password: string;
  dispatch: ContextDispatch;
}

const { SET_IS_AUTHENTICATED, SET_USER } = ActionTypes;

const setUserInfo = (name: string, email: string, id: string, dispatch: ContextDispatch) => {
  dispatch({ type: SET_USER, payload: { name: name, email, id } });
}

export const checkAuth = async (dispatch: ContextDispatch) => {
  try {
    const { data } = await me();
    type UserInfo = {
      name: string,
      id: string,
      email: string,
    }

    if (data) {
      const { id, name, email }: UserInfo = data;
      setUserInfo(name, email, id, dispatch);
      dispatch({ type: SET_IS_AUTHENTICATED, payload: true });
    }

  } catch (err) {
    logoutUser(dispatch);
    console.error(err);
  }
};

export const loginUser = async ({ email, password, dispatch }: LoginProps) => {
  const formData = { email, password }
  try {
    const { data } = await login(formData);
    const { token, name, email, id } = data;


    set("token", token);
    setUserInfo(name, email, id, dispatch);
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

export const createUser = async ({ name, email, password, dispatch }: CreateProps) => {
  const formData = { name, email, password }
  try {
    const { data } = await create(formData);
    const { token, name, email, _id } = data;


    set("token", token);
    setUserInfo(name, email, _id, dispatch);
    dispatch({ type: ActionTypes.SET_IS_AUTHENTICATED, payload: true });
    return data

  } catch (err: any) {
    return err.response;
  }


}
