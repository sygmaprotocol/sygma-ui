import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Button from "@mui/material/Button";
import clsx from "clsx";
import {
  FeeDataResult,
  Sygma,
  EvmBridgeSetup,
} from "@buildwithsygma/sygma-sdk-core";

import { useBridge, useHomeBridge, useSygma, useWeb3 } from "../../contexts";
import { showImageUrl } from "../../utils/Helpers";
import { useStyles } from "./styles";

import {
  AboutDrawer,
  NetworkSelectModal,
  NetworkUnsupportedModal,
  PreflightModalTransfer,
  TransferActiveModal,
} from "../../modules";
import {
  AddressInput,
  Fees,
  HomeNetworkConnectView,
  SelectDestinationNetwork,
  TokenInput,
  TokenSelectInput,
} from "../../components";

import makeValidationSchema from "./makeValidationSchema";

export type PreflightDetails = {
  tokenAmount: string;
  token: string;
  tokenSymbol: string;
  receiver: string;
};

const TransferPage = () => {
  const classes = useStyles();
  const { walletType } = useWeb3();

  const { dispatcher } = useWeb3();

  const {
    deposit,
    setDestinationChain,
    transactionStatus,
    resetDeposit,
    bridgeFee,
    tokens,
    isReady,
    homeConfig,
    destinationChainConfig,
    destinationChains,
    address,
  } = useSygma();
  const [customFee, setCustomFee] = useState<FeeDataResult>();
  const { sygmaInstance } = useBridge();
  const { setSelectedToken } = useHomeBridge();
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [walletConnecting, setWalletConnecting] = useState(false);
  const [preflightModalOpen, setPreflightModalOpen] = useState<boolean>(false);
  const [areFeeSettingsSet, setAreFeeSettingsSet] = useState<boolean>(false);

  const [preflightDetails, setPreflightDetails] = useState<PreflightDetails>({
    receiver: "",
    token: "",
    tokenAmount: "0",
    tokenSymbol: "",
  });

  useEffect(() => {
    if (walletType !== "select" && walletConnecting) {
      setWalletConnecting(false);
    } else if (walletType === "select") {
      setWalletConnecting(true);
    }
  }, [walletType, walletConnecting]);

  const transferSchema = makeValidationSchema({
    preflightDetails,
    tokens,
    bridgeFee,
    homeConfig,
    destinationChainConfig,
    sygmaInstance,
  });

  const { handleSubmit, control, setValue, watch, formState, reset } =
    useForm<PreflightDetails>({
      resolver: yupResolver(transferSchema),
      defaultValues: {
        token: "",
        tokenAmount: "0",
        receiver: "",
      },
    });

  const watchToken = watch("token", "");
  const watchAmount = watch("tokenAmount", "0");
  const destAddress = watch("receiver", address);

  useEffect(() => {
    async function getFeeStrategy(): Promise<void> {
      if (sygmaInstance && watchToken && address) {
        const feeRouterAddress = (sygmaInstance as Sygma)!.getFeeRouterAddress(
          "chain1"
        );
        const { resourceId, address: tokenAddress } = (
          sygmaInstance as Sygma
        ).getSelectedToken();

        const signer = (sygmaInstance as Sygma)!.getSigner("chain1");

        const { domainId } = destinationChainConfig!;

        const feeHandlerAddress = await (
          sygmaInstance as Sygma
        ).getFeeHandlerAddress(
          signer as ethers.Signer,
          feeRouterAddress,
          `${domainId}`,
          resourceId
        );

        const bridgeSetup = (sygmaInstance as Sygma)!.getBridgeSetup("chain1");

        const feeHandlerFound = (
          bridgeSetup as EvmBridgeSetup
        ).feeHandlers.find(
          (feeHandler: { type: string; address: string }) =>
            feeHandler.address === feeHandlerAddress
        );

        (sygmaInstance as Sygma)!.setFeeSettings(
          feeHandlerFound!.type,
          feeHandlerFound!.address,
          tokenAddress,
          "chain1"
        );

        setAreFeeSettingsSet(true);

        console.log("SygmaInstance", sygmaInstance?.bridgeSetup);
      }
    }

    if (watchToken !== "") {
      getFeeStrategy();
    }
  }, [watchToken]);

  useEffect(() => {
    async function setFee(amount: string) {
      if (sygmaInstance && amount && address) {
        const fee = await sygmaInstance.fetchFeeData({
          amount: amount,
          recipientAddress: destAddress
            ? destAddress
            : ethers.constants.AddressZero,
        });
        if (!(fee instanceof Error)) {
          setCustomFee(fee);
        }
      }
    }

    if (areFeeSettingsSet) {
      setFee(watchAmount.toString().replace(/\D/g, "")).catch((err) =>
        console.error("the error", err)
      );
    }
  }, [
    watchAmount,
    preflightDetails,
    destinationChainConfig,
    areFeeSettingsSet,
  ]);

  const onSubmit: SubmitHandler<PreflightDetails> = (values) => {
    setPreflightDetails({
      ...values,
      tokenSymbol: "",
    });
    setPreflightModalOpen(true);
  };

  const resetForFields = () => {
    reset({
      tokenAmount: "",
      receiver: "",
    });
    resetDeposit();
  };

  return (
    <Paper
      sx={{
        margin: "30px auto",
        maxWidth: 360,
        display: "flex",
        flexDirection: "column",
        // overflow: "hidden",
        background: "#F0F0F0",
        boxShadow:
          "box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.02), 0px 1px 12px rgba(0, 0, 0, 0.12);",
        borderRadius: "12px",
      }}
      elevation={3}
    >
      <Box
        className={classes.root}
        sx={{ p: 6, backgroundColor: "#F0F0F0", borderRadius: "inherit" }}
      >
        <HomeNetworkConnectView
          isReady={isReady}
          walletConnecting={walletConnecting}
          homeConfig={homeConfig}
          dispatcher={dispatcher}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <section>
            <SelectDestinationNetwork
              label="Destination Network"
              disabled={!homeConfig || formState.isSubmitting}
              options={destinationChains.map((dc: any) => ({
                label: dc.name,
                value: dc.domainId,
              }))}
              onChange={(value: number | undefined) =>
                setDestinationChain(value)
              }
              value={destinationChainConfig?.domainId}
            />
          </section>
          <section className={classes.currencySection}>
            <section>
              <TokenSelectInput
                control={control}
                rules={{ required: true }}
                tokens={tokens ?? []}
                name="token"
                disabled={!destinationChainConfig || formState.isSubmitting}
                label={`Balance: `}
                className={classes.generalInput}
                sync={(tokenAddress) => {
                  sygmaInstance?.setSelectedToken(tokenAddress);
                  setSelectedToken(tokenAddress);
                  setPreflightDetails({
                    ...preflightDetails,
                    token: tokenAddress,
                    receiver: "",
                    tokenAmount: "0",
                    tokenSymbol: "",
                  });
                }}
                setValue={setValue}
                options={
                  tokens
                    ? Object.values(tokens)
                        .filter((tk) => tk.type === "erc20")
                        .map((t) => ({
                          value: t.address,
                          label: (
                            <div className={classes.tokenItem}>
                              {t?.imageUri && (
                                <img
                                  src={showImageUrl(t?.imageUri)}
                                  alt={t?.symbol}
                                />
                              )}
                              <span>{t?.symbol}</span>
                            </div>
                          ),
                        }))
                    : []
                }
              />
            </section>
            <section>
              <div>
                <TokenInput
                  classNames={{
                    input: clsx(classes.tokenInput, classes.generalInput),
                    button: classes.maxButton,
                  }}
                  tokenSelectorKey={watchToken}
                  tokens={tokens}
                  disabled={
                    !destinationChainConfig ||
                    formState.isSubmitting ||
                    !preflightDetails.token ||
                    preflightDetails.token === ""
                  }
                  name="tokenAmount"
                  label="Amount to send"
                  setValue={setValue}
                  control={control}
                />
              </div>
            </section>
          </section>
          <section>
            <AddressInput
              disabled={!destinationChainConfig || formState.isSubmitting}
              name="receiver"
              label="Destination Address"
              placeholder="· · · · · · · · · · · · · ·"
              senderAddress={`${address}`}
              sendToSameAccountHelper={
                destinationChainConfig?.type === homeConfig?.type
              }
              setValue={setValue}
              control={control}
            />
          </section>
          <Fees
            showTransferAmount
            className={classes.fees}
            fee={customFee ? customFee.calculatedRate.toString() : "0"}
            feeSymbol={
              customFee &&
              customFee.erc20TokenAddress &&
              customFee.erc20TokenAddress !== ethers.constants.AddressZero
                ? tokens[customFee.erc20TokenAddress].symbol
                : homeConfig?.nativeTokenSymbol
            }
            symbol={
              preflightDetails && !!tokens && tokens[preflightDetails.token]
                ? tokens[preflightDetails.token].symbol
                : undefined
            }
            amount={watchAmount}
          />
          <section>
            <Button
              disabled={!destinationChainConfig || formState.isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                backgroundColor: "#f0f0f0",
                color: "#FF7A45",
                border: "2px solid #FF7A45",
                borderRadius: "8px",
                boxShadow:
                  "0px 1px 2px rgba(0, 0, 0, 0.16), 0px 2px 4px rgba(0, 0, 0, 0.12), 0px 1px 8px rgba(0, 0, 0, 0.1)",
                ":hover": {
                  backgroundColor: "#FF7A45",
                  color: "#fff",
                },
                "&.Mui-disabled": {
                  border: "none",
                  backgroundColor: "transparent",
                  boxShadow:
                    "0px 1px 2px rgba(0, 0, 0, 0.16), 0px 2px 4px rgba(0, 0, 0, 0.12), 0px 1px 8px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              Start transfer
            </Button>
          </section>
          <Stack
            sx={{ marginTop: "40px" }}
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <HelpOutlineIcon
              onClick={() => setAboutOpen(true)}
              className={classes.faqButton}
            />
            <a
              className={classes.faucetLink}
              href="https://faucet-ui-stage.buildwithsygma.com/"
            >
              Faucet
            </a>
          </Stack>
        </form>
        <AboutDrawer open={aboutOpen} close={() => setAboutOpen(false)} />
        <PreflightModalTransfer
          open={preflightModalOpen}
          close={() => setPreflightModalOpen(false)}
          receiver={preflightDetails?.receiver || ""}
          sender={address || ""}
          start={() => {
            const paramsForDeposit = {
              tokenAddress: preflightDetails.token,
              amount: preflightDetails.tokenAmount,
              recipient: preflightDetails.receiver,
              feeData: customFee!,
              sygmaInstance: sygmaInstance!,
            };
            sygmaInstance!.setSelectedToken(preflightDetails.token);
            setPreflightModalOpen(false);
            preflightDetails && deposit(paramsForDeposit);
          }}
          sourceNetwork={homeConfig?.name || ""}
          targetNetwork={destinationChainConfig?.name || ""}
          tokenSymbol={preflightDetails?.tokenSymbol || ""}
          value={preflightDetails?.tokenAmount || "0"}
        />
        <TransferActiveModal
          open={!!transactionStatus}
          close={resetForFields}
        />
        {/* This is here due to requiring router */}
        <NetworkUnsupportedModal />
        <NetworkSelectModal />
      </Box>
    </Paper>
  );
};
export default TransferPage;
