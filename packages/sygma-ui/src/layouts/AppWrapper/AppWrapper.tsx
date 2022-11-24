import React, { useEffect, useState } from "react";
import { ReactNode } from "react";

import Paper from "@mui/material/Paper";

import {
  Switch,
  NavLink,
  Link,
  useLocation,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import AppHeader from "../AppHeader/AppHeader";
import { ReactComponent as GlobalSvg } from "../../media/Icons/global.svg";
import { ReactComponent as GiftSvg } from "../../media/Icons/gift.svg";
import { ReactComponent as TransferSvg } from "../../media/Icons/transfer.svg";

import { ConnectionDialog } from "../../modules";

import {
  useBridge,
  useSygma,
  useHomeBridge,
  useNetworkManager,
  useWeb3,
} from "../../contexts";

import { ROUTE_LINKS } from "../../routes";
import { useStyles } from "./styles";

interface IAppWrapper {
  children: ReactNode | ReactNode[];
  nftTokenPage?: boolean;
}

const AppWrapper: React.FC<IAppWrapper> = ({
  children,
  nftTokenPage,
}: IAppWrapper) => {
  const { classes } = useStyles();
  const [enableNavTabs, setEnableNavTabs] = useState(true);

  const { isReady, showConnectionDialog, dispatcher } = useWeb3();

  const location = useLocation();
  const history = useHistory();

  const { __RUNTIME_CONFIG__ } = window;

  const indexerEnabled = "INDEXER_URL" in __RUNTIME_CONFIG__;

  useEffect(() => {
    if (location.pathname.includes("/explorer") && !indexerEnabled) {
      history.push("/transfer");
    }
  }, []);

  useEffect(() => {
    if (location.pathname.includes("/explorer")) {
      return setEnableNavTabs(false);
    }
    return setEnableNavTabs(true);
  }, [location]);

  const routeMatch = useRouteMatch([
    ROUTE_LINKS.Transfer,
    ROUTE_LINKS.NftTransfer,
  ]);
  const currentTab = routeMatch?.path;

  return (
    <>
      {enableNavTabs ? (
        <div>
          <AppHeader />
          <Container maxWidth="md">{children}</Container>
          {/* Put CTA here */}
          {/* <a className={classes.cta} rel="noopener noreferrer" target="_blank" href="#">
        </a> */}
          {!isReady && (
            <ConnectionDialog
              dispatcher={dispatcher}
              open={Boolean(showConnectionDialog)}
              handleClose={() =>
                dispatcher({ type: "setShowConnectionDialog", payload: false })
              }
            />
          )}
        </div>
      ) : (
        <div className={classes.explorerMainContent}>
          <AppHeader />
          <div className={classes.explorerArea}>{children}</div>
        </div>
      )}
    </>
  );
};

export default AppWrapper;
