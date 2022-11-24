import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { nftPageTheme } from "../../themes/nftPageTheme";

import { useSygma, useWeb3 } from "../../contexts";

import { useStyles } from "./styles";

import NetworkSelect from "../../components/NetworkSelect";
import NftTokenType from "../../components/NftTokenType";
import SelectNft from "../../components/SelectNft";

export type PreflightDetails = {
  tokenAmount: string;
  token: string;
  tokenSymbol: string;
  receiver: string;
};

const NftTransferPage = () => {
  const { classes } = useStyles();

  const [homeNetworkState, setHomeNetworkState] = useState<number | undefined>(
    undefined
  );
  const [destinationNetworkState, setDestinationNetworkState] = useState<
    number | undefined
  >(undefined);

  const { handleSubmit, control, setValue, watch, formState, reset } =
    useForm<PreflightDetails>({
      // resolver: yupResolver(transferSchema),
      defaultValues: {
        token: "",
        tokenAmount: "0",
        receiver: "",
      },
    });
  const onSubmit: SubmitHandler<PreflightDetails> = (values) => {
    console.log(
      "🚀 ~ file: NftTransferPage.tsx ~ line 40 ~ NftTransferPage ~ values",
      values
    );
  };
  const { homeChains, homeChainConfig, dispatcher } = useWeb3();

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
    chains,
  } = useSygma();
  console.log(
    "🚀 ~ file: NftTransferPage.tsx ~ line 68 ~ NftTransferPage ~ destinationChainConfig",
    destinationChainConfig
  );

  return (
    <ThemeProvider theme={nftPageTheme}>
      <Paper
        sx={{
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
        elevation={3}
      >
        <Box
          className={classes.root}
          sx={{ p: 3, backgroundColor: "#F0F0F0", borderRadius: "inherit" }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <NetworkSelect
                label="Home Network"
                disabled={!!homeConfig?.domainId}
                options={chains!.map((dc: any) => ({
                  label: dc.name,
                  value: dc.domainId,
                }))}
                onChange={(value: number | undefined) => {
                  console.log(value);
                  setHomeNetworkState(value);
                }}
                value={homeConfig?.domainId}
              />
            </Grid>
            <Grid item xs={2}>
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
            <Grid item xs={5}>
              <NetworkSelect
                label="Destination Network"
                disabled={!homeConfig || formState.isSubmitting}
                options={destinationChains?.map((dc: any) => ({
                  label: dc.name,
                  value: dc.domainId,
                }))}
                onChange={(value: number | undefined) => {
                  console.log(value);
                  setDestinationChain(value);
                }}
                value={destinationChainConfig?.domainId}
              />
            </Grid>
            <Grid item xs={12}>
              <NftTokenType />
            </Grid>
            <Grid item xs={12}>
              {isReady ? (
                "Connected"
              ) : (
                <SelectNft
                  connect={() =>
                    dispatcher({
                      type: "setShowConnectionDialog",
                      payload: true,
                    })
                  }
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {!isReady && (
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
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default NftTransferPage;
