import React from "react";
import Box from "@mui/material/Box";

import { Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { BridgeConfig } from "../../sygmaConfig";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function TransferCompleteBody({
  close,
  homeConfig,
  homeTransferTxHash,
  depositAmount: depositAmountOrID,
  tokenSymbol,
  destinationChainConfig,
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
  const {
    __RUNTIME_CONFIG__: { UI_EXPLORER_URL },
  } = window;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 500, mb: 4, textAlign: "center" }}
      >
        Complete transfer for{" "}
        <strong>
          {tokenSymbol} #{depositAmountOrID}
        </strong>
        <br /> from {homeConfig?.name} to {destinationChainConfig?.name}.
        <br />
        <CheckCircleIcon color="success" />
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
