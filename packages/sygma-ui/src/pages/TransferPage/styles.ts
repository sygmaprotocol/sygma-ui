import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";

export const useStyles = makeStyles(({ constants, palette }: ITheme) =>
  createStyles({
    root: {
      position: "relative",
    },
    walletArea: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    connectButton: {
      margin: `${8 * 3}px 0 ${8 * 6}px`,
    },
    connecting: {
      textAlign: "center",
      marginBottom: 8 * 2,
    },
    connected: {
      width: "100%",
      "& > *:first-of-type": {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      },
    },
    changeButton: {
      cursor: "pointer",
    },
    networkName: {
      padding: `${8 * 2}px ${8 * 1.5}px`,
      borderRadius: 2,
      marginTop: 8,
      marginBottom: 8 * 3,
    },
    formArea: {
      "&.disabled": {
        opacity: 0.4,
      },
    },
    currencySection: {
      marginBottom: "20px",
    },
    tokenInputArea: {},
    tokenInputSection: {},
    tokenInput: {},
    maxButton: {
      border: "1px solid #FE5614",
      height: 32,
      color: "#FE5614",
      left: -1,
      "&:hover": {
        borderColor: "#FE5614",
      },
    },
    currencySelector: {
      paddingRight: 8,
      "& *": {
        cursor: "pointer",
      },
    },
    token: {},
    address: {
      margin: 0,
      marginBottom: 8 * 3,
    },
    addressInput: {},
    generalInput: {
      "& > span": {
        marginBottom: 8,
      },
    },
    faqButton: {
      cursor: "pointer",
      height: 20,
      width: 20,
      fill: `#FF7A45 !important`,
    },
    faucetLink: {
      color: "#FF7A45",
    },
    tokenItem: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      "& img, & svg": {
        display: "block",
        height: 14,
        width: 14,
        marginRight: 10,
      },
      "& span": {
        minWidth: `calc(100% - 20px)`,
        textAlign: "left",
      },
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
        "&:nth-child(even)": {
          textAlign: "right",
        },
      },
    },
    accountSelector: {
      marginBottom: 24,
    },
  })
);
