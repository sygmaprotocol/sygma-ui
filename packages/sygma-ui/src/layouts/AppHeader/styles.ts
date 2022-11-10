// import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";

import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  return {
    root: {
      // backgroundColor: theme.palette.additional["header"][1],
      borderBottom: `1px solid rgba(255, 122, 69, 0.16)`,
      // color: theme.palette.additional["header"][2],
      boxShadow:
        "0px 1px 4px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.02), 0px 1px 12px rgba(0, 0, 0, 0.12)",
      borderRadius: "0px 0px 10.6667px 10.6667px",
    },
    left: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    logo: {
      marginRight: 11,
      height: theme.constants.generalUnit * 5,
      width: theme.constants.generalUnit * 5,
      "& svg, & img": {
        maxHeight: "100%",
        maxWidth: "100%",
      },
    },
    state: {
      // display: "flex",
      // flexDirection: "row",
      // alignItems: "center",
    },
    indicator: {
      display: "block",
      height: 16,
      width: 16,
      marginRight: theme.constants.generalUnit,
    },
    address: {
      marginRight: theme.constants.generalUnit,
      display: "flex",
      alignItems: "center",
    },
    network: {},
    accountInfo: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    mainInfo: {
      display: "flex",
    },
    mainTitle: {
      display: "flex",
      alignItems: "center",
    },
    headerLinks: {
      marginLeft: 49,
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginLeft: "unset",
        alignItems: "center",
        width: "100%",
        "& > a:last-child": {
          marginLeft: 5,
        },
      },
    },
    link: {
      marginLeft: 46,
      textDecoration: "none",
      [theme.breakpoints.down("sm")]: {
        marginLeft: "unset",
      },
    },
    linkTitle: {
      fontSize: 16,
    },
  };
});
