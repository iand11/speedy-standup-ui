import React, { createContext, useContext } from 'react';
import { useStorageReducer } from 'react-storage-hooks';
import rootReducer from '../reducers/rootReducer';
import { initialState } from './initialState';
const SESSION_STORAGE_KEY = process.env.SESSION_STORAGE_KEY;

const ComponentContext = createContext({
  state: initialState,
  dispatch: () => null,
});

const ComponentProvider = ({ children, store = initialState}) => {
  const [state, dispatch] = useStorageReducer(sessionStorage, SESSION_STORAGE_KEY, rootReducer, store);

  return <ComponentContext.Provider value={{ state, dispatch }}>{children}</ComponentContext.Provider>
};

const useComponentContext = () => useContext(ComponentContext);

export { useComponentContext, ComponentProvider };
