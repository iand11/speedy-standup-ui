import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useComponentContext } from "../context/ComponentContext";
import { logoutUser } from "../services/auth";

export const Header = () => {
  const { dispatch, state: { isAuthenticated } } = useComponentContext();

  const renderLogout = () => {
    if (!isAuthenticated) return null;

    return (
      <Button id="logout-button" onClick={() => logoutUser(dispatch)} color="inherit">
        Logout
      </Button>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Speedy Standup
          </Typography>
          {renderLogout()}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
