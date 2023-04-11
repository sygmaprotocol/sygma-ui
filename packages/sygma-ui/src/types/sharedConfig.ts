export type SharedConfigResources = {
  resourceId: string;
  type: "erc20" | "erc721" | "permissionedGeneric" | "permissionlessGeneric";
  address: string;
  symbol: string;
  decimals: number;
};

export type SharedConfigHandlers = {
  type: "erc20" | "erc721" | "permissionedGeneric" | "permissionlessGeneric";
  address: string;
};

export type SharedConfigDomain = {
  id: number;
  name: string;
  type: "evm" | "substrate";
  bridge: string;
  feeRouter: string;
  handlers: SharedConfigHandlers[];
  nativeTokenSymbol: string;
  nativeTokenFullName: string;
  nativeTokenDecimals: number;
  blockConfirmations: number;
  startBlock: number;
  resources: SharedConfigResources[];
  feeHandlers: Array<{ address: string; type: "basic" | "oracle" }>;
};

export type SharedConfigDomains = {
  domains: SharedConfigDomain[];
};

export type ConfigError = {
  error: { type: "config" | "shared-config"; message: string; name?: string };
};
