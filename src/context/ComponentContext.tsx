import React, { createContext, useContext, ReactNode, Dispatch } from 'react';
import { useStorageReducer } from 'react-storage-hooks';
import rootReducer from '../reducers/rootReducer';
import { initialState, InitialStateType } from './initialState';
import { Actions } from '../reducers/actionTypes';

const SESSION_STORAGE_KEY = process.env.SESSION_STORAGE_KEY || '';

export type ContextDispatch = Dispatch<Actions>;

export interface ContextType {
  state: InitialStateType,
  dispatch: ContextDispatch,
}

export const ComponentContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => null,
});

interface ComponentProviderProps {
  children: ReactNode,
  store?: InitialStateType
}

const ComponentProvider = ({ children, store = initialState}: ComponentProviderProps) => {
  const [state, dispatch] = useStorageReducer(sessionStorage, SESSION_STORAGE_KEY, rootReducer, store);

  return <ComponentContext.Provider value={{ state, dispatch }}>{children}</ComponentContext.Provider>
};

const useComponentContext = () => useContext(ComponentContext);

export { useComponentContext, ComponentProvider };
