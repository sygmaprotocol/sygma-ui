import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(({ palette, constants }) => {
  return {
    root: {
      border: "none",
      padding: `${constants.generalUnit * 3}px ${constants.generalUnit * 4}px`,
    },
    backdrop: {
      opacity: `0.6 !important`,
      zIndex: 2,
    },
  };
});
