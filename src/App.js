import { useEffect } from "react";
import { InputForm } from "../src/components/Form";
import { Chat } from "../src/components/Chat";
import { Login } from "../src/components/Login";
import { Header } from "../src/components/Header";
import { Calendar } from "../src/components/Calendar";
import { Blockers } from "../src/components/Blockers";
import { useComponentContext } from "./context/ComponentContext";
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
