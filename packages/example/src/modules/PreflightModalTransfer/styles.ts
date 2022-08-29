import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";

export const useStyles = makeStyles(({ constants, palette, zIndex }: ITheme) =>
  createStyles({
    root: {
      width: '100% !important',
      zIndex: zIndex?.blocker,
      position: "absolute",
      backgroundColor: '#F0F0F0 !important',
      boxShadow: 'inset 0px 7px 5px -6px rgb(50 50 50 / 75%);',
      "& li": {
        position: "relative",
        padding: `${constants.generalUnit}px 0 ${constants.generalUnit}px ${
          constants.generalUnit * 8
        }px`,
        "&:before": {
          content: "''",
          display: "block",
          backgroundColor: '#FF7A45',
          height: constants.generalUnit,
          width: constants.generalUnit,
          borderRadius: "50%",
          position: "absolute",
          top: "50%",
          left: constants.generalUnit * 4,
          transform: "translate(-50%, -50%)",
        },
      },
    },
    title: {
      fontWeight: 700,
      fontSize: '16px',
      fontStyle: 'normal',
      color: '#FF7A45',
      lineHeight: '24px',
      letterSpacing: '0.01em'
    },
    subtitle: {
      margin: `${constants.generalUnit * 2}px 0`,
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '20px',
      fontStyle: 'normal',
      color: '#979797'
    },
    list: {
      '& li > span': {
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
        color: '#979797',
        fontStyle: 'normal'
      },
    },
    agreement: {
      margin: `${constants.generalUnit * 2}px 0`,
      color: '#979797',
      fontSize: '14px',
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: '24px'
    },
    startButton: {
      backgroundColor: '#F0F0F0',
      border: '2px solid #FF7A45',
      borderRadius: '8px',
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.16), 0px 2px 4px rgba(0, 0, 0, 0.12), 0px 1px 8px rgba(0, 0, 0, 0.1)',
      color: '#FF7A45',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      fontStyle: 'normal',
      letterSpacing: '0.01em',
      textTransform: 'uppercase',
      marginBottom: constants.generalUnit * 2,
    },
    backdrop: {
      position: "absolute",
      zIndex: zIndex?.layer4,
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column'
    },
    buttonBack: {
      color: '#979797',
      textDecoration: 'underline',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '24px',
      fontStyle: 'normal',
      border: 'none',
      backgroundColor: '#F0F0F0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start'
    }
  })
);
