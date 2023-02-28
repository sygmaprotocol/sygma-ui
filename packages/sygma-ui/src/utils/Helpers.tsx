import dayjs from "dayjs";
import { ERC721__factory } from "@buildwithsygma/sygma-contracts";
import ETHIcon from "../media/tokens/eth.png";
import WETHIcon from "../media/tokens/weth.svg";
import DAIIcon from "../media/tokens/dai.svg";
import celoUSD from "../media/tokens/cusd.svg";

import EthIcon from "../media/networks/eth.svg";
import CeloIcon from "../media/networks/celo.svg";
import EtcIcon from "../media/networks/etc.svg";
import CosmosIcon from "../media/networks/cosmos.svg";
import EthermintIcon from "../media/networks/ethermint.svg";
import { BigNumber, BigNumberish, ethers } from "ethers";
import { BridgeData } from "@buildwithsygma/sygma-sdk-core";
import { DepositRecord, TransferDetails } from "../reducers/TransfersReducer";
import { BridgeConfig, EvmBridgeConfig, TokenConfig } from "../sygmaConfig";
import { Metadata } from "../reducers";

export const isCelo = (networkId?: number) =>
  [42220, 44787, 62320].includes(networkId ?? 0);

export const shortenAddress = (address: string) => {
  return `${address.substr(0, 6)}...${address.substr(address.length - 6, 6)}`;
};

export const getNetworkName = (id: any) => {
  switch (Number(id)) {
    case 5:
      return "Localhost";
    case 1:
      return "Mainnet";
    case 3:
      return "Ropsten";
    case 4:
      return "Rinkeby";
    // case 5:
    //   return "Goerli";
    case 6:
      return "Kotti";
    case 42:
      return "Kovan";
    case 61:
      return "Ethereum Classic - Mainnet";
    case 42220:
      return "CELO - Mainnet";
    case 44787:
      return "CELO - Alfajores Testnet";
    case 62320:
      return "CELO - Baklava Testnet";
    default:
      return "Other";
  }
};

export const PredefinedIcons: any = {
  ETHIcon: ETHIcon,
  WETHIcon: WETHIcon,
  DAIIcon: DAIIcon,
  celoUSD: celoUSD,
};

const PredefinedNetworkIcons: any = {
  EthIcon: EthIcon,
  CeloUSD: CeloIcon,
  EtcIcon: EtcIcon,
  CosmosIcon: CosmosIcon,
  EthermintIcon: EthermintIcon,
};

export const showImageUrl = (url?: string) =>
  url && PredefinedIcons[url] ? PredefinedIcons[url] : url;

export const showImageUrlNetworkIcons = (url?: string) =>
  url && PredefinedNetworkIcons[url]
    ? PredefinedNetworkIcons[url]
    : PredefinedIcons[url!] || url;

export const selectToken = (
  config: EvmBridgeConfig | undefined,
  tokenAddress: string
) => config?.tokens.find((token) => token.address === tokenAddress);

// TODO: for now just ERC20 token Icon
export const getTokenIcon = () => {
  return PredefinedIcons["ETHIcon"];
};

export const getNetworkIcon = (config: EvmBridgeConfig | undefined) => {
  if (config === undefined) {
    return undefined;
  }
  if (isCelo(config.networkId)) {
    return CeloIcon;
  } else {
    return EthIcon;
  }
};

export const formatTransferDate = (transferDate: number | undefined) =>
  transferDate ? dayjs(transferDate * 1000).format("MMM D, h:mmA") : "";

export const formatAmount = (amount: BigNumberish) =>
  ethers.utils.formatUnits(amount);

export const getRandomSeed = () => {
  const arr = new Uint8Array(20);
  const randomValues = crypto.getRandomValues(arr);
  const randomString = Array.from(randomValues, (val) =>
    val.toString(16).padStart(2, "0")
  ).join("");

  return randomString;
};

export const getProposalStatus = (status: number | undefined) => {
  switch (status) {
    case 0:
      return "Inactive";
    case 1:
      return "Active";
    case 2:
      return "Passed";
    case 3:
      return "Executed";
    case 4:
      return "Cancelled";
    default:
      return "No status";
  }
};

