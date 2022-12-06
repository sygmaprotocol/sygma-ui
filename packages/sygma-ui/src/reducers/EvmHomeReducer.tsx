export type Metadata = {
  name: string;
  description: string;
  image: string;
  tokenId: any;
  tokenAddress: string;
};
export type Erc721TokenIds = {
  tokenAddress: string;
  tokenIds: [string];
  tokenIdsWithMetadata: Metadata[];
}[];
export type EvmHomeReducerState = {
  depositAmount: number | undefined;
  selectedToken: string;
  networkId: number;
  homeTransferTxHash: string;
  erc721TokenWithIds?: Erc721TokenIds;
};
export type EvmHomeReducerAction =
  | { type: "setDepositAmount"; depositAmount?: number }
  | { type: "setSelectedToken"; selectedToken: string }
  | { type: "setNetworkId"; networkId: number }
  | { type: "setHomeTransferTxHash"; homeTransferTxHash: string }
  | {
      type: "setErc721TokenIds";
      erc721TokenWithIds: Erc721TokenIds | undefined;
    };

export function evmHomeReducer(
  state: EvmHomeReducerState,
  action: EvmHomeReducerAction
): EvmHomeReducerState {
  switch (action.type) {
    case "setDepositAmount":
      return { ...state, depositAmount: action.depositAmount };
    case "setSelectedToken":
      return { ...state, selectedToken: action.selectedToken };
    case "setNetworkId":
      return { ...state, networkId: action.networkId };
    case "setHomeTransferTxHash":
      return { ...state, homeTransferTxHash: action.homeTransferTxHash };
    case "setErc721TokenIds":
      return { ...state, erc721TokenWithIds: action.erc721TokenWithIds };
    default:
      return state;
  }
}
