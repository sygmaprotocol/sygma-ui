import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  BridgeConfig,
  ChainType,
  sygmaConfig,
  SubstrateConfig,
  EvmBridgeConfig,
} from "../../sygmaConfig";
import {
  EVMDestinationAdaptorProvider,
  EVMHomeAdaptorProvider,
} from "../Adaptors/EVMAdaptors";
import { DestinationBridgeContext, HomeBridgeContext } from "..";
import { useWeb3 } from "../localWeb3Context";
import { BridgeProvider } from "../Bridge";

interface INetworkManagerProviderProps {
  children: React.ReactNode | React.ReactNode[];
  predefinedWalletType?: WalletType;
}

export type WalletType = ChainType | "select" | "unset";

export type Vote = {
  address: string;
  signed?: "Confirmed" | "Rejected";
  order?: string;
  message?: string;
  eventType?: "Vote";
};

export type TransitMessage = {
  address: string;
  message?: string;
  proposalStatus?: number;
  order: number;
  signed?: "Confirmed" | "Rejected";
  eventType?: "Proposal" | "Vote";
};

export type TransactionStatus =
  | "Initializing Transfer"
  | "In Transit"
  | "Transfer Completed"
  | "Transfer Aborted";

interface NetworkManagerContextInterface {
  walletType: WalletType;
  setWalletType: (walletType: WalletType) => void;

  domainId?: number;

  homeChainConfig: BridgeConfig | EvmBridgeConfig | SubstrateConfig | undefined;
  destinationChainConfig: BridgeConfig | EvmBridgeConfig | SubstrateConfig | undefined;

  destinationChains: Array<{ domainId: number; name: string }>;
  homeChains: Array<BridgeConfig | EvmBridgeConfig | SubstrateConfig>;
  handleSetHomeChain: (domainId: number | undefined) => void;
  setDestinationChain: (domainId: number | undefined) => void;

  transactionStatus?: TransactionStatus;
  setTransactionStatus: (message: TransactionStatus | undefined) => void;

  setDepositNonce: (input: string | undefined) => void;
  depositNonce: string | undefined;
}

const NetworkManagerContext = React.createContext<
  NetworkManagerContextInterface | undefined
>(undefined);

function selectProvider(
  type: string | undefined,
  direction: string,
  props: INetworkManagerProviderProps
) {
  const noWalletHasChosenStates = [undefined, "unset", "select"];
  const typeKey = noWalletHasChosenStates.includes(type)
    ? "unset"
    : String(type).toLocaleLowerCase();
  const providers: { [key: string]: any } = {
    ethereum: {
      home: (
        <BridgeProvider>
          <EVMHomeAdaptorProvider>{props.children}</EVMHomeAdaptorProvider>
        </BridgeProvider>
      ),
      destination: (
        <BridgeProvider>
          <EVMDestinationAdaptorProvider>
            {props.children}
          </EVMDestinationAdaptorProvider>
        </BridgeProvider>
      ),
    },
    unset: {
      home: (
        <HomeBridgeContext.Provider
          value={{
            connect: async () => undefined,
            disconnect: async () => undefined,
            getNetworkName: () => "",
            isReady: false,
            selectedToken: "",
            deposit: async () => undefined,
            setDepositAmount: () => undefined,
            tokens: {},
            setSelectedToken: () => undefined,
            address: undefined,
            bridgeFee: undefined,
            chainConfig: undefined,
            depositAmount: undefined,
            nativeTokenBalance: undefined,
            relayerThreshold: undefined,
            wrapTokenConfig: undefined,
            wrapper: undefined,
            wrapToken: async () => "",
            unwrapToken: async () => "",
            homeDispatch: () => "",
          }}
        >
          {props.children}
        </HomeBridgeContext.Provider>
      ),
      destination: (
        <DestinationBridgeContext.Provider
          value={{
            tokensDispatch: () => "",
            depositVotes: 0,
            setDepositVotes: () => "",
            disconnect: async () => undefined,
          }}
        >
          {props.children}
        </DestinationBridgeContext.Provider>
      ),
    },
  };

  return providers[typeKey][direction];
}

