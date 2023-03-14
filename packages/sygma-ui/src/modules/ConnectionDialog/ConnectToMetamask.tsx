import React from "react";
import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { Button } from "@mui/material";
import { MetamaskIcon } from "@fusion-icons/react/web3";
import useConnectionDialog from "./useConnectionDialog";

const metamaskConnectorData = initializeConnector<MetaMask>(
  (actions) => new MetaMask(actions)
);
const ConnectToMetamask = ({
  dispatcher,
  handleClose,
  setIsLoading,
}: {
  dispatcher: any;
  handleClose: any;
  isLoading: boolean;
  setIsLoading: any;
}) => {
  const { connector } = useConnectionDialog(
    metamaskConnectorData,
    dispatcher,
    setIsLoading,
    handleClose
  );

  return (
    <Button
      size="large"
      endIcon={
        <MetamaskIcon width="32" height="32" strokeWidth="2" stroke="#FF7A45" />
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
    >
      Metamask
    </Button>
  );
};

export default ConnectToMetamask;
