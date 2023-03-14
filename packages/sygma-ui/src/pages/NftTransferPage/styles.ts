import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(() => {
  return {
    root: {
      position: "relative",
      // width: 800,
    },
    fees: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginBottom: 8,
      "& > *": {
        display: "block",
        width: "50%",
        marginBottom: 8 / 2,
        "&:nth-of-type(even)": {
          textAlign: "right",
        },
      },
    },
  };
});
