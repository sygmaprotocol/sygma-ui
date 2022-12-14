export type TokenConfig = {
  type: string;
  address: string;
  name?: string;
  symbol?: string;
  imageUri?: string;
  resourceId: string;
  isNativeWrappedToken?: boolean;
  decimals?: number;
  isDoubleApproval?: boolean;
  feeSettings: FeeSettings;
};

export type ChainType = "Ethereum";

export type BridgeConfig = {
  networkId?: number;
  domainId: number;
  name: string;
  rpcUrl: string;
  type: ChainType;
  tokens: TokenConfig[];
  nativeTokenSymbol: string;
  decimals: number;
};

export type FeeSettings = {
  type: "basic" | "feeOracle" | "none";
  address: string;
};

export type EvmBridgeConfig = BridgeConfig & {
  bridgeAddress: string;
  erc20HandlerAddress: string;
  type: "Ethereum";
  //This should be the full path to display a tx hash, without the trailing slash, ie. https://etherscan.io/tx
  blockExplorer?: string;
  defaultGasPrice?: number;
  deployedBlockNumber?: number;
};

export type FeeOracleData = {
  feeOracleBaseUrl: string;
  feeOracleHandlerAddress: string;
};

export type SygmaConfig = {
  chains: Array<EvmBridgeConfig>;
  feeOracleSetup: FeeOracleData;
};

export type UIConfig = {
  nftTokenPage: boolean;
  transactionAutoUpdateInterval: number;
};

export const sygmaConfig = () => {
  return window.__RUNTIME_CONFIG__.SYGMA;
};
