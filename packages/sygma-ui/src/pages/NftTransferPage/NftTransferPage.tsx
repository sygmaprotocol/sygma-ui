import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ethers } from "ethers";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

import { FeeDataResult } from "@buildwithsygma/sygma-sdk-core";

import { nftPageTheme } from "../../themes/nftPageTheme";

import { useSygma, useWeb3, useBridge, useHomeBridge } from "../../contexts";
import { getErc721Urls } from "../../utils/Helpers";
import { Tokens } from "../../types";

import { useStyles } from "./styles";

import NetworkSelect from "../../components/NetworkSelect";
import NftTokenType from "../../components/NftTokenType";
import NftEmpty from "../../components/NftEmpty";
import NftList from "../../components/NftList";
import SelectedNft from "../../components/SelectedNft";
import NftAddressInput from "../../components/NftAddressInput";

import {
  TransferActiveModal,
  NetworkUnsupportedModal,
  PreflightModalTransfer,
  NftPreflightModalTransfer,
} from "../../modules";
import { Fees } from "../../components";
import makeValidationSchema from "./makeValidationSchema";

export type PreflightDetails = {
  tokenAmount: string;
  token: string;
  tokenSymbol: string;
  receiver: string;
};

const NftTransferPage = () => {
  const history = useHistory();

  const { classes } = useStyles();

  const [customFee, setCustomFee] = useState<FeeDataResult>();

  const [selectedNft, setSelectedNft] = useState<string | undefined>(undefined);

  const { erc721TokenWithIds, homeDispatch } = useHomeBridge();

  const [preflightModalOpen, setPreflightModalOpen] = useState<boolean>(false);

  const [preflightDetails, setPreflightDetails] = useState<PreflightDetails>({
    receiver: "",
    token: "",
    tokenAmount: "0",
    tokenSymbol: "",
  });

  const { provider, tokens, dispatcher } = useWeb3();
  const {
    deposit,
    setDestinationChain,
    transactionStatus,
    resetDeposit,
    bridgeFee,
    isReady,
    homeConfig,
    destinationChainConfig,
    destinationChains,
    address,
    checkSupplies,
    chains,
  } = useSygma();

  const transferSchema = makeValidationSchema({
    preflightDetails,
    tokens,
    homeConfig,
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
  const onSubmit: SubmitHandler<PreflightDetails> = (values) => {
    setPreflightDetails({
      ...values,
      tokenSymbol: "",
    });
    setPreflightModalOpen(true);
  };

  const watchAmount = watch("tokenAmount", "0");
  const watchToken = watch("token", "");
  const destAddress = watch("receiver", address);

  const { sygmaInstance } = useBridge();

  useEffect(() => {
    if (homeConfig && provider && address && !erc721TokenWithIds) {
      const erc721tokens = homeConfig.tokens.filter(
        (entry) => entry.type === "erc721"
      );
      getErc721Urls(erc721tokens, address, provider).then((erc721Urls) => {
        homeDispatch({
          type: "setErc721TokenIds",
          erc721TokenWithIds: erc721Urls,
        });
      });
    }
  }, [erc721TokenWithIds, homeConfig]);

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
    setFee(watchAmount.toString().replace(/\D/g, ""));
  }, [watchAmount, preflightDetails, destinationChainConfig]);

  const resetForFields = () => {
    setSelectedNft(undefined);
    reset({
      tokenAmount: "",
      receiver: "",
    });
    resetDeposit();
    homeDispatch({
      type: "setErc721TokenIds",
      erc721TokenWithIds: undefined,
    });
  };

  return (
    <ThemeProvider theme={nftPageTheme}>
      <Paper
        sx={{
          position: "relative",
          margin: "30px auto",
          maxWidth: 800,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: "#F0F0F0",
          boxShadow:
            "0px 3px 6px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.08), 0px 1px 12px rgba(0, 0, 0, 0.04)",
          borderRadius: "12px",
        }}
      >
        <Box
          className={classes.root}
          sx={{ p: 3, backgroundColor: "#F0F0F0", borderRadius: "inherit" }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <NetworkSelect
                label="Home Network"
                disabled={!!homeConfig?.domainId || !isReady}
                options={chains!.map((dc: any) => ({
                  label: dc.name,
                  value: dc.domainId,
                }))}
                value={homeConfig?.domainId}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Box
                sx={{
                  pt: 2,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/assets/images/nft_page/switch.svg"
                  alt="Switch network"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={5}>
              <NetworkSelect
                label="Destination Network"
                disabled={!homeConfig || formState.isSubmitting}
                options={destinationChains?.map((dc: any) => ({
                  label: dc.name,
                  value: dc.domainId,
                }))}
                onChange={(value: number | undefined) => {
                  setDestinationChain(value);
                }}
                value={destinationChainConfig?.domainId}
              />
            </Grid>
            <Grid item xs={12}>
              <NftTokenType />
            </Grid>
            <Grid item xs={12}>
              {isReady && (
                <>
                  {selectedNft ? (
                    <SelectedNft
                      tokenId={watchAmount}
                      setSelectedNft={setSelectedNft}
                      setValue={setValue}
                      tokenAddress={watchToken}
                      tokenName={tokens[watchToken].name}
                    />
                  ) : erc721TokenWithIds ? (
                    <NftList
                      tokenWithIds={erc721TokenWithIds}
                      setSelectedNft={setSelectedNft}
                      setValue={setValue}
                    />
                  ) : (
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress />
                    </Box>
                  )}
                </>
              )}
              {!isReady && (
                <NftEmpty
                  connect={() =>
                    dispatcher({
                      type: "setShowConnectionDialog",
                      payload: true,
                    })
                  }
                />
              )}
            </Grid>

            {isReady && (
              <>
                <Grid item xs={12}>
                  <NftAddressInput
                    disabled={!destinationChainConfig || formState.isSubmitting}
                    name="receiver"
                    label="Destination Address"
                    placeholder="0x · · · · · · · · · · · · ·"
                    senderAddress={`${address}`}
                    setValue={setValue}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} sx={{ pt: 0, pl: 2 }}>
                  {selectedNft && (
                    <Fees
                      className={classes.fees}
                      fee={
                        customFee ? customFee.calculatedRate.toString() : "0"
                      }
                      feeSymbol={
                        customFee &&
                        customFee.erc20TokenAddress &&
                        customFee.erc20TokenAddress !==
                          ethers.constants.AddressZero
                          ? tokens[customFee.erc20TokenAddress].symbol
                          : homeConfig?.nativeTokenSymbol
                      }
                      symbol={
                        preflightDetails &&
                        !!tokens &&
                        tokens[preflightDetails.token]
                          ? tokens[preflightDetails.token].symbol
                          : undefined
                      }
                      amount={watchAmount}
                    />
                  )}
                </Grid>
              </>
            )}

            {isReady ? (
              <Grid item xs={12} sm={4}>
                <Button
                  disabled={
                    !selectedNft ||
                    !destinationChainConfig ||
                    formState.isSubmitting
                  }
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ px: 3, fontSize: 18 }}
                >
                  Transfer NFT
                </Button>
              </Grid>
            ) : (
              <>
                <Grid item sm={4}></Grid>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      py: 3,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ px: 3, fontSize: 18 }}
                      onClick={() =>
                        dispatcher({
                          type: "setShowConnectionDialog",
                          payload: true,
                        })
                      }
                    >
                      Connect Wallet
                    </Button>
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
        <NftPreflightModalTransfer
          open={preflightModalOpen}
          close={() => setPreflightModalOpen(false)}
          start={() => {
            const paramsForDeposit = {
              tokenAddress: preflightDetails.token,
              amount: preflightDetails.tokenAmount,
              recipient: preflightDetails.receiver,
              feeData: customFee!,
            };

            console.log(sygmaInstance);

            setPreflightModalOpen(false);
            history.push("/transfer_status");
            preflightDetails && deposit(paramsForDeposit);
          }}
        />
      </Paper>
    </ThemeProvider>
  );
};

export default NftTransferPage;
