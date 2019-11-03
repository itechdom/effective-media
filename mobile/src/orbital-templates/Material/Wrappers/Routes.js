import React from "react";
import { ListItem, ListItemText, Icon } from "@material-ui/core";

export const Routes = ({ onClick, currentRoute, routeList }) => {
  return (
    <React.Fragment>
      {routeList.map((route, index) => {
        return (
          <ListItem
            style={{ borderRadius: "50px" }}
            selected={index === currentRoute}
            key={index}
            onClick={event => onClick(route)}
            button
          >
            <Icon>{route.icon}</Icon>
            <ListItemText primary={route.name} />
          </ListItem>
        );
      })}
    </React.Fragment>
  );
};
