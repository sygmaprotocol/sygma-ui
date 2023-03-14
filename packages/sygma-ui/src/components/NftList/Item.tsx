import React, { memo } from "react";

import ImageListItem from "@mui/material/ImageListItem";

import { useBridge } from "../../contexts";
import { Metadata } from "../../reducers/EvmHomeReducer";

const Item = memo(function Item({
  classes,
  setSelectedNft,
  setValue,
  tokenMetadata,
}: {
  classes: any;
  setSelectedNft: any;
  setValue?: any;
  tokenMetadata: Metadata;
}) {
  const { sygmaInstance } = useBridge();

  return (
    <ImageListItem
      className={classes.imageListItem}
      onClick={() => {
        sygmaInstance?.setSelectedToken(tokenMetadata.tokenAddress);
        setSelectedNft(tokenMetadata.tokenId);
        setValue("token", tokenMetadata.tokenAddress);
        setValue("tokenAmount", tokenMetadata.tokenId);
      }}
    >
      <img
        src={tokenMetadata.image ?? "/assets/images/logo1.svg"}
        loading="lazy"
        alt={"logo"}
      />
    </ImageListItem>
  );
});
export default Item;
