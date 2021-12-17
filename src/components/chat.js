import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import moment from "moment";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SendIcon from "@mui/icons-material/Send";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { useComponentContext } from "../context/componentContext";

import "./styles/componentStyles.css";

const BASE_URL = process.env.BASE_URL;

const socket = io(BASE_URL, {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttemps: 10,
  transports: ["websocket"],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
});

export const Chat = () => {
  const {
    state: {
      userInfo: { name },
    },
  } = useComponentContext();
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.once("message", (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  const sendMessage = (message) => {
    const currentTime = new moment();
    currentTime.format("HH:mm:ss");
    socket.emit("message", {
      message,
      time: currentTime.format("hh:mm a"),
      name: name,
    });
  };

  const renderMessages = () => {
    return (
      messages.length &&
      messages.map((item, i) => {
        const align = item.name === name ? "right" : "left";
        return (
          <ListItem key={`${i}-${name}`}>
            <Grid container>
              <Grid item xs={12}>
                <ListItemText
                  align={align}
                  primary={item.message}
                ></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText
                  align={align}
                  secondary={item.name}
                ></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        );
      })
    );
  };

  const renderChatSection = () => {
    if (!messages.length) return null;
    return (
      <div className="chat-section">
        <List className="chat-section--message-area">{renderMessages()}</List>
        <Divider />
      </div>
    );
  };

  const renderChatInput = () => {
    return (
      <div className="chat--input-wrapper">
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Message The Group"
          inputProps={{ "aria-label": "search google maps" }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Divider orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={() => {
            sendMessage(inputValue);
            setInputValue("");
          }}
        >
          <SendIcon />
        </IconButton>
      </div>
    );
  };

  return (
    <div className="chat">
      {renderChatSection()}
      {renderChatInput()}
    </div>
  );
};
