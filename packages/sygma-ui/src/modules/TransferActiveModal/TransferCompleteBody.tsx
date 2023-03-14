import React from "react";

import { Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { BridgeConfig } from "../../sygmaConfig";

export default function TransferCompleteBody({
  classes,
  close,
  homeConfig,
  depositAmount,
  tokenSymbol,
  destinationChainConfig,
  savedWallet,
}: {
  classes: any;
  close: () => void;
  homeConfig?: BridgeConfig;
  homeTransferTxHash?: string;
  depositAmount?: number;
  tokenSymbol?: string;
  destinationChainConfig?: BridgeConfig;
  savedWallet: string;
}) {
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
          {savedWallet !== "WalletConnect" ? (
            <Button size="small" className={classes.button} onClick={close}>
              Start new transfer
            </Button>
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
