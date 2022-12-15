import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(
  ({ constants, palette, breakpoints, zIndex, transitions }) => {
    return {
      root: {
        zIndex: zIndex.appBar,
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100%",
        maxHeight: "100%",
        opacity: 0,
        visibility: "hidden",
        display: "flex",
        flexDirection: "column",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transitionDuration: `${transitions.duration.standard}ms`,
        transitionProperty: "opacity",
        "&:before": {
          content: "''",
          display: "block",
          width: "100%",
          height: "100%",
          position: "absolute",
          opacity: constants.modal?.backgroundFade,
          top: 0,
          left: 0,
          zIndex: 0,
          backgroundColor: palette.common.black,
          transitionDuration: `${transitions.duration.standard}ms`,
        },
        "& > *": {
          opacity: 0,
          visibility: "hidden",
          transitionDuration: `${transitions.duration.standard}ms`,
        },
        "&.active": {
          visibility: "visible",
          opacity: 1,
          "& > *": {
            opacity: 1,
            visibility: "visible",
          },
        },
      },
      inner: {
        ...constants.modal.inner,
        flexGrow: 1,
        display: "flex",
        backgroundColor: "#f0f0f0",
        top: "50%",
        left: "50%",
        position: "absolute",
        borderRadius: `${constants.generalUnit / 2}`,
        transform: "translate(-50%, -50%)",
        "&.xs": {
          width: `calc(100% - ${constants.generalUnit * 2}px)`,
          maxWidth: breakpoints.values["xs"],
        },
        "&.sm": {
          width: `calc(100% - ${constants.generalUnit * 2}px)`,
          maxWidth: breakpoints.values["sm"],
        },
        "&.md": {
          width: `calc(100% - ${constants.generalUnit * 2}px)`,
          maxWidth: breakpoints.values["md"],
        },
        "&.lg": {
          width: `calc(100% - ${constants.generalUnit * 2}px)`,
          maxWidth: breakpoints.values["lg"],
        },
        "&.xl": {
          width: `calc(100% - ${constants.generalUnit * 2}px)`,
          maxWidth: breakpoints.values["lg"],
        },
      },
      closeIcon: {
        ...constants.icon,
        width: 15,
        height: 15,
        display: "block",
        top: 0,
        cursor: "pointer",
        position: "absolute",
        "& svg": {
          stroke: palette.common.black,
        },
        "&.right": {
          transform: "translate(-50%, 50%)",
          right: 0,
        },
        "&.left": {
          left: 0,
          transform: "translate(50%, -50%)",
        },
        "&.none": {
          display: "none",
        },
      },
    };
  }
);
