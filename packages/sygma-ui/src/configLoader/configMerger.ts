import { getSygmaConfig } from "./getSygmaConfig";
import { getSharedConfig } from "./getSharedConfig";
import { SharedConfigDomains, ConfigError } from "../types/sharedConfig";
import { Chain, Config } from "../types/sygmaConfig";

export const configMerger = async (
  ignoreNetwork: "Substrate" | "Ethereum" | "default" = "default"
): Promise<Config | ConfigError> => {
  let sharedConfig: SharedConfigDomains;
  let config: Config;

  try {
    sharedConfig = await getSharedConfig();
  } catch (e) {
    console.error(e);
    return { error: { type: "shared-config", message: "Failed to fetch" } };
  }

  try {
    config = await getSygmaConfig();
  } catch (e) {
    console.error(e);
    return { error: { type: "config", message: "Failed to fetch" } };
  }

  const domainsMapped = sharedConfig.domains.map((domain) => ({
    domainId: `${domain.id}`,
    decimals: domain.nativeTokenDecimals,
    nativeTokenSymbol: domain.nativeTokenSymbol.toUpperCase(),
    type: domain.type === "evm" ? "Ethereum" : "Substrate",
    bridgeAddress: domain.bridge,
    feeRouterAddress: domain.feeRouterAddress || "",
    erc20HandlerAddress:
      domain.handlers.length &&
      domain.handlers.filter((handler) => handler.type === "erc20")[0].address,
    erc721HandlerAddress:
      domain.handlers.length &&
      domain.handlers.filter((handler) => handler.type === "erc721")[0].address,
    tokens: [
      ...domain.resources.map((resource) => ({
        address: resource.address,
        decimals: resource.decimals,
        resourceId: resource.resourceId,
        type: resource.type,
        symbol: resource.symbol,
        feeSettings: { type: "", address: "" },
        name: resource.symbol,
      })),
    ].filter(
      (resource) =>
        resource.type !== "permissionlessGeneric" && resource.address !== ""
    ),
    confirmations: domain.blockConfirmations,
    feeHandlers: domain.feeHandlers,
  }));

  let domainsFiltered;

  if (ignoreNetwork === "Substrate") {
    domainsFiltered = domainsMapped.filter(
      (domain) => domain.type === "Ethereum"
    );
  } else if (ignoreNetwork === "Ethereum") {
    domainsFiltered = domainsMapped.filter(
      (domain) => domain.type === "Substrate"
    );
  } else {
    domainsFiltered = domainsMapped;
  }

  const keysToMerge = Object.keys(domainsFiltered[0]);
  const configKeys = Object.keys(config.SYGMA.chains[0]);

  const keysNeededFromConfig = configKeys.filter((key) => {
    const notFound = keysToMerge.findIndex((domainKey) => domainKey === key);
    return notFound === -1;
  });

  const chainObject: {
    [key: string]: {
      name: string;
      rpcUrl: string;
      blockExplorer: string;
      networkId: string;
    };
  } = config.SYGMA.chains.reduce(
    (acc, chain) => ({ ...acc, [`${chain.domainId}`]: {} }),
    {}
  );

  for (const chain of config.SYGMA.chains) {
    for (const key in chain) {
      const keyFound = keysNeededFromConfig.find(
        (keyNeeded) => keyNeeded === key
      );

      if (keyFound !== undefined) {
        chainObject[chain.domainId] = {
          ...chainObject[chain.domainId],
          [keyFound]: chain[keyFound as keyof unknown],
        };
      }
    }
  }

  const sygmaConfigMerged: Chain[] = domainsFiltered.map((domain) => {
    const { domainId } = domain;
    const propertiesToMerge = chainObject[domainId];
    return { ...domain, ...propertiesToMerge } as unknown as Chain;
  });

  return {
    ...config,
    SYGMA: {
      chains: [...sygmaConfigMerged],
      feeOracleSetup: config.SYGMA.feeOracleSetup,
    },
  };
};