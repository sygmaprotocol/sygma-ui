import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(({ constants, palette }) => {
  return {
    root: {
      width: "100%",
    },
    inner: {
      width: "100% !important",
      maxWidth: "unset !important",
      borderRadius: "4px",
      display: "flex",
      flexDirection: "row",
      padding: `${constants.generalUnit * 6}px ${constants.generalUnit * 7}px`,
    },
    heading: {
      marginBottom: constants.generalUnit,
    },
    icon: {
      height: 20,
      width: 20,
      marginTop: constants.generalUnit * 0.8,
      marginRight: constants.generalUnit * 2,
      fill: "#8C8C8C",
    },
    buttons: {
      display: "flex",
      flexDirection: "row",
      marginTop: constants.generalUnit * 5,
      "& > *": {
        textDecoration: "none",
        marginRight: constants.generalUnit,
      },
    },
    button: {
      borderColor: "#595959",
      color: "#595959",
      "&:hover": {
        borderColor: "#595959",
        backgroundColor: "#595959",
        color: palette.common.white,
      },
    },
  };
});
