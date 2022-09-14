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

// {
//   "address": "0x429b8171Eb89a866c885375C7490B1996f923f26",
//   "name": "ChainSafeERC20",
//   "symbol": "csERC20",
//   "imageUri": "ETHIcon",
//   "decimals": 18,
//   "resourceId": "0x0000000000000000000000000000000000000000000000000000000000000002"
// },

// 1 '0x0000000000000000000000000000000000000000000000000000000000000002' '0x0000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000000001442Da3Ba8c586F6fe9eF6ed1d09423eB73E4fe25b' '0x5af3107a4000' {gasPrice: '1323000007', value: '0x5af3107a4000'}
// "0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001245524332303a2063616c6c206661696c65640000000000000000000000000000"