import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { nftPageTheme } from "../../themes/nftPageTheme";

import {
  useSygma,
  useHomeBridge,
  useNetworkManager,
  useWeb3,
} from "../../contexts";

import { useStyles } from "./styles";

import NetworkSelect from "../../components/NetworkSelect";

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

  const { homeChains, homeChainConfig } = useWeb3();

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
                disabled={false}
                options={chains!.map((dc: any) => ({
                  label: dc.name,
                  value: dc.domainId,
                }))}
                onChange={(value: number | undefined) => {
                  console.log(value);
                  setHomeNetworkState(value);
                }}
                value={homeNetworkState}
              />
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-end"
              xs={2}
            >
              <Box sx={{ mb: 2, pl: 2 }}>
                <img
                  src="/assets/images/nft_page/switch.svg"
                  alt="Switch network"
                />
              </Box>
            </Grid>
            <Grid item xs={5}>
              <NetworkSelect
                label="Destination Network"
                disabled={false}
                options={chains!.map((dc: any) => ({
                  label: dc.name,
                  value: dc.domainId,
                }))}
                onChange={(value: number | undefined) => {
                  console.log(value);
                  setDestinationNetworkState(value);
                }}
                value={destinationNetworkState}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default NftTransferPage;
