import { useEffect } from "react";
import { InputForm } from "./components/form";
import { Chat } from "./components/chat";
import { Login } from "./components/login";
import { Header } from "./components/header";
import { Calendar } from "./components/calendar";
import { Blockers } from "./components/blockers";
import { useComponentContext } from "./context/componentContext";
import { checkAuth } from "./services/auth";

import "./App.css";

const App = () => {
  const {
    dispatch,
    state: { isAuthenticated },
  } = useComponentContext();

  useEffect(() => {
    checkAuth(dispatch);
  }, []);

  const renderApp = () => {
    if (isAuthenticated) {
      return (
        <div className="inner-app">
          <div className="blocker-wrapper">
            <InputForm />
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
      {isAuthenticated && <Header />}
      {!isAuthenticated && <Login />}
      {renderApp()}
    </div>
  );
};

export default App;
