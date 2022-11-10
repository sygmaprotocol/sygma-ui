// import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(({ constants }) => {
  return {
    root: {
      height: "100%",
      borderTopLeftRadius: constants.generalUnit / 2,
      borderTopRightRadius: constants.generalUnit / 2,
      overflow: "hidden",
      position: "absolute",
    },
  };
});
