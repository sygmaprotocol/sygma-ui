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

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const sygmaTheme = createTheme(theme, {
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
      main: "#FE5614",
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
  },
});
