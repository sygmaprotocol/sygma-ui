import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";

export const useStyles = makeStyles(
  ({ animation, constants, palette, breakpoints }: ITheme) => {
    return createStyles({
      root: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: 30,
        marginTop: 10,
        [breakpoints.between("sm", "xl")]: {
          paddingTop: 20,
          marginTop: 55,
        },
      },
      inner: {
        // paddingTop: (constants.navItemHeight as number) * 2,
        // paddingBottom: (constants.navItemHeight as number) * 2,
      },
      cta: {
        display: "block",
        maxWidth: 200,
        maxHeight: 200,
        position: "fixed",
        bottom: constants.generalUnit * 3,
        right: constants.generalUnit * 3,
      },
      content: {
        // position: "absolute",
        // top: "50%",
        // left: "50%",
        // transform: "translate(-50%, -50%)",
        margin: `30px auto`,
        maxWidth: 460,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        // border: "1px solid black",
        // borderRadius: 4,
      },
      explorerMainContent: {
        width: "100%",
        height: "100%",
        margin: "0 auto",
      },
      pageArea: {
        height: "100%",
        width: "100%",
        overflow: "hidden",
      },
      explorerArea: {
        width: "100%",
        height: "100vh",
        marginTop: 86,
      },
      navTabs: {
        // position: "absolute",
        // top: 0,
        // left: 0,
        width: "100%",
        // transform: "translate(0,-100%)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: `0 ${constants.generalUnit}px`,
        transform: "translateY(1px)",
        "& > a": {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: `${constants.generalUnit}px ${
            constants.generalUnit * 1.5
          }px`,
          border: `1px solid ${palette.additional["gray"][7]}`,
          textDecoration: "none",
          marginRight: constants.generalUnit,
          transitionDuration: `${animation.transform}ms`,
          color: palette.additional["gray"][8],
          maxHeight: constants.navItemHeight,
          "& svg": {
            transitionDuration: `${animation.transform}ms`,
            fill: palette.additional["gray"][8],
          },
          "&.active": {
            color: palette.additional["gray"][9],
            textDecoration: "underline",
            "& svg": {
              fill: palette.additional["geekblue"][5],
            },
          },
          "& > *:first-child": {
            marginRight: constants.generalUnit,
          },
        },
        "& svg": {
          height: 14,
          width: 14,
        },
      },
      transferTab: {
        zIndex: 1,
        backgroundColor: "#f0f0f0",
        boxShadow:
          "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
        "& span": {
          backgroundColor: "unset",
        },
        "& .MuiTab-root": {
          minHeight: 48,
          minWidth: 160,
          color: "#FF7A45",
          fontWeight: 500,
          fontSize: 20,
          textTransform: "initial",
        },
      },
    });
  }
);
