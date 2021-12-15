import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import moment from "moment";
import { get } from "../util/storage";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SendIcon from "@mui/icons-material/Send";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

const BASE_URL = process.env.BASE_URL

const socket = io(BASE_URL, {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttemps: 10,
  transports: ["websocket"],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
});

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "95%",
    maxHeight: "50vh",
    minHeight: "10vh",
    overflowY: "auto",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    maxHeight: "50vh",
    overflowY: "auto",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
  },
});

export const Chat = () => {
  const name = get("name");
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const classes = useStyles();

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
          <ListItem key={i}>
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
      <Grid className={classes.chatSection}>
        <Grid>
          <List className={classes.messageArea}>{renderMessages()}</List>
          <Divider />
        </Grid>
      </Grid>
    );
  };

  return (
    <div
      style={{
        width: "30%",
        marginTop: 40,
        position: "absolute",
        bottom: 0,
        right: 0,
      }}
    >
      {renderChatSection()}
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          backgroundColor: "white",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Message The Group"
          inputProps={{ "aria-label": "search google maps" }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
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
      </Paper>
    </div>
  );
};
