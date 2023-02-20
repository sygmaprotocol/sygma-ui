import { ChainType, EvmBridgeConfig } from "../sygmaConfig";

export type WalletType = ChainType | "select" | "unset";

export type Vote = {
  address: string;
  signed?: "Confirmed" | "Rejected";
  order?: string;
  message?: string;
  eventType?: "Vote";
};

export type TransitMessage = {
  address: string;
  message?: string;
  proposalStatus?: number;
  order: number;
  signed?: "Confirmed" | "Rejected";
  eventType?: "Proposal" | "Vote";
};

export type TransactionStatus =
  | "Initializing Transfer"
  | "In Transit"
  | "Transfer Completed"
  | "Transfer Aborted";

export type NetworkManagerState = {
  walletType: WalletType;
  homeChainConfig?: EvmBridgeConfig;
  homeChains: Array<EvmBridgeConfig>;
  destinationChainConfig?: EvmBridgeConfig;
  destinationChains: Array<EvmBridgeConfig>;
  transactionStatus?: TransactionStatus;
  depositNonce?: string;
  depositVotes: number; // WE ARE NO REALLY USING THIS ON THE CONTEXT PROVIDER
  txIsDone: boolean;
  transitMessage: Array<TransitMessage>;
};

export type Actions =
  | { type: "setWalletType"; payload: WalletType }
  | { type: "setHomeChainConfig"; payload: EvmBridgeConfig | undefined }
  | { type: "setHomeChains"; payload: Array<EvmBridgeConfig> | [] }
  | { type: "setDestinationChain"; payload: EvmBridgeConfig | undefined } // TODO: CHANGE THIS FOR SETDESTINATIONCHAINCONFIG
  | { type: "setDestinationChains"; payload: Array<EvmBridgeConfig> | [] }
  | { type: "setTransactionStatus"; payload: TransactionStatus | undefined }
  | { type: "addMessage"; payload: TransitMessage }
  | { type: "resetMessages" }
  | { type: "setTransactionIsDone" }
  | { type: "setAll"; payload: { walletType: WalletType } }
  | { type: "setDepositNonce"; payload: string | undefined };
