window.__RUNTIME_CONFIG__ = {
  INDEXER__URL: "http://localhost:8000",
  CHAINBRIDGE: {
    chains: [
      {
        domainId: 1,
        networkId: 422,
        name: "Local EVM 1",
        decimals: 18,
        bridgeAddress: "0xd606A00c1A39dA53EA7Bb3Ab570BBE40b156EB66",
        erc20HandlerAddress: "0xb83065680e6AEc805774d8545516dF4e936F0dC0",
        rpcUrl: "http://localhost:8545",
        type: "Ethereum",
        nativeTokenSymbol: "ETH",
        tokens: [
          {
            address: "0x75dF75bcdCa8eA2360c562b4aaDBAF3dfAf5b19b",
            name: "an ERC20",
            symbol: "ERC20",
            imageUri: "WETHIcon",
            resourceId:
              "0x0000000000000000000000000000000000000000000000000000000000000000",
          },
        ],
      },
      {
        domainId: 2,
        networkId: 422,
        name: "Local EVM 2",
        decimals: 18,
        bridgeAddress: "0xd606A00c1A39dA53EA7Bb3Ab570BBE40b156EB66",
        erc20HandlerAddress: "0xb83065680e6AEc805774d8545516dF4e936F0dC0",
        rpcUrl: "http://localhost:8547",
        type: "Ethereum",
        nativeTokenSymbol: "ETH",
        tokens: [
          {
            address: "0x75dF75bcdCa8eA2360c562b4aaDBAF3dfAf5b19b",
            name: "an ERC20",
            symbol: "ERC20",
            imageUri: "WETHIcon",
            resourceId:
              "0x0000000000000000000000000000000000000000000000000000000000000000",
          },
        ],
      },
    ],
  },
};