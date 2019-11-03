import React, { Children } from "react";
import classNames from "classnames";
import MenuIcon from "@material-ui/icons/Menu";
import { compose, withState } from "recompose";
import { Routes } from "./Routes";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Hidden,
  Tabs,
  Tab,
  Drawer,
  Icon
} from "@material-ui/core";

const appBarHeight = 64;

const enhance = compose(
  withState("open", "setOpen", false),
  withState("menuOpen", "setMenuOpen", false),
  withState("anchorEl", "setAnchorEl", null),
  withState("title", "setTitle", ""),
  withState("route", "setRoute", 0)
);

const MainWrapper = props => {
  const {
    children,
    location,
    history,
    auth,
    user,
    hasPadding,
    onLogout,
    routeList,
    brand,
    anchorEl,
    setAnchorEl,
    open,
    setOpen,
    menuOpen,
    setMenuOpen,
    classes,
    noMargin
  } = props;
  const isAnchor = Boolean(anchorEl);
  let route = routeList.filter(({ name, url }) => {
    return location.pathname.replace("/", "/").indexOf(url) !== -1;
  });
  let currentRoute =
    (route.length > 0 && routeList.indexOf(route[route.length - 1])) || 0;
  console.log("MAIN WRAPPER CLASSES", classes);
  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar>
          <Toolbar className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={() => setOpen(true)}
              className={classNames(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {brand
                ? brand
                : (routeList[currentRoute] && routeList[currentRoute].name) ||
                  routeList[0].name}
            </Typography>
            {auth && (
              <div>
                <Tooltip title={(user && user.name) || ""}>
                  <IconButton
                    aria-owns={isAnchor ? "menu-appbar" : null}
                    aria-haspopup="true"
                    onClick={event => {
                      setAnchorEl(event.currentTarget);
                    }}
                    color="inherit"
                  >
                    <img
                      style={{ borderRadius: "30px" }}
                      src={user && user.image}
                      width={"40px"}
                      height={"auto"}
                      alt="Profile"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  keepMounted
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                  }}
                  open={isAnchor}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem
                    onClick={event => {
                      onLogout();
                      setMenuOpen(false);
                      history.push("/auth/login");
                    }}
                  >
                    Log out
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <>
          <Divider />
          <Hidden mdUp>
            <Tabs
              className={classes.tabs}
              value={currentRoute || 0}
              onChange={(event, route) => {
                history.push(routeList[route].url);
              }}
              variant="scrollable"
              indicatorColor="primary"
              textColor="primary"
              scrollButtons="on"
              aria-label="scrollable force tabs example"
            >
              {routeList.map((route, index) => {
                return (
                  <Tab
                    label={route.name}
                    icon={<Icon>{route.icon}</Icon>}
                    key={index}
                    button
                  />
                );
              })}
            </Tabs>
          </Hidden>
          <Drawer open={open} onClose={() => setOpen(false)}>
            <Routes
              currentRoute={currentRoute || 0}
              routeList={routeList}
              isLoggedIn={user && !!user.name}
              onClick={route => {
                setOpen(false);
                history.push(route.url);
              }}
            />
          </Drawer>
          <Hidden smDown>
            <List
              style={{
                position: "fixed",
                marginTop: noMargin ? "0px" : appBarHeight,
                maxHeight: "680px",
                overflowY: "scroll"
              }}
              className={classes.sidebar}
            >
              <Routes
                currentRoute={currentRoute || 0}
                routeList={routeList}
                isLoggedIn={user && !!user.name}
                onClick={route => history.push(route.url)}
              />
            </List>
          </Hidden>
        </>
        <main style={{ marginBottom: "100px" }} className={classes.hasPadding}>
          {children}
        </main>
      </div>
    </>
  );
};

export default compose(enhance)(MainWrapper);
