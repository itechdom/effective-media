import { fade } from "@material-ui/core/styles/colorManipulator";
const drawerWidth = 180;
const appBarHeight = 64;
export const styles = theme => {
  return {
    root: {
      [theme.breakpoints.up("md")]: {
        display: "flex"
      }
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
      height: appBarHeight
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px"
    },
    tabs: {
      marginTop: appBarHeight
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      marginTop: appBarHeight
    },
    menuButton: {
      marginLeft: 30,
      marginRight: 20
    },
    menuDropdown: {
      marginLeft: -12,
      marginRight: 20
    },
    menuButtonHidden: {
      display: "none"
    },
    title: {
      flexGrow: 1
    },
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
      [theme.breakpoints.up("md")]: {
        marginTop: appBarHeight,
        marginLeft: drawerWidth
      }
    },
    hasPadding: {
      padding: theme.spacing(3),
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
      [theme.breakpoints.up("md")]: {
        marginTop: appBarHeight,
        marginLeft: drawerWidth
      }
    },
    chartContainer: {
      marginLeft: -22
    },
    tableContainer: {
      height: 320
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto"
      }
    },
    searchIcon: {
      // width: theme.spacing.unit * 9,
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    sidebar: {
      marginTop: appBarHeight,
      width: drawerWidth,
      position: "fixed"
    },
    inputRoot: {
      color: "inherit",
      width: "100%"
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: 120,
        "&:focus": {
          width: 200
        }
      }
    },
    "users.cardImage": {
      borderRadius: "150px",
      width: "50%",
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: "22px"
    }
  };
};
