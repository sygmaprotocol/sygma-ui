import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  return {
    imageList: {
      display: "grid",
      padding: 0,
      margin: 0,
      [theme.breakpoints.up("sm")]: {
        gridTemplateColumns: "repeat(4, 1fr)",
      },
      [theme.breakpoints.up("md")]: {
        gridTemplateColumns: "repeat(6, 1fr)",
      },
    },
    imageListItem: {
      border: "4px solid transparent",
      borderRadius: theme.shape.borderRadius / 1.2,
      boxSizing: "content-box",
      cursor: "pointer",
      "&:hover": {
        borderWidth: "4px",
        borderColor: theme.palette.text.primary,
      },
      "& .MuiImageListItem-img": {
        objectFit: "contain",
        boxSizing: "border-box",

        borderRadius: theme.shape.borderRadius / 2,
      },
    },
  };
});
