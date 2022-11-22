import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(({ constants }) => {
  return {
    root: {},
    input: {
      margin: 0,
      width: "100%",
    },
    label: {
      marginBottom: constants.generalUnit,
    },
    checkbox: {
      marginTop: constants.generalUnit * 3,
    },
  };
});
