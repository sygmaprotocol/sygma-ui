import React from "react";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

export default function SelectNft({ connect }: { connect: any }) {
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
      <ButtonBase
        sx={{
          mt: 1,
          p: 10,
          width: "100%",
          background: "#DBD3C7",
          borderRadius: 1,
          fontWeight: 500,
          fontSize: 18,
          letterSpacing: " 0.01em",
          color: "#5D503C",
        }}
        onClick={connect}
      >
        Connect wallet to continue.
      </ButtonBase>
    </Box>
  );
}
