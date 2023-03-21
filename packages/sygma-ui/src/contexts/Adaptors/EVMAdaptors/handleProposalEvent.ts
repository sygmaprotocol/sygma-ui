import { Dispatch } from "react";
import { TransactionStatus } from "../../NetworkManagerContext";
import { AddMessageAction, ResetAction, TxIsDone } from "../../../reducers";
import { Sygma, Substrate } from "@buildwithsygma/sygma-sdk-core";
import { SubstrateConfig } from "../../../sygmaConfig";

const { substrateSocketConnect, listenForEvent } = Substrate;

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
  if (sygmaInstance.bridgeSetup?.chain2.type.toString() === "Substrate") {
    // Established connection to substrate
    substrateSocketConnect(
      {
        apiState: null,
        socket: (
          sygmaInstance.bridgeSetup?.chain2 as unknown as SubstrateConfig
        ).rpcUrl,
        jsonrpc: {},
      },
      {
        onConnectSucccess: (api) => {
          // listen for ProposalExecution event which means that transfer has been successful
          listenForEvent(api, "ProposalExecution", (data) => {
            const dataEvent = data as {
              depositNonce: string;
              dataHash: string;
            };
            if (dataEvent.depositNonce === depositNonce.toString()) {
              setDepositVotes(depositVotes + 1);
              tokensDispatch({
                type: "setTransactionIsDone",
              });
              setTransactionStatus("Transfer Completed");
              setTransferTxHash(dataEvent.dataHash);
            }
          });
        },
      }
    );
  } else {
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
  }
};
export default handleProposalEvent;
