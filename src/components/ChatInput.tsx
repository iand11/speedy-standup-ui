import React from 'react';
import { Divider, IconButton, InputBase } from '@mui/material';
import SendIcon from "@mui/icons-material/Send";

type ChatInputProps = {
  inputValue: string;
  setInputValue: (value: string) => void;
  sendMessage: (message: string) => void;
}

export const ChatInput = ({ inputValue, setInputValue, sendMessage}: ChatInputProps) => {
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
          // @ts-ignore TS2345
          sendMessage(inputValue);
          setInputValue("");
        }}
      >
        <SendIcon />
      </IconButton>
    </div>
  );
}