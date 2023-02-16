<p align="center">
<a href="https://buildwithsygma.com">
  <img width="250" title="Sygma UI" alt="Sygma UI logo" src='assets/full-logo.png'/>
</a>
</p>

# SygmaUI

## Introduction

**Sygma UI** is an OpenSource (under GNU Lesser General Public License v3.0) whitelabel application for developers
to work with [Sygma](https://github.com/ChainSafe/sygma).
[ExplorerUI](./packages/explorer-ui) is used to track and navigate every bridging that happens over a specific Bridge
smart contract.

## Live demo

You can test UI with our [live demo](https://docs.buildwithsygma.com/environments).
This demo is a working bridge between Ethereum Goerli <> Polygon Mumbai <> Moonbase Alpha <> Shibuya.
It requires you to have MetaMask wallet and to have some ETH on those network in order to pay tx fees, also you need to
request some ERC20 tokens in our [discord](https://discord.gg/ykXsJKfhgq) channel

For getting the tokens use [sygma-faucet](https://faucet-ui-stage.buildwithsygma.com/)

## Running locally

To run our **UI** locally you need a couple of dependencies. As this is a bridge project, it needs some running parts
before even using the UI in the browser.

### Prerequisites

Before running our bridge code you will need to have installed `golang`, `docker` and `docker-compose`. Follow the
instructions here for installing those dependencies:

- golang -> [install](https://go.dev/doc/install)
- docker -> [install](https://docs.docker.com/engine/install/)
- docker-compose -> [install](https://docs.docker.com/compose/install/)

### Sygma setup

To bridge tokens from one network to another, you need to clone
[Sygma](https://github.com/ChainSafe/sygma). This project contains everything you need to run a bridge with two `EVM`
networks, and all the contracts deployed. Check the [README](https://github.com/ChainSafe/sygma/blob/main/README.md)
and follow the instructions to install and have everything ready.
After you cloned `sygma` you can run the following command:

```bash
make example
```

This command executes a script that creates two EVM nodes and runs three relayers. After this is going to
deploy all the contracts to the EVM nodes. This process could take a couple of minutes to complete. After that, you
are going to see something like this message:

```bash
===============================================
🎉🎉🎉 Sygma Successfully Deployed 🎉🎉🎉

- Chain 1 -
Bridge: 0xd606A00c1A39dA53EA7Bb3Ab570BBE40b156EB66
ERC20: 0x75dF75bcdCa8eA2360c562b4aaDBAF3dfAf5b19b
ERC20 Handler: 0xb83065680e6AEc805774d8545516dF4e936F0dC0
ERC721: 0xb911DF90bCccd3D76a1d8f5fDcd32471e28Cc2c1
ERC721 Handler: 0x05C5AFACf64A6082D4933752FfB447AED63581b1
Generic Handler: 0x7573B1c6de00a73e98CDac5Cd2c4a252BdC87600
Asset Store: 0x3cA3808176Ad060Ad80c4e08F30d85973Ef1d99e
ERC20 resourceId: 0x0000000000000000000000000000000000000000000000000000000000000000
ERC721 resourceId 0x0000000000000000000000000000000000000000000000000000000000000200
Generic resourceId 0x0000000000000000000000000000000000000000000000000000000000000100

- Chain 2 -
Bridge: 0xd606A00c1A39dA53EA7Bb3Ab570BBE40b156EB66
ERC20: 0x75dF75bcdCa8eA2360c562b4aaDBAF3dfAf5b19b
ERC20 Handler: 0xb83065680e6AEc805774d8545516dF4e936F0dC0
ERC721: 0xb911DF90bCccd3D76a1d8f5fDcd32471e28Cc2c1
ERC721 Handler: 0x05C5AFACf64A6082D4933752FfB447AED63581b1
Generic Handler: 0x7573B1c6de00a73e98CDac5Cd2c4a252BdC87600
Asset Store: 0x3cA3808176Ad060Ad80c4e08F30d85973Ef1d99e
ERC20 resourceId: 0x0000000000000000000000000000000000000000000000000000000000000000
ERC721 resourceId 0x0000000000000000000000000000000000000000000000000000000000000200
Generic resourceId 0x0000000000000000000000000000000000000000000000000000000000000100

===============================================
```

It means you have all the addresses to run the UI locally.
**A quick note aside:** if you want to check the logs of your nodes or the relayers, you can go to `/e2e/evm-evm` folder
and
run the following command:

```bash
# inside the root directory of sygma
cd example
docker-compose -f ./docker-compose.yml logs setup
```

It will output the `relayer1` logs. You can also run the command with the `-f` flag to follow the output of your
services. To see all the logs of your services run

```bash
docker-compose -f docker-compose.yml logs -f
```

### Sygma UI setup

After you get the address for the contracts deployed on your local setup, we need to add this to the `runtime` config
of our UI.

Go to `/packages/sygma-ui/public` and inside the folder, create the `sygma-runtime-config.json` file with the addresses
that you got after the deployment of Sygma project.

You will end up with something like this:

```json
{
  "UI": {
    "transactionAutoUpdateInterval": 5000,
    "nftTokenPage": true
  },
  "SYGMA": {
    "chains": [
      {
        "domainId": 1,
        "networkId": 422,
        "name": "Local EVM 1",
        "decimals": 18,
        "bridgeAddress": "0xd606A00c1A39dA53EA7Bb3Ab570BBE40b156EB66",
        "erc20HandlerAddress": "0xb83065680e6AEc805774d8545516dF4e936F0dC0",
        "rpcUrl": "http://localhost:8545",
        "type": "Ethereum",
        "nativeTokenSymbol": "ETH",
        "tokens": [
          {
            "type": "erc20",
            "address": "0x75dF75bcdCa8eA2360c562b4aaDBAF3dfAf5b19b",
            "name": "ERC20Test",
            "symbol": "ERC20TST",
            "imageUri": "ETHIcon",
            "decimals": 18,
            "resourceId": "0x0000000000000000000000000000000000000000000000000000000000000000"
          }
        ]
      },
      {
        "domainId": 2,
        "networkId": 422,
        "name": "Local EVM 2",
        "decimals": 18,
        "bridgeAddress": "0xd606A00c1A39dA53EA7Bb3Ab570BBE40b156EB66",
        "erc20HandlerAddress": "0xb83065680e6AEc805774d8545516dF4e936F0dC0",
        "rpcUrl": "http://localhost:8547",
        "type": "Ethereum",
        "nativeTokenSymbol": "MATIC",
        "tokens": [
          {
            "type": "erc20",
            "address": "0x75dF75bcdCa8eA2360c562b4aaDBAF3dfAf5b19b",
            "name": "ERC20Test",
            "symbol": "ERC20TST",
            "imageUri": "ETHIcon",
            "decimals": 18,
            "resourceId": "0x0000000000000000000000000000000000000000000000000000000000000000"
          }
        ]
      }
    ],
    "feeOracleSetup": {
      "feeOracleBaseUrl": "https://fee-oracle.develop.buildwithsygma.com"
    }
  }
}
```

You also can use our dev configuration accessible by the link:
[Config from sygma dev instance](https://config-server-stage.chainsafe.io/config)

> The parameters `domainId` and `networkId` are the ones that are being used by the local networks

### Start Sygma UI

First, install dependencies using yarn

```bash
yarn install
```

Run the Sygma UI

```bash
yarn start:ui
```

### Connect to Metamask

Now you can connect to metamask. For this, you need to add the local nodes to the `networks` section of your metamask.
The relevant data to set up local networks on metamask are the endpoints of the networks, already defined in the runtime
config, and the `chainId` defined in the runtime config as `networkId`.

After this, import the token to your metamask wallet. Notice that the local nodes have some accounts that hold
some tokens. You can check those accounts and their private keys.

In the case of the local setup `alice`, `bob` and `charlie` are the accounts with tokens. Also, the three of
them are the main relayers. So, if you want to import `alice` account to metamask, you will need to use her private key:

This is are the most relevant private keys

```bash
0x000000000000000000000000000000000000000000000000000000616c696365 // ALICE PRIVATE KEY
0x0000000000000000000000000000000000000000000000000000000000657665 // EVE PRIVATE KEY
```

`Eve` is the bridge admin. She holds 10 `erc20` tokens on her side. `Alice` has native tokens that you can transfer
using metamask to your personal account. It is recommended that you don't use relayers accounts to test transfers in
your local setup. For this you can use [sygma-core-example](https://github.com/ChainSafe/sygma-core-example) to build
the binary and have access to the cli to perform some task.

### Minting some tokens.

Now we are ready to mint some tokens. Eve has 10 TST tokens already minted, but we can mint more.

```bash
./sygma-core-example \
evm-cli \
--url <LOCAL-NODE-URL> \
--private-key <PRIVATE-KEY EVE> \
erc20 \
mint \
--amount 200 \
--decimals 18 \
--contract <ERC20 ADDRESS>
--recipient <RELAYER ADDRESS OR ANY VALID ADDRESS>
```

So using `Eve` private key you would have the following command:

```bash
./sygma-core-example \
evm-cli \
--url "http://localhost:8545" \
--private-key "0000000000000000000000000000000000000000000000000000000000657665" \
erc20 \
mint \
--amount 666 \
--decimals 18 \
--recipient "0x56A492AdbEFEC91a7A23031787B372bc80fEE7B1" \
--contract "0x75dF75bcdCa8eA2360c562b4aaDBAF3dfAf5b19b"
```

After minting some tokens, you can send a few to your imported account to test a transfer or mint to your testing
account in metamask.

## Deployment configuration for AWS

The configuration consists of nodejs server which pulls the config from SSM and provides it as JSON for TransferUI
frontend application.
So we need to deploy two services:

### [config-server](./packages/config-server)

Environment variables for AWS:

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_SESSION_TOKEN

Environment variables for configuration nodejs application:

- HOST=localhost (could be any other host)
- PORT=8000
- SSM_PARAMETER_NAME=/sygma/sygma-ui-local (Test parameter in SSM, but it could any other new param like
  /sygma/sygma-ui-prod or such)

### [transfer-ui](./packages/transfer-widget)

environment variables:

- CONFIG_SERVER_HOST=localhost (the host of config server)
- CONFIG_SERVER_PORT=8000 ( the port of config server)
  For ease of understanding config, I created [docker-compose.yml](./docker-compose.yml) with all these services and env
  examples and dockerfiles for transfer UI and for config-server

## FAQ

Please check our [Q&A section](https://github.com/ChainSafe/sygma-ui/discussions/categories/q-a)

## Support

<a href="https://discord.gg/ykXsJKfhgq">
  <img alt="discord" src="https://img.shields.io/discord/593655374469660673?label=Discord&logo=discord&style=flat" />
</a>

## License

GNU Lesser General Public License v3.0
