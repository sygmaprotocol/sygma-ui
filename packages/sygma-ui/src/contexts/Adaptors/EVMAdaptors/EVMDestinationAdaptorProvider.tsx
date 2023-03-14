import React, { useEffect, useReducer, useState } from "react";
import { useWeb3 } from "../../index";
import { IDestinationBridgeProviderProps } from "../interfaces";
import { DestinationBridgeContext } from "../../DestinationBridgeContext";
import {
  evmDestinationReducer,
  transitMessageReducer,
} from "../../../reducers";

import handleProposalEvent from "./handleProposalEvent";
import { useBridge } from "../../Bridge";

export const EVMDestinationAdaptorProvider = ({
  children,
}: IDestinationBridgeProviderProps) => {
  const { depositNonce, setTransactionStatus } = useWeb3();
  const { sygmaInstance } = useBridge();

  const [state, dispatch] = useReducer(evmDestinationReducer, {
    transferTxHash: "",
    depositVotes: 0,
  });
  const { transferTxHash, depositVotes } = state;
  const setTransferTxHash = (transferTxHash: string) =>
    dispatch({ type: "setTransferTxHash", transferTxHash });
  const setDepositVotes = (depositVotes: number) =>
    dispatch({ type: "setDepositVotes", depositVotes });

  const [inTransitMessages, tokensDispatch] = useReducer(
    transitMessageReducer,
    { txIsDone: false, transitMessage: [] }
  );

  useEffect(() => {
    if (depositNonce && !inTransitMessages.txIsDone) {
      handleProposalEvent(
        setTransactionStatus,
        setTransferTxHash,
        tokensDispatch,
        // computedDirections!,
        sygmaInstance!,
        setDepositVotes,
        depositVotes,
        transferTxHash,
        Number(depositNonce)
      );
    }
  }, [transferTxHash, depositNonce, depositVotes]);

  return (
    <DestinationBridgeContext.Provider
      value={{
        transferTxHash,
        depositVotes,
        setDepositVotes,
        inTransitMessages,
        tokensDispatch,
        disconnect: async () => undefined,
      }}
    >
      {children}
    </DestinationBridgeContext.Provider>
  );
};
