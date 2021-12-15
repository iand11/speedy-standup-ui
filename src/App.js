import { useEffect, useState } from "react";
import { deleteBlocker, getBlockers, createBlocker } from "./services/blockers";
import { BasicCard } from "../src/components/box";
import { InputForm } from "../src/components/form";
import { Chat } from "../src/components/chat";
import { Login } from "../src/components/login";
import { me } from "../src/services/auth";
import { clear } from "../src/util/storage";

import "./App.css";

require('dotenv').config()

const App = () => {
  const [blockers, setBlockers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkAuth();
    getAllBlockers();
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);
    const userInfo = await me();
    const { name } = userInfo;
    console.log("USER IFNO", userInfo);
    if (!name) {
      setIsAuthenticated(false);
      clear();
      setIsLoading(false);
    } else {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  };
  const getAllBlockers = async () => {
    const blockers = await getBlockers();
    setBlockers(blockers);
  };

  const removeBlocker = async (blockerId) => {
    const res = await deleteBlocker(blockerId);
    res && getAllBlockers();
  };

  const addBlocker = async ({ name, blocker, ticket }) => {
    const res = await createBlocker({ name, blocker, ticket });
    res && getAllBlockers();
  };

  const renderBlockers = () => {
    if (blockers.length) {
      return blockers.map((blocker) => {
        return (
          <div>
            <BasicCard
              name={blocker.name}
              blocker={blocker.blocker}
              ticket={blocker.ticket}
              deleteBlocker={() => removeBlocker(blocker._id)}
            />
          </div>
        );
      });
    }
  };

  const renderLogin = () => {
    if (!isAuthenticated && !isLoading) {
      return <Login checkAuth={checkAuth} />;
    }
  };

  const renderApp = () => {
    if (isAuthenticated) {
      return (
        <div style={{ display: "flex" }}>
          <div>
            <div style={{ padding: 20 }}>
              <InputForm createBlocker={addBlocker} />
            </div>
            <div
              style={{
                display: "flex",
                flexFlow: "row wrap",
                overflow: false,
                maxWidth: 1200,
                margin: "auto",
                padding: 0,
              }}
            >
              {renderBlockers()}
            </div>
          </div>
          <Chat />
        </div>
      );
    }
  };
  return (
    <div>
      {renderLogin()}
      {renderApp()}
    </div>
  );
};

export default App;
