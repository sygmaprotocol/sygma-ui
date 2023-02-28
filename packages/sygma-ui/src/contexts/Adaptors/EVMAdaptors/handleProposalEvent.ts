import { Dispatch } from "react";
import { TransactionStatus } from "../../NetworkManagerContext";
import { AddMessageAction, ResetAction, TxIsDone } from "../../../reducers";
import { Sygma } from "@buildwithsygma/sygma-sdk-core";

const handleProposalEvent = (
  setTransactionStatus: (message: TransactionStatus | undefined) => void,
  setTransferTxHash: (input: string) => void,
  tokensDispatch: Dispatch<AddMessageAction | ResetAction | TxIsDone>,
  sygmaInstance: Sygma,
  setDepositVotes: any,
  depositVotes: any,
  transferTxHash: string,
  depositNonce: number
) => {
  const listersCount =
    sygmaInstance.proposalExecutionEventListenerCount("chain2");
  if (listersCount === 0) {
    sygmaInstance.destinationProposalExecutionEventListener(
      depositNonce,
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
