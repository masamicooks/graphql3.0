import React from "react";
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
import { Fader } from "../Fader";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  flex: {
    flex: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    padding: theme.spacing(1),
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
    marginTop: theme.spacing(4),
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0,
  },
}));
const Header = React.memo(function Header(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <div className={classes.root}>
      <Fader>
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
            <Typography variant="h2" color="inherit" className={classes.flex}>
              D.C. Docs
            </Typography>
          </Toolbar>
        </AppBar>
      </Fader>
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
