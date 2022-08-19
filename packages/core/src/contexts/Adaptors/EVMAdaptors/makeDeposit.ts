import { Bridge, BridgeFactory } from "@chainsafe/chainbridge-contracts";
import ethers, { providers, BigNumber, utils, Event } from "ethers";
import { Erc20DetailedFactory } from "../../../Contracts/Erc20DetailedFactory";
import { TransactionStatus } from "../../NetworkManagerContext";

import {
  SygmaConfig,
  EvmBridgeConfig,
  BridgeConfig,
} from "../../../sygmaConfig";

import { getPriceCompatibility } from "./helpers";
import {
  BridgeData,
  BridgeEvents,
  Sygma,
  Directions,
  FeeDataResult,
} from "@chainsafe/sygma-sdk-core";

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
    sygmaInstance?: Sygma,
    bridgeSetup?: BridgeData
  ) =>
  async (paramsForDeposit: {
    amount: string;
    recipient: string;
    from: Directions;
    to: Directions;
    feeData: FeeDataResult;
  }) => {
    const tokenAddress = sygmaInstance!.getSelectedTokenAddress();
    const token = homeChainConfig!.tokens.find(
      (token) => token.address === tokenAddress
    );

    if (!token) {
      console.log("Invalid token selected");
      return;
    }

    setTransactionStatus("Initializing Transfer");
    setDepositAmount(Number(paramsForDeposit.amount));
    setSelectedToken(tokenAddress);

    try {
      const gasPriceCompatibility = await getPriceCompatibility(
        provider,
        homeChainConfig,
        gasPrice
      );
      // Allowance for bridge
      const currentAllowance = await sygmaInstance?.checkCurrentAllowance(
        address!
      );

      // TODO extract token allowance logic to separate function
      if (currentAllowance! < Number(paramsForDeposit.amount)) {
        if (currentAllowance! > 0 && token.isDoubleApproval) {
          await sygmaInstance!.approve({
            amounForApproval: "0",
          });
        }
        await sygmaInstance!.approve({
          amounForApproval: paramsForDeposit.amount,
        });
      }
      // Allowance for fee handler
      const currentAllowanceForFeeHandler =
        await sygmaInstance?.checkCurrentAllowanceForFeeHandler(address!);
      if (
        currentAllowanceForFeeHandler! <
        Number(utils.formatUnits(paramsForDeposit.feeData.fee, 18))
      ) {
        await sygmaInstance!.approveFeeHandler({
          amounForApproval: utils.formatUnits(paramsForDeposit.feeData.fee, 18),
        });
      }

      const depositTx = await sygmaInstance?.deposit({
        amount: paramsForDeposit.amount,
        recipientAddress: paramsForDeposit.recipient,
        feeData: paramsForDeposit.feeData,
      });
      sygmaInstance?.createHomeChainDepositEventListener(
        (
          destinationDomainId: number,
          resourceId: string,
          depositNonce: ethers.BigNumber,
          user: string,
          data: string,
          handleResponse: string,
          tx: Event
        ) => {
          if (depositTx?.status === 1) {
            console.log("depositNonce", depositNonce.toNumber().toString());
            setDepositNonce(depositNonce.toNumber().toString());
            setTransactionStatus("In Transit");
            setHomeTransferTxHash(depositTx.transactionHash);
            sygmaInstance.removeHomeChainDepositEventListener();
          }
        }
      );

      return Promise.resolve();
    } catch (error) {
      console.error(error);
      setTransactionStatus("Transfer Aborted");
      setSelectedToken(tokenAddress);
    }
  };

export default makeDeposit;
