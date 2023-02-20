import React, { memo } from "react";

import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import { Erc721TokenIds } from "../../reducers/EvmHomeReducer";

import StandardImageList from "./StandardImageList";

const NftList = memo(function NftList({
  tokenWithIds,
  selectedNft,
  setSelectedNft,
  setValue,
}: {
  tokenWithIds: Erc721TokenIds;
  selectedNft?: string;
  setSelectedNft: React.Dispatch<React.SetStateAction<string | undefined>>;
  setValue?: any;
}) {
  const tokenCount = tokenWithIds.reduce(
    (sum, curr) => sum + curr.tokenIds.length,
    0
  );

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
          pt: 4,
          pb: 7,
          width: "100%",
          background: "#DBD3C7",
          borderRadius: 1,
          fontWeight: 500,
          fontSize: 18,
          letterSpacing: " 0.01em",
          color: "#5D503C",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            Only whitelisted NFTs can be transferred right now.
          </Grid>
          <Grid item xs={12}>
            {tokenCount ? (
              <StandardImageList
                tokenWithIds={tokenWithIds}
                setSelectedNft={setSelectedNft}
                setValue={setValue}
              />
            ) : (
              <Box>No available tokens for transfer</Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
});
export default NftList;
