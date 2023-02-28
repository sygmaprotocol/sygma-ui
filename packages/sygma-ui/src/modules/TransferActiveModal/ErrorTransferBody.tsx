import React from "react";
import { BridgeConfig } from "../../sygmaConfig";
import { Button, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function ErrorTransferBody({
  classes,
  close,
  homeConfig,
  homeTransferTxHash,
  transferTxHash,
}: {
  classes: any;
  close: () => void;
  homeConfig?: BridgeConfig;
  homeTransferTxHash?: string;
  transferTxHash?: string;
}) {
  return (
    <div className={classes.transferAbortedContainer}>
      <section className={classes.buttons}>
        <Stack direction="row" spacing={2}>
          <Button size="small" className={classes.button} onClick={close}>
            Start new transfer
          </Button>
        </Stack>
      </section>
      <Typography
        sx={{ mt: 3, mb: 4 }}
        component="p"
        className={classes.errorMessage}
      >
        Something went wrong and we could not complete your transfer.
      </Typography>
      {/* {homeConfig &&
        (homeConfig as EvmBridgeConfig).blockExplorer &&
        homeTransferTxHash && (
          <Button
            onClick={() =>
              window.open(
                `${
                  (homeConfig as EvmBridgeConfig).blockExplorer
                }/${transferTxHash}`,
                "_blank"
              )
            }
            size="small"
            className={classes.button}
            disabled
          >
            View transaction
          </Button>
        )} */}
    </div>
  );
}
