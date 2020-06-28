import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu, Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { DrawerContent } from "../DrawerContent";
import history from "../../history";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  flex: {
    flex: 1,
    "&:hover": {
      cursor: "pointer",
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    //padding: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    paddingTop: 0,
    marginTop: theme.spacing(1), // To deal with
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0,
  },
}));
const Header = React.memo(function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleGoHome = () => {
    history.push("/");
  };

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Typography
            onClick={handleGoHome}
            variant="h2"
            color="inherit"
            className={classes.flex}
          >
            Cloture
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Drawer
          variant="temporary"
          anchor={"left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            className={classes.closeMenuButton}
          >
            <Close />
          </IconButton>
          <DrawerContent handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
      </nav>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </div>
    </div>
  );
});

Header.propTypes = {
  container: PropTypes.object,
};

export { Header };
