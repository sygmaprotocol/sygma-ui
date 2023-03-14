import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(({ constants, transitions }) => {
  return {
    "@global": {
      "@keyframes pulsate": {
        "0%": {
          filter: "blur(0)",
          transition: "filter ease-in",
        },
        "25%": {
          filter: "blur(4px)",
          transition: "filter ease-in",
        },
        "50%": {
          filter: "blur(8px)",
          transition: "filter ease-out",
        },
        "75%": {
          filter: "blur(4px)",
          transition: "filter ease-out",
        },
        "100%": {
          filter: "blur(0)",
          transition: "filter ease-out",
        },
      },
    },
    root: {
      "& :before": {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    mainContainer: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    elipsisContent: {
      display: "grid",
    },
    elipsis: {
      borderRadius: "50%",
      height: "181px",
      width: "181px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gridRow: 1,
      gridColumn: 1,
    },
    elipsisTransferring: {
      border: "2px solid #1D9A52",
      animation: "3s pulsate 1s infinite ease-in",
    },
    elipsisTransferComplete: {
      border: "2px solid #1D9A52",
      animation: "unset",
    },
    elipsisError: {
      border: "2px solid red",
      animation: "unset",
    },
    svgIcon: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gridColumn: 1,
      gridRow: 1,
    },
    inner: {
      width: "100% !important",
      height: "100%",
      maxWidth: "unset !important",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: `${constants.generalUnit * 5}px ${
        constants.generalUnit * 3.5
      }px`,
      bottom: 0,
      top: "unset !important",
      transform: "unset !important",
      left: "0 !important",
      border: "none",
      borderRadius: 0,
      transitionDuration: `${transitions.duration.standard}ms`,
    },
    heading: {
      marginBottom: constants.generalUnit,
      whiteSpace: "nowrap",
      color: "#FF7A45",
      fontWeight: 700,
      fontSize: "16px",
      lineHeight: "24px",
      fontStyle: "normal",
      letterSpacing: "0.01em",
    },
    stepIndicator: {
      height: 40,
      width: 40,
      marginRight: constants.generalUnit * 2,
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#979797",
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: "24px",
      fontStyle: "normal",
      letterSpacing: "0.01em",
      "& svg": {
        height: 20,
        width: 20,
        display: "block",
      },
    },
    stepIndicatorNormal: {
      border: "1px solid #FF7A45",
    },
    stepIndicatorError: {
      border: "1px solid red",
    },
    content: {
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline",
      marginTop: "81px",
      width: "100%",
      justifyContent: "center",
    },
    transferCompletedContainer: {
      display: "flex",
      flexDirection: "column",
    },
    buttons: {
      "& > *": {
        textDecoration: "none",
        marginRight: constants.generalUnit,
        display: "flex",
        justifyContent: "center",
      },
    },
    button: {
      backgroundColor: "white !important",
      border: "2px solid #FF7A45",
      borderRadius: "8px",
      boxShadow:
        "0px 1px 2px rgba(0, 0, 0, 0.16), 0px 2px 4px rgba(0, 0, 0, 0.12), 0px 1px 8px rgba(0, 0, 0, 0.1)",
      color: "#FF7A45",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "24px",
      fontStyle: "normal",
      letterSpacing: "0.01em",
      width: "232px",
      height: "49px",
    },
    initCopy: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      "& > *:first-of-type": {
        marginTop: constants.generalUnit * 3.5,
        marginBottom: constants.generalUnit * 8,
      },
    },
    sendingCopy: {},
    vote: {
      display: "flex",
      flexDirection: "row",
      marginTop: constants.generalUnit,
      "& > *": {
        "&:first-of-type": {
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: 240,
        },
        "&:last-child": {
          marginLeft: constants.generalUnit * 3.5,
          fontStyle: "italic",
        },
      },
    },
    warning: {
      marginTop: constants.generalUnit * 3.5,
      display: "block",
      fontWeight: 600,
    },
    warningMsg: {
      marginTop: "65px",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "14px",
      lineHeight: "24px",
      color: "#979797",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    receipt: {
      marginTop: constants.generalUnit * 3.5,
      marginBottom: constants.generalUnit * 8,
    },
    weighted: {
      fontWeight: 600,
    },
    progress: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      "& > *": {
        borderRadius: "0 !important",
        "&  >  *": {
          borderRadius: "0 !important",
        },
      },
    },
    transferAbortedContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    errorMessage: {
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "14px",
      lineHeight: "24px",
      color: "#979797",
      textAlign: "center",
    },
  };
});
