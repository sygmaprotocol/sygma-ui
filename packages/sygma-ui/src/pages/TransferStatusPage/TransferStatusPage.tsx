import React from "react";
import { useHistory } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import {
  TransactionStatus,
  useDestinationBridge,
  useHomeBridge,
  useSygma,
  useWeb3 as useLocalWeb3,
} from "../../contexts";

import InTransitBody from "./InTransitBody";
import TransferCompleteBody from "./TransferCompleteBody";
import ErrorTransferBody from "./ErrorTransferBody";

import { useStyles } from "./styles";

import { nftPageTheme } from "../../themes/nftPageTheme";

const TransferStatusPage = () => {
  const history = useHistory();

  const { classes, cx } = useStyles();
  const { savedWallet, dispatcher } = useLocalWeb3();
  const { erc721TokenWithIds, homeDispatch } = useHomeBridge();
  const {
    transactionStatus,
    relayerThreshold,
    homeConfig,
    destinationChainConfig,
    depositAmount,
    selectedToken,
    tokens,
  } = useSygma();
  const { homeTransferTxHash } = useHomeBridge();
  const { transferTxHash, inTransitMessages } = useDestinationBridge();
  const tokenSymbol = selectedToken && tokens[selectedToken]?.symbol;
  const tokenType = selectedToken && tokens[selectedToken]?.type;

  const close = () => {
    homeDispatch({
      type: "setErc721TokenIds",
      erc721TokenWithIds: undefined,
    });
    history.push("/nft_transfer");
  };

  const getTransactionStateBody = (status?: TransactionStatus) => {
    const transactionStatuses: { [key: string]: React.ReactNode } = {
      "Initializing Transfer": (
        <InTransitBody
          tokenType={tokenType}
          transactionStatus={status}
          inTransitMessages={inTransitMessages}
          homeConfig={homeConfig}
          homeTransferTxHash={homeTransferTxHash}
        />
      ),
      "In Transit": (
        <InTransitBody
          tokenType={tokenType}
          transactionStatus={status}
          inTransitMessages={inTransitMessages}
          homeConfig={homeConfig}
          homeTransferTxHash={homeTransferTxHash}
        />
      ),
      "Transfer Completed": (
        <TransferCompleteBody
          classes={classes}
          close={close}
          homeConfig={homeConfig}
          homeTransferTxHash={homeTransferTxHash}
          depositAmount={depositAmount}
          tokenSymbol={tokenSymbol}
          destinationChainConfig={destinationChainConfig}
          savedWallet={savedWallet}
        />
      ),
      default: (
        <ErrorTransferBody
          classes={classes}
          close={close}
          homeConfig={homeConfig}
          homeTransferTxHash={homeTransferTxHash}
          transferTxHash={transferTxHash}
        />
      ),
    };
    if (!status) return transactionStatuses["default"];

    return transactionStatuses[status] || transactionStatuses["default"];
  };

  return (
    <ThemeProvider theme={nftPageTheme}>
      <Paper
        sx={{
          position: "relative",
          margin: "30px auto",
          maxWidth: 400,
          py: 6,
          px: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          background: "#F0F0F0",
          boxShadow:
            "0px 3px 6px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.08), 0px 1px 12px rgba(0, 0, 0, 0.04)",
          borderRadius: "12px",
        }}
        elevation={3}
      >
        {getTransactionStateBody(transactionStatus)}
      </Paper>
    </ThemeProvider>
  );
};

export default React.memo(TransferStatusPage);
