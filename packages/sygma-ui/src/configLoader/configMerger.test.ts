import { Config } from "../types/sygmaConfig";
import { configMerger } from "./configMerger";
import { getSharedConfig } from "./getSharedConfig";

jest.mock("./getSharedConfig", () => {
  return {
    getSharedConfig: async () => {
      const sharedConfigDef = await import(
        "../../public/sygma-shared-config.json"
      );
      return Promise.resolve(sharedConfigDef.default);
    },
  };
});

jest.mock("./getSygmaConfig", () => {
  return {
    getSygmaConfig: async () => {
      const sygmaConfigDef = await import(
        "../../public/sygma-runtime-config.json"
      );
      return Promise.resolve(sygmaConfigDef.default);
    },
  };
});

describe("ConfigMerger", () => {
  it("should merge configs and match desired keys", async () => {
    const config = (await configMerger()) as Config;
    const expectedKeysForSygmaConfig = [
      "domainId",
      "networkId",
      "name",
      "decimals",
      "bridgeAddress",
      "erc20HandlerAddress",
      "erc721HandlerAddress",
      "rpcUrl",
      "type",
      "nativeTokenSymbol",
      "blockExplorer",
      "confirmations",
      "tokens",
    ];

    const expectedKeysFromMergedConfig = ["UI", "SYGMA"];
    const expectedKeysForSygmaProperty = ["chains", "feeOracleSetup"];

    const keysFromMerge = Object.keys(config.SYGMA.chains[0]);

    expectedKeysForSygmaConfig.forEach((key) => {
      const foundKey = keysFromMerge.find((mergeKey) => mergeKey === key);
      expect(foundKey).toMatch(key);
    });

    expect(Object.keys(config)).toEqual(expectedKeysFromMergedConfig);
    expect(Object.keys(config.SYGMA)).toEqual(expectedKeysForSygmaProperty);
  });

  it('ignores one network type when "ignoreNetwork" is passed', async () => {
    const config = (await configMerger("substrate")) as Config;
    const sharedConfig = await getSharedConfig();
    const expectedLengthFilteringByEVM = sharedConfig.domains.filter(
      (domain) => domain.type === "evm"
    ).length;

    expect(config.SYGMA.chains.length).toEqual(expectedLengthFilteringByEVM);
  });
});
