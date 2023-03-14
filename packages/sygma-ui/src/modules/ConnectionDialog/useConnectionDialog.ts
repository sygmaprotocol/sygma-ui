import { useEffect } from "react";
import { Web3ReactHooks } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactStore } from "@web3-react/types";
import { WalletConnect } from "@web3-react/walletconnect";

function useConnectionDialog(
  connectorData: [MetaMask | WalletConnect, Web3ReactHooks, Web3ReactStore],
  dispatcher: (arg: {
    type: string;
    payload: {
      provider: Web3Provider | undefined;
      accounts: string[] | undefined;
      isActive: true;
      chainId: number | undefined;
      address: string | undefined;
      walletType: string;
    };
  }) => void,
  setIsLoading: (arg: boolean) => void,
  handleClose: () => void
) {
  const [
    connector,
    {
      useChainId,
      useAccounts,
      useAccount,
      useIsActivating,
      useProvider,
      useIsActive,
    },
  ] = connectorData;

  const chainId = useChainId();
  const accounts = useAccounts();
  const account = useAccount();
  const isActivating = useIsActivating();
  const provider = useProvider();
  const isActive = useIsActive();

  useEffect(() => {
    setIsLoading(isActivating);
  }, [isActivating]);

  useEffect(() => {
    if (isActive) {
      dispatcher({
        type: "setAll",
        payload: {
          provider,
          accounts,
          isActive,
          chainId,
          address: account,
          walletType: "Ethereum",
        },
      });
      handleClose();
    }
  }, [isActive]);

  return { connector };
}

export default useConnectionDialog;
