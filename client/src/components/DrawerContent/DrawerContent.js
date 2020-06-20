import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import routing from "../../util/routing";

export const dataRoutes = [
  {
    text: "Calendar",
    pathname: "/calendar",
  },
  {
    text: "Senate Committees",
    pathname: "/dashboard/senate",
    search: "?collection=null",
  },
  {
    text: "House Committees",
    pathname: "/dashboard/house",
    search: "?collection=null",
  },
];

export const otherRoutes = [
  //{ text: "About", pathname: "/about" },
  //{ text: "Contact", pathname: "/contact" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  list: {
    width: "100%",
  },
}));

const DrawerContent = (props) => {
  const { handleDrawerToggle } = props;
  const location = useLocation();
  const classes = useStyles();

  function handleItemClick(nav) {
    routing(location, nav, handleDrawerToggle);
  }

  const ListItems = ({ routes, title }) => {
    return (
      <List className={classes.list}>
        {routes.map((nav, index) => (
          <ListItem button key={index} onClick={() => handleItemClick(nav)}>
            <Typography variant="body1">{nav.text}</Typography>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <div className={classes.root}>
      <ListItems title="Data" routes={dataRoutes} />
      <ListItems title="Settings" routes={otherRoutes} />
    </div>
  );
};

DrawerContent.propTypes = {
  handleDrawerToggle: PropTypes.func,
};

export { DrawerContent };
