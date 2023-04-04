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

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: '"NeueMontreal", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export const nftPageTheme = createTheme(theme, {
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
      light: "#CDC2B1",
      main: "#000000",
    },
    secondary: {
      main: "#DBD3C7",
      dark: "#CDC2B1",
    },
    background: {
      default: "#E9E4DD",
    },
    text: {
      secondary: "#000",
    },
    action: {
      disabledBackground: "#CDC2B1",
    },
    success: {
      main: "#588E23",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#CDC2B1",
          borderWidth: 2,
          top: 0,
          legend: {
            display: "none",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        iconOutlined: {
          color: "#000",
        },
        select: {
          fontWeight: "500",
          letterSpacing: "0.01em",
          em: {
            color: "#5D503C",
          },
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
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }: any) => ({
          textTransform: "none",
          color: "black",
          lineHeight: 1.6,
          boxShadow: "none",
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              "&:hover": {
                backgroundColor: "#CDC2B1",
                borderColor: "unset",
                boxShadow: "none",
              },
              "&:active": {
                boxShadow: "none",
                backgroundColor: "#CDC2B1",
                borderColor: "unset",
              },
              "&:focus": {
                // boxShadow: "0 0 0 0.2rem rgba(254,86,20,.5)",
              },
            }),
        }),
      },
    },
  },
});
