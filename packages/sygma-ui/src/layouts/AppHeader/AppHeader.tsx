import React from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { NavLink } from "react-router-dom";

import TopBarNetworkConnect from "../../modules/TopBarNetworkConnect";
import { useSygma } from "../../contexts";
import { useStyles } from "./styles";

const AppHeader: React.FC = () => {
  const { classes } = useStyles();
  const { homeConfig, isReady, address } = useSygma();
  const { __RUNTIME_CONFIG__ } = window;
  const nftTokenPage = __RUNTIME_CONFIG__.UI.nftTokenPage;

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
                  display: { xs: "none", sm: "flex", md: "flex" },
                  ml: 2,
                  background: "#DBD3C7",
                  borderRadius: 1,
                  height: 40,
                }}
              >
                <Button
                  component={NavLink}
                  to="/transfer"
                  sx={{
                    px: 2,
                    display: "block",
                    fontSize: 18,
                    "&.active": {
                      background: "#CDC2B1",
                    },
                  }}
                >
                  Token Bridge
                </Button>

                {nftTokenPage && (
                  <Button
                    component={NavLink}
                    to="/nft_transfer"
                    sx={{
                      px: 2,
                      display: "block",
                      fontSize: 18,
                      "&.active": {
                        background: "#CDC2B1",
                      },
                    }}
                  >
                    NFT Bridge
                  </Button>
                )}
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
