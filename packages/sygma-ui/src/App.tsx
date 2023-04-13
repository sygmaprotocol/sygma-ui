import React, { useEffect, useState } from "react";
import { utils } from "ethers";

import { ErrorBoundary, init, showReportDialog } from "@sentry/react";
import { ThemeProvider } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { BrowserRouter as Router } from "react-router-dom";

import { SygmaRoutes } from "./routes";
import { SygmaTheme } from "./themes/SygmaTheme";

import { BridgeProvider, LocalProvider, SygmaProvider } from "./contexts";
import { sygmaConfig } from "./sygmaConfig";
import { AppWrapper } from "./layouts";
import { configMerger } from "./configLoader";
import { ConfigError } from "./types/sharedConfig";
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
}> = () => {
  const [isReady, setIsReady] = useState(false);
  const [errMessage, setErrMessage] = useState<undefined | string>();

  const setConfig = async () => {
    if (!window.__RUNTIME_CONFIG__) {
      const config = await configMerger("Substrate");
      console.log("🚀 ~ file: App.tsx:51 ~ setConfig ~ config:", config);
      if ((config as ConfigError).error) {
        setErrMessage(
          (config as ConfigError).error.message ??
            (config as ConfigError).error.name
        );
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

const App: React.FC = () => {
  const {
    __RUNTIME_CONFIG__: {
      UI: { nftTokenPage = false } = {},
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
        <>
          <div>
            <p>
              An error occurred and has been logged. If you would like to
              provide additional info to help us debug and resolve the issue,
              click the "Provide Additional Details" button
            </p>
            <p>{error?.message.toString()}</p>
            <p>{componentStack}</p>
            <p>{eventId}</p>
            <button
              onClick={() => showReportDialog({ eventId: eventId || "" })}
            >
              Provide Additional Details
            </button>
            <button onClick={resetError}>Reset error</button>
          </div>
        </>
      )}
      onReset={() => window.location.reload()}
    >
      <>
        <ThemeProvider theme={SygmaTheme}>
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
                  <AppWrapper nftTokenPage={nftTokenPage}>
                    <SygmaRoutes wrapTokenPage={nftTokenPage} />
                  </AppWrapper>
                </Router>
              </SygmaProvider>
            </BridgeProvider>
          </LocalProvider>
        </ThemeProvider>
      </>
    </ErrorBoundary>
  );
};

export default AppWrap;
