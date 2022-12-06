import ethers, { providers, BigNumber, utils, Event } from "ethers";
import { TransactionStatus } from "../../NetworkManagerContext";

import { BridgeConfig } from "../../../sygmaConfig";

import { getPriceCompatibility } from "./helpers";
import { Sygma, FeeDataResult } from "@buildwithsygma/sygma-sdk-core";

const makeDeposit =
  (
    setTransactionStatus: (message: TransactionStatus | undefined) => void,
    setDepositNonce: (input: string | undefined) => void,
    setHomeTransferTxHash: (input: string) => void,
    setDepositAmount: (input: number | undefined) => void,
    setSelectedToken: (tokenAddress: string) => void,
    gasPrice: number,

    homeChainConfig?: BridgeConfig,
    provider?: providers.Web3Provider,
    address?: string,
    sygmaInstance?: Sygma
  ) =>
  async (paramsForDeposit: {
    tokenAddress: string;
    amount: string;
    recipient: string;
    feeData: FeeDataResult;
  }) => {
    const tokenAddress = sygmaInstance!.setSelectedToken(
      paramsForDeposit.tokenAddress
    );
    const token = homeChainConfig!.tokens.find(
      (token) => token.address === paramsForDeposit.tokenAddress
    );

    if (!token) {
      console.log("Invalid token selected");
      return;
    }

    setTransactionStatus("Initializing Transfer");
    setDepositAmount(Number(paramsForDeposit.amount));
    setSelectedToken(paramsForDeposit.tokenAddress);

    try {
      const gasPriceCompatibility = await getPriceCompatibility(
        provider,
        homeChainConfig,
        gasPrice
      );
      // Allowance for bridge
      if (token.type === "erc20") {
        const currentAllowance = await sygmaInstance?.checkCurrentAllowance(
          address!
        );

        // TODO extract token allowance logic to separate function
        if (currentAllowance! < Number(paramsForDeposit.amount)) {
          if (currentAllowance! > 0 && token.isDoubleApproval) {
            await sygmaInstance!.approve({
              amountOrIdForApproval: "0",
            });
          }
          await sygmaInstance!.approve({
            amountOrIdForApproval: paramsForDeposit.amount,
          });
        }

        // Allowance for fee handler
        const currentAllowanceForFeeHandler =
          await sygmaInstance?.checkCurrentAllowanceForFeeHandler(address!);

        if (
          currentAllowanceForFeeHandler! <
          Number(utils.formatUnits(paramsForDeposit.feeData.fee, 18))
        ) {
          console.log(
            "request approval for fee approval",
            Number(utils.formatUnits(paramsForDeposit.feeData.fee, 18))
          );
          await sygmaInstance!.approveFeeHandler({
            amounForApproval: utils.formatUnits(
              paramsForDeposit.feeData.fee,
              18
            ),
          });
        }
      } else if (token.type === "erc721") {
        const isApproved = await sygmaInstance?.getAppoved(
          paramsForDeposit.amount
        );
        if (!isApproved) {
          await sygmaInstance?.approve({
            amountOrIdForApproval: paramsForDeposit.amount,
          });
        }
      }

      const depositTx = await sygmaInstance?.deposit({
        amount: paramsForDeposit.amount,
        recipientAddress: paramsForDeposit.recipient,
        feeData: paramsForDeposit.feeData,
      });
      const depositEvent = await sygmaInstance!.getDepositEventFromReceipt(
        depositTx!
      );
      const { depositNonce } = depositEvent.args;
      if (depositTx?.status === 1) {
        console.log("depositNonce", depositNonce.toNumber().toString());
        setDepositNonce(depositNonce.toNumber().toString());
        setTransactionStatus("In Transit");
        setHomeTransferTxHash(depositTx.transactionHash);
      } else {
        throw "deposit transaction unsuccessful";
      }
      setHomeTransferTxHash(depositTx!.transactionHash);

      return Promise.resolve();
    } catch (error) {
      console.error(error);
      setTransactionStatus("Transfer Aborted");
      setSelectedToken(paramsForDeposit.tokenAddress);
    }
  };

export default makeDeposit;
