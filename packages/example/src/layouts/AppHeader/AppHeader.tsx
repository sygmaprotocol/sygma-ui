import React from "react";
import clsx from "clsx";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
// import { Typography } from "@chainsafe/common-components";
import Typography from "@mui/material/Typography";
import { Switch, NavLink, Link } from "react-router-dom";

import { shortenAddress } from "../../utils/Helpers";
import { useSygma } from "@chainsafe/sygma-ui-core";
import { useStyles } from "./styles";

const ROUTE_LINKS_HEADERS = [{ route: "/transfer", label: "Transfer" }];

interface IAppHeader {}

const AppHeader: React.FC<IAppHeader> = () => {
  const classes = useStyles();
  const { homeConfig, isReady, address } = useSygma();

  const { __RUNTIME_CONFIG__ } = window;

  const indexerEnabled = "INDEXER_URL" in __RUNTIME_CONFIG__;

  return (
    <AppBar position="static" className={clsx(classes.root)}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className={classes.left}>
            {/* ADD LOGO HERE */}
            <div className={classes.logo}>
              <img src="/assets/images/logo.svg" alt="logo" />
            </div>
            <div className={classes.mainTitle}>
              <Typography variant="h5">Sygma Token Transfer</Typography>
            </div>
          </div>
          <section className={classes.state}>
            {!isReady ? (
              <Typography variant="h5">No wallet connected</Typography>
            ) : (
              <>
                <div className={classes.mainInfo}>
                  <Typography variant="h5" className={classes.address}>

                      <span className={classes.indicator} />
                      <span>
                        <strong>{homeConfig?.name}</strong>
                      </span>
                    
                  </Typography>
                  <div className={classes.accountInfo}>
                    <Typography variant="h5" className={classes.address}>
                      {address && shortenAddress(address)}
                    </Typography>
                  </div>
                </div>
              </>
            )}
          </section>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppHeader;
