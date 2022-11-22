import React, { useEffect, useState } from "react";
import { CustomModal } from "../../components";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { useNetworkManager, useHomeBridge, useWeb3 } from "../../contexts";
import { sygmaConfig } from "../../sygmaConfig";
import { ROUTE_LINKS } from "../../routes";
import { useStyles } from "./styles";

const NetworkUnsupportedModal = () => {
  const { classes } = useStyles();
  const { homeChainConfig } = useWeb3();
  const { getNetworkName, wrapTokenConfig, isReady, networkId } =
    useHomeBridge();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  const [supportedNetworks, setSupportedNetworks] = useState<string[]>([]);

  useEffect(() => {
    if (pathname === ROUTE_LINKS.Transfer) {
      setOpen(!homeChainConfig && !!isReady);
      setSupportedNetworks(
        sygmaConfig()
          .chains.filter((bc) => bc.networkId !== undefined)
          .map((bc) => bc.name)
      );
    } else {
      setOpen(false);
      setSupportedNetworks([]);
    }
  }, [pathname, setOpen, homeChainConfig, isReady, wrapTokenConfig]);

  return (
    <CustomModal
      className={classes.root}
      injectedClass={{
        inner: classes.inner,
      }}
      active={open}
      closePosition="none"
    >
      <section>
        <Typography className={classes.heading} variant="h3" component="h3">
          Network Unsupported
        </Typography>
        <Typography component="p" variant="body1">
          This app does not currently support transfers on this network. Please
          change networks from within your browser wallet.
        </Typography>
        <br />
        <Typography component="p" variant="body1">
          This app is configured to work on {supportedNetworks.join(", ")}{" "}
          networks.
        </Typography>
        <section className={classes.buttons}>
          <a
            rel="noopener noreferrer"
            href={process.env.REACT_APP_SUPPORT_URL}
            target="_blank"
          >
            <Button variant="outlined">
              Ask a question on {process.env.REACT_APP_SUPPORT_SERVICE}
            </Button>
          </a>
        </section>
      </section>
    </CustomModal>
  );
};

export default NetworkUnsupportedModal;
