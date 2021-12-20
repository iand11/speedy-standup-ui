import { Divider, Grid, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';

type ChatMessagesProps = {
  messages: Array<{ name: string, message: string }>
  userName: string
}

export const ChatMessages = ({ messages, userName }: ChatMessagesProps) => {

  const renderMessages = () => (
    messages.map((item, i) => {
      const align = item.name === userName ? "right" : "left";
      return (
        <ListItem key={`${i}-${userName}`}>
          <Grid container>
            <Grid item xs={12}>
              <ListItemText
                sx={{ textAlign: align }}
                primary={item.message}
              ></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText
                sx={{ textAlign: align }}
                secondary={item.name}
              ></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
      );
    })
  )

  if (!messages.length) return null;

  return (
    <div className="chat-section">
      <List className="chat-section--message-area">{renderMessages()}</List>
      <Divider />
    </div>
  );
}