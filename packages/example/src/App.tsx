import React, { useState, useEffect } from "react";
import { utils, ethers } from "ethers";

import { init, ErrorBoundary, showReportDialog } from "@sentry/react";
import { ThemeSwitcher } from "@chainsafe/common-theme";
import CssBaseline from "@mui/material/CssBaseline";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { BrowserRouter as Router } from "react-router-dom";

import { SygmaRoutes } from "./routes";
import { lightTheme } from "./themes/LightTheme";
import {
  SygmaProvider,
  NetworkManagerProvider,
  LocalProvider,
  sygmaConfig,
  BridgeProvider,
} from "@chainsafe/sygma-ui-core";
import { AppWrapper } from "./layouts";
import { getSygmaConfig } from "./getSygmaConfig";
import "./font-faces.css";

if (
  process.env.NODE_ENV === "production" &&
  process.env.REACT_APP_SENTRY_DSN_URL &&
  process.env.REACT_APP_SENTRY_RELEASE
) {
  init({
    dsn: process.env.REACT_APP_SENTRY_DSN_URL,
    release: process.env.REACT_APP_SENTRY_RELEASE,
  });
}

const AppWrap: React.FC<{
  config?: any;
  useExternalProvider?: any;
  externalProviderSource?: any;
}> = (props) => {
  const [isReady, setIsReady] = useState(false);
  const [errMessage, setErrMessage] = useState<undefined | string>();

  const setConfig = async () => {
    if (!window.__RUNTIME_CONFIG__) {
      const config = await getSygmaConfig();
      if (config.error) {
        setErrMessage(config.error.message ?? config.error.name);
      } else {
        // @ts-ignore
        window.__RUNTIME_CONFIG__ = config;
      }
      setIsReady(true);
    }
  };

  useEffect(() => {
    setConfig();
  }, []);
  return (
    <>
      {isReady ? (
        errMessage ? (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={3}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {errMessage}
              </Alert>
            </Grid>
          </Grid>
        ) : (
          <App />
        )
      ) : (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress size="6rem" />
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

const App: React.FC<{}> = () => {
  const {
    __RUNTIME_CONFIG__: {
      UI: { wrapTokenPage = false } = {},
      SYGMA: { chains },
    },
  } = window;

  const tokens = sygmaConfig()
    .chains.filter((c) => c.type === "Ethereum")
    .reduce((tca, bc: any) => {
      if (bc.networkId) {
        return {
          ...tca,
          [bc.networkId]: bc.tokens,
        };
      } else {
        return tca;
      }
    }, {});

  const rpcUrls = chains.reduce(
    (acc, { networkId, rpcUrl }) => ({ ...acc, [networkId!]: rpcUrl }),
    {}
  );

  return (
    <ErrorBoundary
      fallback={({ error, componentStack, eventId, resetError }) => (
        <div>
          <p>
            An error occurred and has been logged. If you would like to provide
            additional info to help us debug and resolve the issue, click the
            "Provide Additional Details" button
          </p>
          <p>{error?.message.toString()}</p>
          <p>{componentStack}</p>
          <p>{eventId}</p>
          <button onClick={() => showReportDialog({ eventId: eventId || "" })}>
            Provide Additional Details
          </button>
          <button onClick={resetError}>Reset error</button>
        </div>
      )}
      onReset={() => window.location.reload()}
    >
      <ThemeSwitcher themes={{ light: lightTheme }}>
        <CssBaseline />
        <LocalProvider
          networkIds={[5]}
          checkNetwork={false}
          tokensToWatch={tokens}
          onboardConfig={{
            walletSelect: {
              wallets: [
                { walletName: "metamask" },
                {
                  walletName: "walletConnect",
                  rpc: { ...rpcUrls },
                  bridge: "https://bridge.walletconnect.org",
                },
              ],
            },
            subscriptions: {
              network: (network: any) =>
                network && console.log("domainId: ", network),
              balance: (amount: any) =>
                amount && console.log("balance: ", utils.formatEther(amount)),
            },
          }}
        >
          <BridgeProvider>
            <SygmaProvider chains={chains}>
              <Router>
                <AppWrapper wrapTokenPage={wrapTokenPage}>
                  <SygmaRoutes wrapTokenPage={wrapTokenPage} />
                </AppWrapper>
              </Router>
            </SygmaProvider>
          </BridgeProvider>
        </LocalProvider>
      </ThemeSwitcher>
    </ErrorBoundary>
  );
};

export default AppWrap;
