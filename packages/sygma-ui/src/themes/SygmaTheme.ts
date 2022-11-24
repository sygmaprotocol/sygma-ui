import { createTheme } from "@mui/material/styles";

interface IConstants {
  generalUnit: number;
  modal: Record<string, any>;
  icon: Record<string, any>;
  [key: string]: number | string | Record<string, any> | undefined;
}

declare module "@mui/material/styles" {
  interface Theme {
    constants: IConstants;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    constants?: IConstants;
  }

  interface Palette {
    additional: {
      [key: string]: {
        [key: number]: string;
      };
    };
  }
  interface PaletteOptions {
    additional?: {
      [key: string]: {
        [key: number]: string;
      };
    };
  }
}

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export const SygmaTheme = createTheme(theme, {
  constants: {
    generalUnit: 8,
    icon: {
      width: 25,
      height: 25,
    },
    modal: {
      inner: {
        minWidth: 30,
        maxWidth: theme.breakpoints.values["md"],
        // maxWidth: 900
      },
      backgroundFade: 0.4,
    },
  },
  palette: {
    primary: {
      light: "#FF7A45",
      main: "#FF7A45",
    },
    secondary: {
      light: "#FE5614",
      main: "#CDC2B1",
    },
    background: {
      default: "#E9E4DD",
    },
    text: {
      primary: "#FE5614",
      secondary: "#FE5614",
      disabled: "rgba(254,86,20, 0.4)",
    },
    action: {
      disabled: "rgba(254,86,20, 0.4)",
      disabledBackground: "rgba(254,86,20, 0.4)",
    },
    additional: {
      general: {
        1: "#85A5FF", // Accents //geekblue4
      },
      transferUi: {
        1: "#595959", // FAQ button // gray8
      },
      header: {
        1: "#F0F0F0", // Background
        2: "#FF7A45", // Text color //gray8
        3: "#BFBFBF", // border // gray6
      },
      preflight: {
        1: "#85A5FF", // Button bg color
        2: "#262626", // Button color
      },
      transactionModal: {
        1: "#597EF7", // border //geekblue5
        2: "#85A5FF", // indicator border //geekblue4
        3: "#2F54EB", // indicator text //geekblue6
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "unset",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 48,
          minWidth: 160,
          color: "#FF7A45",
          fontWeight: 500,
          fontSize: 20,
          textTransform: "initial",
        },
        selected: {},
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }: any) => ({
          textTransform: "none",
          color: theme.palette.common.black,
          lineHeight: 1.6,
          boxShadow: "none",
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              "&:hover": {
                backgroundColor: "#FE5614",
                borderColor: "#FE5614",
                boxShadow: "none",
              },
              "&:active": {
                boxShadow: "none",
                backgroundColor: "#FE5614",
                borderColor: "#FE5614",
              },
              "&:focus": {
                boxShadow: "0 0 0 0.2rem rgba(254,86,20,.5)",
              },
            }),
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#FE5614",
          color: "#FE5614",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        iconOutlined: {
          color: "#FE5614",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontWeight: "700",
        },
      },
    },
  },
});
