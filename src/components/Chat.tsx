import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import moment from "moment";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { useComponentContext } from "../context/ComponentContext";

import "./styles/componentStyles.css";

type Message = {
  name: string,
  message: string,
  time: string
}

const BASE_URL = process.env.BASE_URL || '';

const socket = io(BASE_URL, {
  reconnectionDelay: 1000,
  reconnection: true,
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
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.once("message", (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  const sendMessage = (message: string) => {
    const currentTime = moment(new Date());
    currentTime.format("HH:mm:ss");
    socket.emit("message", {
      message,
      time: currentTime.format("hh:mm a"),
      name: name,
    });
  };

  return (
    <div className="chat">
      <ChatMessages userName={name} messages={messages} />
      <ChatInput inputValue={inputValue} setInputValue={setInputValue} sendMessage={sendMessage}/>
    </div>
  );
};
