import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(({ constants }) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: "#F0F0F0 !important",
      zIndex: 3,
    },
    title: {
      fontWeight: 700,
      fontSize: "36px",
      fontStyle: "normal",
      color: "#FF7A45",
      lineHeight: "24px",
      letterSpacing: "0.01em",
    },
    paragraph: {
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "24px",
      color: "#979797",
      fontStyle: "normal",
    },
    buttons: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      "& button": {
        color: "#979797",
        textDecoration: "underline",
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "24px",
        fontStyle: "normal",
        border: "none",
        backgroundColor: "#F0F0F0",
      },
      "& *": {
        marginRight: constants.generalUnit,
        textDecoration: "none",
      },
    },
  };
});
