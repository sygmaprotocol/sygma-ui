import React, { memo } from "react";

import ImageList from "@mui/material/ImageList";

import { Erc721TokenIds } from "../../reducers/EvmHomeReducer";

import { useStyles } from "./styles";

import Item from "./Item";

export const StandardImageList = memo(function StandardImageList({
  tokenWithIds,
  setSelectedNft,
  setValue,
}: {
  tokenWithIds: Erc721TokenIds;
  setSelectedNft: React.Dispatch<React.SetStateAction<string | undefined>>;
  setValue?: any;
}) {
  const { classes } = useStyles();

  return (
    <ImageList className={classes.imageList} variant="masonry" cols={6} gap={8}>
      {tokenWithIds.map((tkn) =>
        tkn.tokenIdsWithMetadata.map((tokenMetadata) => (
          <Item
            key={tokenMetadata.tokenAddress + tokenMetadata.tokenId}
            classes={classes}
            setSelectedNft={setSelectedNft}
            setValue={setValue}
            tokenMetadata={tokenMetadata}
          />
        ))
      )}
    </ImageList>
  );
});
export default StandardImageList;
