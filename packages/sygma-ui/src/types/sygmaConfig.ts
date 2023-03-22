export type NetworkType = "Ethereum";

export type TokenType = "erc20" | "erc721";

export type FeeSettingsType = "basic" | "oracle";

export type Token = {
  type: TokenType;
  address: string;
  name: string;
  symbol: string;
  imageUri: string;
  decimals: number;
  resourceId: string;
  feeSettings: {
    type: FeeSettingsType;
    address: string;
  };
};

export type Chain = {
  domainId: string;
  networkId: number;
  name: string;
  decimals: number;
  bridgeAddress: string;
  erc20HandlerAddress: string;
  erc721HandlerAddress: string;
  rpcUrl: string;
  type: NetworkType;
  nativeTokenSymbol: string;
  blockExplorer: string;
  confirmations: number;
  tokens: Token[];
};

export type Config = {
  UI: {
    transactionAutoUpdateInterval: number;
    nftTokenPage: boolean;
  };
  SYGMA: {
    chains: Chain[];
    feeOracleSetup: {
      feeOracleBaseUrl?: string;
    };
  };
};
