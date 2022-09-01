import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";

export const useStyles = makeStyles(
  ({ constants, palette, zIndex, breakpoints }: ITheme) => {
    return createStyles({
      root: {
        backgroundColor: palette.additional["header"][1],
        borderBottom: `1px solid rgba(255, 122, 69, 0.16)`,
        color: palette.additional["header"][2],
        boxShadow:
          "0px 1px 4px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.02), 0px 1px 12px rgba(0, 0, 0, 0.12)",
        borderRadius: "0px 0px 10.6667px 10.6667px",
      },
      left: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        [breakpoints.down("sm")]: {
          display: "flex",
          flexDirection: "column",
        },
      },
      logo: {
        marginRight: 11,
        height: constants.generalUnit * 5,
        width: constants.generalUnit * 5,
        "& svg, & img": {
          maxHeight: "100%",
          maxWidth: "100%",
        },
      },
      state: {
        // display: "flex",
        // flexDirection: "row",
        // alignItems: "center",
      },
      indicator: {
        display: "block",
        height: 16,
        width: 16,
        marginRight: constants.generalUnit,
      },
      address: {
        marginRight: constants.generalUnit,
        display: "flex",
        alignItems: "center",
      },
      network: {},
      accountInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      },
      mainInfo: {
        display: "flex",
      },
      mainTitle: {
        display: "flex",
        alignItems: "center",
      },
      headerLinks: {
        marginLeft: 49,
        display: "flex",
        [breakpoints.down("sm")]: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginLeft: "unset",
          alignItems: "center",
          width: "100%",
          "& > a:last-child": {
            marginLeft: 5,
          },
        },
      },
      link: {
        marginLeft: 46,
        textDecoration: "none",
        [breakpoints.down("sm")]: {
          marginLeft: "unset",
        },
      },
      linkTitle: {
        fontSize: 16,
      },
    });
  }
);
