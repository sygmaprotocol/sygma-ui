import React from "react";
import Box from "@mui/material/Box";
import { BridgeConfig } from "../../sygmaConfig";
import { Button, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import CancelIcon from "@mui/icons-material/Cancel";

export default function ErrorTransferBody({
  close,
  homeConfig,
  homeTransferTxHash,
}: {
  classes: any;
  close: () => void;
  homeConfig?: BridgeConfig;
  homeTransferTxHash?: string;
  transferTxHash?: string;
}) {
  const {
    __RUNTIME_CONFIG__: { UI_EXPLORER_URL },
  } = window;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 500, mb: 4, textAlign: "center" }}
      >
        Something went wrong and we could not complete your transfer.
        <br />
        <CancelIcon color="error" />
      </Typography>
      <Stack spacing={2}>
        {homeConfig && UI_EXPLORER_URL && homeTransferTxHash && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              href={`${UI_EXPLORER_URL}/explorer/transaction/${homeTransferTxHash}`}
              size="large"
              variant="contained"
              color="primary"
              onClick={close}
            >
              View on explorer
            </Button>
          </Box>
        )}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={close}
          >
            Start new transfer
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
