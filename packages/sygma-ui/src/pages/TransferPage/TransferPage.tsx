import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";

import Stack from "@mui/material/Stack";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Button from "@mui/material/Button";
import clsx from "clsx";

import {
  useBridge,
  useSygma,
  useHomeBridge,
  useNetworkManager,
  useWeb3,
} from "../../contexts";
import { showImageUrl } from "../../utils/Helpers";
import { useStyles } from "./styles";

import {
  TransferActiveModal,
  NetworkUnsupportedModal,
  PreflightModalTransfer,
  AboutDrawer,
  NetworkSelectModal,
} from "../../modules";
import {
  AddressInput,
  TokenSelectInput,
  TokenInput,
  Fees,
  SelectDestinationNetwork,
} from "../../components";

import HomeNetworkConnectView from "./HomeNetworkConnectView";

import makeValidationSchema from "./makeValidationSchema";
import {
  BridgeData,
  FeeDataResult,
  Directions,
} from "@buildwithsygma/sygma-sdk-core";

export type PreflightDetails = {
  tokenAmount: string;
  token: string;
  tokenSymbol: string;
  receiver: string;
};

const TransferPage = () => {
  const classes = useStyles();
  const { walletType, setWalletType } = useWeb3();

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
    checkSupplies,
  } = useSygma();
  const [customFee, setCustomFee] = useState<FeeDataResult>();
  const { sygmaInstance } = useBridge();
  const { accounts, selectAccount, setSelectedToken } = useHomeBridge();
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [walletConnecting, setWalletConnecting] = useState(false);
  const [preflightModalOpen, setPreflightModalOpen] = useState<boolean>(false);

  const [preflightDetails, setPreflightDetails] = useState<PreflightDetails>({
    receiver: "",
    token: "",
    tokenAmount: "0",
    tokenSymbol: "",
  });

  useEffect(() => {
    if (walletType !== "select" && walletConnecting === true) {
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

  async function setFee(amount: string) {
    if (sygmaInstance && amount && address) {
      const fee = await sygmaInstance.fetchFeeData({
        amount: amount,
        recipientAddress: destAddress,
      });
      if (!(fee instanceof Error)) {
        setCustomFee(fee);
      }
    }
  }

  useEffect(() => {
    console.log("watchAmount", watchAmount);
    setFee(watchAmount.toString().replace(/\D/g, ""));
  }, [watchAmount, preflightDetails]);

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
    <Box className={classes.root} sx={{ p: 6, backgroundColor: "#F0F0F0" }}>
      <HomeNetworkConnectView
        isReady={isReady}
        accounts={accounts}
        address={address}
        classes={classes}
        walletConnecting={walletConnecting}
        walletType={walletType}
        homeConfig={homeConfig}
        setWalletType={setWalletType}
        selectAccount={selectAccount}
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
            onChange={(value: number | undefined) => setDestinationChain(value)}
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
                  ? Object.keys(tokens).map((t) => ({
                      value: t,
                      label: (
                        <div className={classes.tokenItem}>
                          {tokens[t]?.imageUri && (
                            <img
                              src={showImageUrl(tokens[t]?.imageUri)}
                              alt={tokens[t]?.symbol}
                            />
                          )}
                          <span>{tokens[t]?.symbol || t}</span>
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
            placeholder="0x · · · · · · · · · · · · ·"
            senderAddress={`${address}`}
            sendToSameAccountHelper={
              destinationChainConfig?.type === homeConfig?.type
            }
            setValue={setValue}
            control={control}
          />
        </section>
        <Fees
          amountFormikName="tokenAmount"
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
          };

          console.log(sygmaInstance);

          setPreflightModalOpen(false);
          preflightDetails && deposit(paramsForDeposit);
        }}
        sourceNetwork={homeConfig?.name || ""}
        targetNetwork={destinationChainConfig?.name || ""}
        tokenSymbol={preflightDetails?.tokenSymbol || ""}
        value={preflightDetails?.tokenAmount || "0"}
      />
      <TransferActiveModal open={!!transactionStatus} close={resetForFields} />
      {/* This is here due to requiring router */}
      {/* <NetworkUnsupportedModal /> */}
      <NetworkSelectModal />
    </Box>
  );
};
export default TransferPage;
