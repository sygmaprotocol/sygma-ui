import React, { Dispatch } from "react";
import { Tokens } from "../../types";
import { BridgeConfig, TokenConfig } from "../../sygmaConfig";
import { Weth } from "../../Contracts/Weth";
import {
  AddMessageAction,
  ResetAction,
  TxIsDone,
  TransitState,
} from "../../reducers/TransitMessageReducer";
import {
  EvmHomeReducerAction,
  Erc721TokenIds,
} from "../../reducers/EvmHomeReducer";
import { Directions, FeeDataResult } from "@buildwithsygma/sygma-sdk-core";

export interface IHomeBridgeProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export interface IDestinationBridgeProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export interface IWeb3ProviderWrapper {
  children: React.ReactNode | React.ReactNode[];
}

export type InjectedAccountType = {
  address: string;
  meta: {
    name: string;
    source: string;
  };
};

export interface HomeChainAdaptorContext {
  chainConfig: BridgeConfig | undefined;

  networkId?: number;

  getNetworkName: (id: any) => string;

  connect: () => Promise<void>;
  disconnect: (resetWalletConnect?: boolean) => Promise<void>;

  deposit(params: {
    amount: string;
    recipient: string;
    feeData: FeeDataResult;
  }): Promise<void>;

  relayerThreshold: number | undefined;

  setDepositAmount: (input: number | undefined) => void;
  depositAmount: number | undefined;

  setSelectedToken: (tokenAddress: string) => void;
  selectedToken: string;

  bridgeFee: number | undefined;

  wrapTokenConfig: TokenConfig | undefined;
  wrapper: Weth | undefined;

  wrapToken: (value: number) => Promise<string>;
  unwrapToken: (value: number) => Promise<string>;

  isReady: boolean;
  address: string | undefined;
  accounts?: Array<InjectedAccountType>;
  selectAccount?: (index: number) => void;
  nativeTokenBalance: number | undefined;

  handleCheckSupplies?: (
    amount: number,
    tokenAddress: string,
    destinationChainId: number
  ) => Promise<boolean | undefined>;

  tokens: Tokens;

  homeTransferTxHash?: string;
  homeDispatch: (action: EvmHomeReducerAction) => void;
  erc721TokenWithIds?: Erc721TokenIds;
}

export interface DestinationChainContext {
  depositVotes: number;
  setDepositVotes: (input: number) => void;
  disconnect: () => Promise<void>;
  tokensDispatch: Dispatch<AddMessageAction | ResetAction | TxIsDone>;
  inTransitMessages?: TransitState;
  transferTxHash?: string;
}
