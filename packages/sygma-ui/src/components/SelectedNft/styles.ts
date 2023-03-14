import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(() => {
  return {
    selectedImage: {
      maxWidth: "100%",
      padding: 0,
      margin: 0,
      display: "block",
    },
  };
});