export const getColorSchemaTransferStatus = (status: number | undefined) => {
  //TODO: just for now we have passed and executed as provided in figma mockups
  switch (status) {
    case 1:
    case 2:
      return {
        borderColor: "#69C0FF",
        background: "#E6F7FF",
      };
    case 3:
      return {
        borderColor: "#389E0D",
        background: "#D9F7BE",
      };
    case 0:
    case 4:
      return {
        borderColor: "#FF4D4F",
        background: "#ff9a9b",
      };
    default:
      return {
        borderColor: "#548CA8",
        background: "#EEEEEE",
      };
  }
};

export const computeAndFormatAmount = (amount: string) => {
  const amountParsed = parseInt(amount);
  const toBigInt = BigInt(amountParsed);
  const toBigNumber = BigNumber.from(toBigInt);
  return formatAmount(toBigNumber);
};

const formatDateTimeline = (date: number) => dayjs(date).format("h:mma");

export const selectChains = (
  chains: Array<EvmBridgeConfig>,
  fromDomainId: number,
  toDomainId: number
) => {
  const fromChain = chains.find((chain) => chain.domainId === fromDomainId);
  const toChain = chains.find((chain) => chain.domainId === toDomainId);

  return { fromChain, toChain };
};

export const computeTransferDetails = (
  txDetails: DepositRecord,
  chains: Array<EvmBridgeConfig>
): TransferDetails => {
  const {
    timestamp,
    fromAddress,
    proposalEvents,
    amount,
    fromNetworkName,
    toNetworkName,
    depositTransactionHash,
    fromDomainId,
    toDomainId,
    status: proposalStatus,
    voteEvents,
    id,
  } = txDetails;

  const { fromChain, toChain } = selectChains(
    chains,
    fromDomainId!,
    toDomainId!
  );

  const formatedTransferDate = formatTransferDate(timestamp);

  const formatedAmount = computeAndFormatAmount(amount!);

  const pillColorStatus = getColorSchemaTransferStatus(proposalStatus);

  let timelineMessages = [];

  if (!proposalEvents.length && !voteEvents.length) {
    timelineMessages = [
      {
        message: "Deposit submitted",
        time: formatDateTimeline(timestamp!),
      },
    ];
  } else {
    const votesMessages = voteEvents.map((vote) => ({
      message: `Confirmed by`,
      time: formatDateTimeline(vote.timestamp),
      by: vote.by,
    }));

    switch (proposalEvents.length) {
      case 1: {
        const firstMessage = {
          message: "Deposit submitted",
          time: formatDateTimeline(proposalEvents[0].timestamp),
        };
        const createdBy = {
          message: `Proposal created by`,
          time: formatDateTimeline(proposalEvents[0].timestamp),
          by: proposalEvents[0].by,
        };

        let waitingForMoreVotesMsg = {
          message: "Waiting for more votes",
          time: formatDateTimeline(proposalEvents[0].timestamp),
        };

        if (!voteEvents.length) {
          timelineMessages = [
            firstMessage,
            createdBy,
            waitingForMoreVotesMsg,
          ] as any;
          break;
        } else {
          timelineMessages = [
            firstMessage,
            createdBy,
            ...votesMessages,
            waitingForMoreVotesMsg,
          ] as any;

          break;
        }
      }
      default: {
        timelineMessages = proposalEvents.reduce((acc: any, proposal, idx) => {
          if (idx === 0) {
            acc = [
              {
                message: "Deposit submitted",
                time: formatDateTimeline(proposal.timestamp),
              },
              {
                message: `Proposal created by`,
                time: formatDateTimeline(proposal.timestamp),
                by: proposalEvents[0].by,
              },
              ...votesMessages,
            ];
            return acc;
          }

          if (proposalStatus === 4) {
            acc = [
              ...acc,
              {
                message: `Proposal cancel by`,
                time: formatDateTimeline(proposal.timestamp),
                by: proposalEvents[0].by,
              },
              {
                message: "Transfer canceled",
                time: formatDateTimeline(proposal.timestamp),
              },
            ];
            return acc;
          } else if (proposalStatus === 2) {
            acc = [
              ...acc,
              {
                message: `Proposal passed by`,
                time: formatDateTimeline(proposal.timestamp),
                by: proposalEvents[0].by,
              },
              {
                message: "Waiting for execution",
                time: formatDateTimeline(proposal.timestamp),
              },
            ];
            return acc;
          } else if (proposalStatus === 3 && proposal.proposalStatus === 3) {
            acc = [
              ...acc,
              {
                message: `Proposal passed by`,
                time: formatDateTimeline(proposal.timestamp),
                by: proposalEvents[0].by,
              },
              {
                message: `Proposal executed by`,
                time: formatDateTimeline(proposal.timestamp),
                by: proposalEvents[0].by,
              },
              {
                message: `Transfer executed on ${toChain?.name}`,
                time: formatDateTimeline(proposal.timestamp),
              },
            ];
            return acc;
          }
          return acc;
        }, []);
        break;
      }
    }
  }

  return {
    id,
    formatedTransferDate,
    fromAddress,
    formatedAmount,
    fromNetworkName,
    toNetworkName,
    depositTransactionHash,
    fromDomainId,
    toDomainId,
    voteEvents,
    proposalEvents,
    proposalStatus,
    timelineMessages,
    fromChain,
    toChain,
    pillColorStatus,
  };
};

