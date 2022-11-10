// import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(({ palette, constants }) => {
  return {
    root: {
      // backgroundColor: `${palette.additional["gray"][9]} !important`,
      color: palette.common.white,
      border: "none",
      padding: `${constants.generalUnit * 3}px ${constants.generalUnit * 4}px`,
    },
    backdrop: {
      // backgroundColor: `${palette.additional["gray"][9]} !important`,
      opacity: `0.6 !important`,
      zIndex: 2,
    },
  };
});
