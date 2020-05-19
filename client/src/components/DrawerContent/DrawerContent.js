import React from "react";
import { ExpandMore } from "@material-ui/icons";
import PropTypes from "prop-types";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import routing from "../../util/routing";

export const dataRoutes = [
  {
    text: "Senate",
    pathname: "/dashboard/senate",
    search: "?collection=sfrc",
  },
  {
    text: "House",
    pathname: "/dashboard/house",
    search: "?collection=hfac",
  },
];

export const otherRoutes = [
  { text: "About", pathname: "/about" },
  { text: "Contact", pathname: "/contact" },
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
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List className={classes.list}>
            {routes.map((nav, index) => (
              <ListItem button key={index} onClick={() => handleItemClick(nav)}>
                <ListItemText primary={nav.text} />
              </ListItem>
            ))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
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
