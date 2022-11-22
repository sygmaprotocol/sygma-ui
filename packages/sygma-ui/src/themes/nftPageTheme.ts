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

export const nftPageTheme = createTheme(theme, {
  palette: {
    primary: {
      light: "#FE5614",
      main: "#FE5614",
    },
    secondary: {
      main: "#CDC2B1",
    },
    background: {
      default: "#E9E4DD",
    },
    text: {
      secondary: "#000",
    },
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
          color: "#CDC2B1",
        },
        select: {
          em: {
            color: "#CDC2B1",
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
  },
});
