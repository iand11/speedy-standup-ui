import React, { useEffect } from "react";
import { BlockerForm } from "./components/BlockerForm";
import { Chat } from "./components/Chat";
// import { Login } from "./components/Login";
import { Header } from "./components/Header";
import { Calendar } from "./components/Calendar";
import { Blockers } from "./components/Blockers";
import { useComponentContext } from "./context/ComponentContext";
import { checkAuth } from "./services/auth";
import { AuthForm } from './components/AuthForm';

import "./App.css";

const App = () => {
  const {
    dispatch,
    state: { isAuthenticated },
  } = useComponentContext();

  useEffect(() => {
    checkAuth(dispatch);
  }, [dispatch]);

  const renderApp = () => {
    if (isAuthenticated) {
      return (
        <div className="inner-app">
          <div className="blocker-wrapper">
            <BlockerForm />
            <Blockers />
          </div>
          <div className="chat-wrapper">
            <Calendar />
            <Chat />
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      {<Header />}
      {!isAuthenticated && <AuthForm />}
      {renderApp()}
    </div>
  );
};

export default App;
