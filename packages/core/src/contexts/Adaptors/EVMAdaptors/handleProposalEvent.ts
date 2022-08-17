import { Dispatch } from "react";
import { BigNumber, Event } from "ethers";
import { Bridge, BridgeFactory } from "@chainsafe/sygma-contracts";
import { BridgeConfig } from "../../../sygmaConfig";
import { TransactionStatus } from "../../NetworkManagerContext";
import {
  AddMessageAction,
  ResetAction,
  TxIsDone,
} from "../../../reducers/TransitMessageReducer";
import {
  BridgeData,
  BridgeEvents,
  Directions,
  Sygma,
} from "@chainsafe/sygma-sdk-core";
import { Listener } from "@ethersproject/providers";
const handleProposalEvent = (
  setTransactionStatus: (message: TransactionStatus | undefined) => void,
  setTransferTxHash: (input: string) => void,
  tokensDispatch: Dispatch<AddMessageAction | ResetAction | TxIsDone>,
  computedDirections: { from: Directions; to: Directions },
  sygmaInstance: Sygma,
  setDepositVotes: any,
  depositVotes: any,
  transferTxHash: string
): Bridge => {
  const { from, to } = computedDirections;

  const listersCount = sygmaInstance.proposalExecutionEventListenerCount(to);
  if (listersCount === 0) {
    sygmaInstance.createProposalExecutionEventListener(to)(
      async (
        originDomainId: any,
        despositNonce: any,
        dataHash: any,
        tx: any
      ) => {
        if (transferTxHash !== tx.transactionHash) {
          const txReceipt = await tx.getTransactionReceipt();
          console.log(
            "🚀 ~ file: handleProposalEvent.ts ~ line 34 ~ txReceipt",
            txReceipt
          );
          console.log(
            "originDomainId",
            originDomainId,
            "despositNonce",
            despositNonce,
            "dataHash",
            dataHash
          );
          setDepositVotes(depositVotes + 1);
          tokensDispatch({
            type: "setTransactionIsDone",
          });
          setTransactionStatus("Transfer Completed");
          setTransferTxHash(tx.transactionHash);
        }
      }
    );
  }
};
export default handleProposalEvent;
