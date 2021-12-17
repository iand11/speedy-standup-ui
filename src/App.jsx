import { useEffect } from "react";
import { InputForm } from "./components/Form";
import { Chat } from "./components/Chat";
import { Login } from "./components/Login";
import { Header } from "./components/Header";
import { Calendar } from "./components/Calendar";
import { Blockers } from "./components/Blockers";
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
