import React, { useState } from "react";
import { Typography, Button } from "@mui/material";

import { useWeb3 } from "../../contexts";

import { ConnectionDialog } from "..";

import { BridgeConfig } from "../../sygmaConfig";
import { shortenAddress } from "../../utils/Helpers";

import { useStyles } from "./styles";

type TopBarNetworkConnectProps = {
  isReady: boolean | undefined;
  walletConnecting: boolean;
  homeConfig: BridgeConfig | undefined;
  address: string | undefined;
};

export default function TopBarNetworkConnect({
  isReady,
  walletConnecting,
  homeConfig,
  address,
}: TopBarNetworkConnectProps) {
  const { classes } = useStyles();

  const { dispatcher } = useWeb3();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ConnectionDialog
        dispatcher={dispatcher}
        open={open}
        handleClose={handleClose}
      />
      <section className={classes.state}>
        {!isReady ? (
          <Button
            fullWidth
            variant="contained"
            onClick={handleClickOpen}
            sx={{ px: 3, fontSize: 18 }}
          >
            Connect Wallet
          </Button>
        ) : (
          <>
            <div className={classes.mainInfo}>
              <Typography variant="h6" className={classes.address}>
                {/* <span className={classes.indicator} /> */}
                {homeConfig && (
                  <img
                    src={`/assets/images/networks/${homeConfig.nativeTokenSymbol.toLocaleLowerCase()}.svg`}
                    className={classes.indicator}
                  />
                )}
              </Typography>
              <div className={classes.accountInfo}>
                <Typography variant="h6" className={classes.address}>
                  {address && shortenAddress(address)}
                </Typography>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
