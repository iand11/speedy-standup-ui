import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const BasicCard = ({ name, blocker, ticket, deleteBlocker }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        minWidth: 275,
        maxWidth: 350,
        margin: 2,
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
          boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
        },
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" component="div" sx={{ width: 250 }}>
          {blocker}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{ticket}</Button>
        <IconButton aria-label="delete">
          <DeleteIcon onClick={deleteBlocker} />
        </IconButton>
      </CardActions>
    </Card>
  );
};
