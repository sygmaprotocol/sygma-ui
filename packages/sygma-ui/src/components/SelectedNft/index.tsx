import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useStyles } from "./styles";
import { Typography } from "@mui/material";

import { useSygma, useHomeBridge } from "../../contexts";

export default function SelectedNft({
  tokenId,
  setSelectedNft,
  setValue,
  tokenAddress,
  tokenName,
}: {
  tokenId: string;
  setSelectedNft?: any;
  setValue?: any;
  tokenAddress?: string;
  tokenName?: string;
}) {
  const { erc721TokenWithIds } = useHomeBridge();
  const metadata = erc721TokenWithIds!
    .find((tkn) => tkn.tokenAddress === tokenAddress)
    ?.tokenIdsWithMetadata.find((metadata) => metadata.tokenId === tokenId);
  const { classes, cx } = useStyles();

  const { homeConfig } = useSygma();

  return (
    <Box>
      <InputLabel
        id="select-nft-label"
        color="secondary"
        sx={{
          pt: 1,
          fontWeight: 500,
          fontSize: 18,
          marginLeft: "4px",
        }}
      >
        Select NFT
      </InputLabel>
      <Box
        sx={{
          mt: 1,
          px: 3,
          py: 4,
          width: "100%",
          background: "#DBD3C7",
          borderRadius: 1,
          fontWeight: 500,
          fontSize: 18,
          letterSpacing: " 0.01em",
          color: "#5D503C",
          overflow: "hidden",
        }}
      >
        <Grid container spacing={2}>
          <>
            <Grid item sm={1}>
              <Link
                component="button"
                variant="body1"
                onClick={() => {
                  setValue("tokenAmount", "0");
                  setSelectedNft(undefined);
                }}
              >
                <ArrowBackIcon sx={{ fontSize: 40 }} color="action" />
              </Link>
            </Grid>
            <Grid item sm={2} xs={12}>
              <img
                className={classes.selectedImage}
                src={metadata?.image ?? "/assets/images/logo1.svg"}
                alt={metadata?.name ?? tokenId}
              />
            </Grid>
            <Grid item sm={9}>
              <Typography variant="subtitle1">
                {metadata?.name ?? tokenName}
              </Typography>
              <Typography variant="subtitle1">
                {"Token ID: "}
                <Link
                  href={`${homeConfig?.blockExplorer}/token/${tokenAddress}?a=${tokenId}`}
                  variant="subtitle1"
                  color="common.black"
                  target="_blank"
                >
                  {tokenId}
                </Link>
              </Typography>
              <Typography variant="subtitle1">
                {"Contract Addr: "}
                <Link
                  href={`${homeConfig?.blockExplorer}/token/${tokenAddress}`}
                  variant="subtitle1"
                  color="common.black"
                  target="_blank"
                >
                  {tokenAddress}
                </Link>
              </Typography>
            </Grid>
          </>
        </Grid>
      </Box>
    </Box>
  );
}