export const computeDirections = (
  bridgeSetup: BridgeData,
  destinationChainConfig: BridgeConfig,
  homeConfig: BridgeConfig
): { from: "chain1" | "chain2"; to: "chain1" | "chain2" } | undefined => {
  if (bridgeSetup !== undefined) {
    return Object.keys(bridgeSetup!).reduce((acc, chain) => {
      if (
        Number(bridgeSetup![chain as keyof BridgeData].domainId) ===
        homeConfig!.domainId
      ) {
        acc = { ...acc, from: chain };
        return acc;
      }
      if (
        Number(bridgeSetup![chain as keyof BridgeData].domainId) ===
        destinationChainConfig?.domainId
      ) {
        acc = { ...acc, to: chain };
        return acc;
      }
    }, {} as any);
  }
  return undefined;
};

function addressEqual(a: string, b: string) {
  return a.toLowerCase() === b.toLowerCase();
}

export async function listTokensOfOwner({
  tokenAddress,
  account,
  provider,
}: {
  tokenAddress: string;
  account: string;
  provider: ethers.providers.Provider;
}) {
  const token = ERC721__factory.connect(tokenAddress, provider);

  console.warn(await token.name(), "tokens owned by", account);

  const sentLogs = await token.queryFilter(
    token.filters.Transfer(account, null)
  );
  const receivedLogs = await token.queryFilter(
    token.filters.Transfer(null, account)
  );

  const logs = sentLogs
    .concat(receivedLogs)
    .sort(
      (a, b) =>
        a.blockNumber - b.blockNumber || a.transactionIndex - b.transactionIndex
    );

  const owned = new Set();

  for (const log of logs) {
    const { from, to, tokenId } = log.args;

    if (addressEqual(to, account)) {
      owned.add(tokenId.toString());
    } else if (addressEqual(from, account)) {
      owned.delete(tokenId.toString());
    }
  }

  return [...owned] as [string];
}

export async function getErc721Metadata(
  tokenAddress: string,
  tokenId: string,
  provider: ethers.providers.Provider
) {
  const token = ERC721__factory.connect(tokenAddress, provider);
  const metadataUrl = await token.tokenURI(tokenId);
  let metadata;
  if (metadataUrl.match(/metadata\.test/)) {
    metadata = await (await fetch("/erc721_metadata.json")).json();
  } else {
    metadata = await (await fetch(metadataUrl)).json();
  }

  return { ...metadata, tokenId, tokenAddress } as Metadata;
}

export async function getErc721Urls(
  erc721tokens: TokenConfig[],
  address: string,
  provider: ethers.providers.Provider
) {
  const result = await Promise.all(
    erc721tokens.map(async (token) => {
      const tokenIds = await listTokensOfOwner({
        tokenAddress: token.address,
        account: address,
        provider,
      });
      const tokenIdsWithMetadata = await Promise.all(
        tokenIds.map((tokenId) =>
          getErc721Metadata(token.address, tokenId, provider)
        )
      );
      return { tokenAddress: token.address, tokenIds, tokenIdsWithMetadata };
    })
  );
  return result;
}
