import React, { useEffect, useState } from "react";

import { Typography, ButtonUnstyled, Stack } from '@mui/material'

import { BridgeConfig, EvmBridgeConfig } from "../../sygmaConfig";
import { Actions } from "@chainsafe/sygma-ui-core/dist/src/types";
import { API as OnboardAPI } from "bnc-onboard/dist/src/interfaces";

export default function TransferCompleteBody({
  classes,
  close,
  homeConfig,
  homeTransferTxHash,
  depositAmount,
  tokenSymbol,
  destinationChainConfig,
  savedWallet,
  resetOnboard,
  dispatcher,
  onboard,
}: {
  classes: any;
  close: () => void;
  homeConfig?: BridgeConfig;
  homeTransferTxHash?: string;
  depositAmount?: number;
  tokenSymbol?: string;
  destinationChainConfig?: BridgeConfig;
  savedWallet: string;
  resetOnboard: (
    dispatcher: (action: Actions) => void,
    onboard: OnboardAPI
  ) => void;
  dispatcher: (action: Actions) => void;
  onboard: OnboardAPI;
}) {
  const {
    __RUNTIME_CONFIG__: { UI_EXPLORER_URL },
  } = window;
  const [reload, setReload] = useState(false);

  const execTimeout = () => {
    return setTimeout(() => {
      setReload(true);
    }, 5000);
  };

  useEffect(() => {
    if (reload) {
      resetOnboard(dispatcher, onboard);
    }
  }, [reload]);

  useEffect(() => {
    if (savedWallet === "WalletConnect") {
      console.log("saved wallet =>", savedWallet);
      execTimeout();
    }
  }, []);

  return (
    <div className={classes.transferCompletedContainer}>
      <Typography sx={{ mt: 3, mb: 4 }} component="p">
        Successfully transferred{" "}
        <strong>
          {depositAmount} {tokenSymbol}
          <br /> from {homeConfig?.name} to {destinationChainConfig?.name}.
        </strong>
      </Typography>
      <section className={classes.buttons}>
        <Stack direction="row" spacing={2}>
          {homeConfig &&
            (homeConfig as EvmBridgeConfig).blockExplorer &&
            homeTransferTxHash && (
              <ButtonUnstyled
                href={`${UI_EXPLORER_URL}/explorer/transaction/${homeTransferTxHash}`}
                size="small"
                className={classes.button}
                variant="outlined"
              >
                View transfer
              </ButtonUnstyled>
            )}
          {savedWallet !== "WalletConnect" ? (
            <ButtonUnstyled
              size="small"
              className={classes.button}
              onClick={close}
            >
              Start new transfer
            </ButtonUnstyled>
          ) : (
            <Typography sx={{ mt: 3, mb: 4 }} component="p">
              Disconnecting from Wallet connect. Page will be reloaded
            </Typography>
          )}
        </Stack>
      </section>
    </div>
  );
}
