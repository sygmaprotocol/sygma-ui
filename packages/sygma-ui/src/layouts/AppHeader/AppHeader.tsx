import React from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Switch, NavLink, Link } from "react-router-dom";

import TopBarNetworkConnect from "../../modules/TopBarNetworkConnect";

import { shortenAddress } from "../../utils/Helpers";
import { useSygma } from "../../contexts";
import { useStyles } from "./styles";

const ROUTE_LINKS_HEADERS = [
  { route: "/transfer", label: "Token Bridge" },
  // temporarily commented
  // { route: "/nft_transfer", label: "NFT Bridge" },
];

interface IAppHeader {}

const AppHeader: React.FC<IAppHeader> = () => {
  const { classes } = useStyles();
  const { homeConfig, isReady, address } = useSygma();

  const { __RUNTIME_CONFIG__ } = window;

  const indexerEnabled = "INDEXER_URL" in __RUNTIME_CONFIG__;

  return (
    <>
      <AppBar
        position="static"
        color="transparent"
        className={clsx(classes.root)}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <div className={classes.left}>
              <a href="/" className={classes.logo}>
                <img src="/assets/images/logo1.svg" alt="logo" />
              </a>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  ml: 2,
                  background: "#DBD3C7",
                  borderRadius: 1,
                  height: 40,
                }}
              >
                {ROUTE_LINKS_HEADERS.map(({ route, label }) => (
                  <Button
                    component={NavLink}
                    to={route}
                    key={route}
                    sx={{
                      px: 2,
                      display: "block",
                      fontSize: 18,
                      "&.active": {
                        background: "#CDC2B1",
                      },
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Box>
            </div>
            <TopBarNetworkConnect
              isReady={isReady}
              walletConnecting={false}
              homeConfig={homeConfig}
              address={address}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default AppHeader;
