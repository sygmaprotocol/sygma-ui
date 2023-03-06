import React from "react";
import { initializeConnector } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect";
import { Button } from "@mui/material";
import { WalletconnectIcon } from "@fusion-icons/react/web3";
import useConnectionDialog from "./useConnectionDialog";

function convertToWc() {
  if (!window.__RUNTIME_CONFIG__) {
    return [];
  }
  const result = window.__RUNTIME_CONFIG__.SYGMA.chains.map((chain) => [
    chain.networkId!,
    chain.rpcUrl,
  ]);
  return Object.fromEntries(result);
}

const ConnectToWallet = ({
  dispatcher,
  handleClose,
  isLoading,
  setIsLoading,
}: {
  dispatcher: any;
  handleClose: any;
  isLoading: boolean;
  setIsLoading: any;
}) => {
  const connectorData = initializeConnector<WalletConnect>(
    (actions) =>
      new WalletConnect(actions, {
        rpc: convertToWc(),
      })
  );
  const { connector } = useConnectionDialog(
    connectorData,
    dispatcher,
    setIsLoading,
    handleClose
  );

  return (
    <Button
      size="large"
      endIcon={
        <WalletconnectIcon
          width="32"
          height="32"
          strokeWidth="2"
          stroke="#FF7A45"
        />
      }
      fullWidth
      variant="outlined"
      sx={{
        justifyContent: "space-between",
        py: 1.5,
        backgroundColor: "#fff",
        color: "#FF7A45",
        border: "2px solid #FF7A45",
        borderRadius: "8px",
        ":hover": {
          backgroundColor: "#fff",
          border: "2px solid #FF7A45",
        },
        "&.Mui-disabled": {
          border: "none",
          backgroundColor: "transparent",
          boxShadow:
            "0px 1px 2px rgba(0, 0, 0, 0.16), 0px 2px 4px rgba(0, 0, 0, 0.12), 0px 1px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
      onClick={() => {
        connector.activate().catch((err) => console.error(err));
      }}
      disabled={isLoading}
    >
      WalletConnect
    </Button>
  );
};

export default ConnectToWallet;
