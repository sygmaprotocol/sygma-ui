import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(
  ({ constants, breakpoints, palette, transitions }) => {
    return {
      root: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: 30,
        marginTop: 10,
        [breakpoints.between("sm", "xl")]: {
          paddingTop: 20,
          marginTop: 55,
        },
      },
      inner: {},
      cta: {
        display: "block",
        maxWidth: 200,
        maxHeight: 200,
        position: "fixed",
        bottom: constants.generalUnit * 3,
        right: constants.generalUnit * 3,
      },
      content: {
        margin: `30px auto`,
        maxWidth: 460,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      },
      explorerMainContent: {
        width: "100%",
        height: "100%",
        margin: "0 auto",
      },
      pageArea: {
        height: "100%",
        width: "100%",
        overflow: "hidden",
      },
      explorerArea: {
        width: "100%",
        height: "100vh",
        marginTop: 86,
      },
      navTabs: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: `0 ${constants.generalUnit}px`,
        transform: "translateY(1px)",
        "& > a": {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: `${constants.generalUnit}px ${
            constants.generalUnit * 1.5
          }px`,
          textDecoration: "none",
          marginRight: constants.generalUnit,
          transitionDuration: `${transitions.duration.standard}ms`,
          maxHeight: 42,
          "& svg": {
            transitionDuration: `${transitions.duration.standard}ms`,
          },
          "&.active": {
            textDecoration: "underline",
          },
          "& > *:first-of-type": {
            marginRight: constants.generalUnit,
          },
        },
        "& svg": {
          height: 14,
          width: 14,
        },
      },
      transferTab: {
        zIndex: 1,
        backgroundColor: "#f0f0f0",
        boxShadow:
          "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
        "& span": {
          backgroundColor: "unset",
        },
        "& .MuiTab-root": {
          minHeight: 48,
          minWidth: 160,
          color: "#FF7A45",
          fontWeight: 500,
          fontSize: 20,
          textTransform: "initial",
        },
      },
    };
  }
);
