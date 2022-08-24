import React from "react";
import { Typography, LinearProgress } from "@mui/material";

import ErrorIcon from "@mui/icons-material/Error";
import { CustomModal } from "../../components";
import {
  useDestinationBridge,
  useHomeBridge,
  useSygma,
  TransactionStatus,
  useWeb3 as useLocalWeb3,
} from "@chainsafe/sygma-ui-core";
import { ReactComponent as SygmaLogoSVG } from "../../media/Icons/sygma.svg";

import InitTransferBody from "./InitTransferBody";
import InTransitBody from "./InTransitBody";
import TransferCompleteBody from "./TransferCompleteBody";
import ErrorTransferBody from "./ErrorTransferBody";

import { useStyles } from "./styles";

interface ITransferActiveModalProps {
  open: boolean;
  close: () => void;
}

const getTransactionStateIndicator = (status?: TransactionStatus) => {
  const tranactionStatuses: { [key: string]: string | React.ReactNode } = {
    "Initializing Transfer": "1",
    "In Transit": "2",
    "Transfer Completed": "3",
    default: <ErrorIcon />,
  };
  if (!status) return tranactionStatuses["default"];

  return tranactionStatuses[status] || tranactionStatuses["default"];
};

const getTransactionStateHeader = (
  status?: TransactionStatus,
  depositVotes?: number,
  relayerThreshold?: number
) => {
  const tranactionStatuses: { [key: string]: JSX.Element } = {
    "Initializing Transfer": <div>In transit</div>,
    "In Transit": (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3
          style={{
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0.01em",
            color: '#FF7A45'
          }}
        >
          In Transit
        </h3>
        {Number(depositVotes) < (relayerThreshold || 0) ? (
          <p>{`${depositVotes}/${relayerThreshold} signatures needed`}</p>
        ) : (
          <p style={{
            fontStyle: "normal",
            fontWeight: 300,
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0.01em",
            color: '#979797'
          }}>Executing proposal</p>
        )}
      </div>
    ),
    "Transfer Completed": <div>Transfer completed</div>,
    default: <div>Transfer aborted</div>,
  };
  if (!status) return tranactionStatuses["default"];

  return tranactionStatuses[status] || tranactionStatuses["default"];
};

const TransferActiveModal: React.FC<ITransferActiveModalProps> = ({
  open,
  close,
}: ITransferActiveModalProps) => {
  const classes = useStyles();
  const { savedWallet, resetOnboard, dispatcher, onboard } = useLocalWeb3();
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

  const getTransactionStateBody = (status?: TransactionStatus) => {
    const tranactionStatuses: { [key: string]: React.ReactNode } = {
      "Initializing Transfer": <InitTransferBody classes={classes} />,
      "In Transit": (
        <InTransitBody
          classes={classes}
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
          resetOnboard={resetOnboard}
          dispatcher={dispatcher}
          onboard={onboard!}
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
    if (!status) return tranactionStatuses["default"];

    return tranactionStatuses[status] || tranactionStatuses["default"];
  };

  return (
    <CustomModal
      className={classes.root}
      injectedClass={{
        inner: classes.inner,
      }}
      active={open}
      closePosition="none"
    >
      <div className={classes.mainContainer}>
        <section className={classes.elipsisContent}>
          <div className={classes.elipsis}></div>
          <div className={classes.svgIcon}>
            <SygmaLogoSVG />
          </div>
        </section>
        <section className={classes.content}>
      <section>
        <div className={classes.stepIndicator}>
          {getTransactionStateIndicator(transactionStatus)}
        </div>
      </section>
        <Typography className={classes.heading} variant="h5" component="h5">
          {getTransactionStateHeader(transactionStatus, relayerThreshold)}
        </Typography>
        </section>
        <section className={classes.warningMsg}>
        {getTransactionStateBody(transactionStatus)}
      </section>
      </div>
    </CustomModal>
  );
};

export default React.memo(TransferActiveModal);