// Used in transfer-widget project
export const NetworkManagerProvider = ({
  children,
  predefinedWalletType,
}: INetworkManagerProviderProps) => {
  const [walletType, setWalletType] = useState<WalletType>(
    predefinedWalletType ?? "Ethereum"
  );

  const [homeChainConfig, setHomeChainConfig] = useState<
  BridgeConfig | EvmBridgeConfig | SubstrateConfig | undefined
  >();
  const [homeChains, setHomeChains] = useState<Array<BridgeConfig | EvmBridgeConfig | SubstrateConfig>>([]);
  const [destinationChainConfig, setDestinationChain] = useState<
  BridgeConfig | EvmBridgeConfig | SubstrateConfig | undefined
  >();
  const [destinationChains, setDestinationChains] = useState<Array<BridgeConfig | EvmBridgeConfig | SubstrateConfig>>(
    []
  );

  const [transactionStatus, setTransactionStatus] = useState<
    TransactionStatus | undefined
  >(undefined);

  const [depositNonce, setDepositNonce] = useState<string | undefined>(
    undefined
  );

  const { onboard, savedWallet, tokens } = useWeb3();

  // IF THERE IS NO WALLET BUT ONBOARD IS INITIALIZED
  // TRIGGER THIS TO OPEN ONBOARD MODAL
  useEffect(() => {
    if (savedWallet === "" && onboard !== undefined && tokens === undefined) {
      onboard.walletSelect();
    }
  }, [onboard, savedWallet, walletType]);

  const handleSetHomeChain = useCallback(
    (domainId: number | undefined) => {
      if (!domainId && domainId !== 0) {
        setHomeChainConfig(undefined);
        return;
      }
      const chain = homeChains.find((c) => c.domainId === domainId);

      if (chain) {
        setHomeChainConfig(chain);
        setDestinationChains(
          sygmaConfig().chains.filter(
            (bridgeConfig: BridgeConfig | EvmBridgeConfig | SubstrateConfig) =>
              bridgeConfig.domainId !== chain.domainId
          )
        );
        if (sygmaConfig().chains.length === 2) {
          setDestinationChain(
            sygmaConfig().chains.find(
              (bridgeConfig: BridgeConfig | EvmBridgeConfig | SubstrateConfig) =>
                bridgeConfig.domainId !== chain.domainId
            )
          );
        }
      }
    },
    [homeChains, setHomeChainConfig]
  );

  useEffect(() => {
    if (walletType !== "unset") {
      if (walletType === "select") {
        setHomeChains(sygmaConfig().chains);
      } else {
        setHomeChains(
          sygmaConfig().chains.filter(
            (bridgeConfig: BridgeConfig | EvmBridgeConfig | SubstrateConfig) => bridgeConfig.type === walletType
          )
        );
      }
    } else {
      setHomeChains([]);
    }
  }, [walletType]);

  const handleSetDestination = useCallback(
    (domainId: number | undefined) => {
      if (domainId === undefined) {
        setDestinationChain(undefined);
      } else if (homeChainConfig && !depositNonce) {
        const chain = destinationChains.find((c) => c.domainId === domainId);
        if (!chain) {
          throw new Error("Invalid destination chain selected");
        }
        setDestinationChain(chain);
      } else {
        throw new Error("Home chain not selected");
      }
    },
    [depositNonce, destinationChains, homeChainConfig]
  );

  const HomeProvider = useCallback(
    (props: INetworkManagerProviderProps) => {
      return selectProvider(walletType, "home", props);
    },
    [walletType]
  );

  const DestinationProvider = useCallback(
    (props: INetworkManagerProviderProps) => {
      return selectProvider(destinationChainConfig?.type, "destination", props);
    },
    [destinationChainConfig?.type]
  );

  return (
    <NetworkManagerContext.Provider
      value={{
        domainId: homeChainConfig?.domainId,
        homeChainConfig,
        setWalletType,
        walletType,
        homeChains: homeChains,
        destinationChains,
        handleSetHomeChain,
        setDestinationChain: handleSetDestination,
        destinationChainConfig,
        transactionStatus,
        setTransactionStatus,
        depositNonce,
        setDepositNonce,
      }}
    >
      <HomeProvider>
        <DestinationProvider>{children}</DestinationProvider>
      </HomeProvider>
    </NetworkManagerContext.Provider>
  );
};

export const useNetworkManager = () => {
  const context = useContext(NetworkManagerContext);
  if (context === undefined) {
    throw new Error(
      "useNetworkManager must be called within a HomeNetworkProvider"
    );
  }
  return context;
};
