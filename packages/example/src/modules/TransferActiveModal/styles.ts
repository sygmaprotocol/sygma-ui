import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";

export const useStyles = makeStyles(
  ({ animation, constants, palette, typography }: ITheme) =>
    createStyles({
      "@global": {
        "@keyframes pulsate": {
          '0%': {
            filter: "blur(0)",
            transition: "filter ease-in"
          },
          '100%': {
            filter: "blur(8px)",
            transition: "filter ease-out"
          }
        },
      },
      root: {
        "& :before": {
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }
      },
      mainContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      },
      elipsisContent: {
        display: 'grid'
      },
      elipsis: {
        border: "2px solid #FF7A45",
        borderRadius: "50%",
        height: "181px",
        width: "181px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        animation: "1s pulsate 1s infinite ease-in",
        gridRow: 1,
        gridColumn: 1
      },
      svgIcon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gridColumn: 1,
        gridRow: 1
      },
      inner: {
        width: "100% !important",
        height: "100%",
        maxWidth: "unset !important",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: `${constants.generalUnit * 5}px ${constants.generalUnit * 3.5
          }px`,
        bottom: 0,
        top: "unset !important",
        transform: "unset !important",
        left: "0 !important",
        border: "none",
        borderRadius: 0,
        transitionDuration: `${animation.transform}ms`,
      },
      heading: {
        marginBottom: constants.generalUnit,
        whiteSpace: "nowrap",
        color: '#FF7A45',
        fontWeight: 700,
        fontSize: "16px",
        lineHeight: "24px",
        fontStyle: "normal",
        letterSpacing: "0.01em",
      },
      stepIndicator: {
        ...typography.h4,
        height: 40,
        width: 40,
        marginRight: constants.generalUnit * 2,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #FF7A45",
        color:"#979797",
        fontSize: "16px",
        fontWeight: 700,
        lineHeight: "24px",
        fontStyle: "normal",
        letterSpacing: "0.01em",
        background: "#E9E4DD",
        "& svg": {
          height: 20,
          width: 20,
          display: "block",
        },
      },
      content: {
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline",
        marginTop: "81px",
        width: "100%",
        justifyContent: "center"
      },
      buttons: {
        // display: "flex",
        // flexDirection: "row",
        marginTop: constants.generalUnit * 5,
        "& > *": {
          textDecoration: "none",
          marginRight: constants.generalUnit,
        },
      },
      button: {
        borderColor: `${palette.additional["gray"][8]} !important`,
        color: `${palette.additional["gray"][8]} !important`,
        textDecoration: "none",
        "&:hover": {
          borderColor: `${palette.additional["gray"][8]} !important`,
          backgroundColor: `${palette.additional["gray"][8]} !important`,
          color: `${palette.common.white.main} !important`,
          textDecoration: "none",
        },
      },
      initCopy: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "& > *:first-child": {
          marginTop: constants.generalUnit * 3.5,
          marginBottom: constants.generalUnit * 8,
        },
      },
      sendingCopy: {},
      vote: {
        display: "flex",
        flexDirection: "row",
        marginTop: constants.generalUnit,
        "& > *": {
          "&:first-child": {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: 240,
          },
          "&:last-child": {
            marginLeft: constants.generalUnit * 3.5,
            fontStyle: "italic",
          },
        },
      },
      warning: {
        marginTop: constants.generalUnit * 3.5,
        display: "block",
        fontWeight: 600,
      },
      warningMsg: {
        marginTop: "65px",
        fontWeight: 400,
        fontStyle: "normal",
        fontSize: "14px",
        lineHeight: "24px",
        color: "#979797",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      },
      receipt: {
        marginTop: constants.generalUnit * 3.5,
        marginBottom: constants.generalUnit * 8,
      },
      weighted: {
        fontWeight: 600,
      },
      progress: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        "& > *": {
          borderRadius: "0 !important",
          "&  >  *": {
            borderRadius: "0 !important",
            background: `${palette.additional["transactionModal"][1]} !important`,
          },
        },
      },
    })
);
