import React from "react";

import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function NftTokenType() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={8}>
        <InputLabel
          id="token-type-label"
          color="secondary"
          sx={{
            pt: 1,
            fontWeight: 500,
            fontSize: 18,
            marginLeft: "4px",
          }}
        >
          Token Type
        </InputLabel>
      </Grid>
      <Grid
        item
        xs={6}
        md={4}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Box
          sx={{
            display: { xs: "none", sm: "flex", md: "flex" },
            ml: 2,
            background: "#DBD3C7",
            borderRadius: 1,
          }}
        >
          <Button
            disabled
            sx={{
              px: 2,
              color: "#000",
              display: "block",
              fontSize: 18,
              "&.active": {
                background: "#CDC2B1",
              },
            }}
          >
            ERC1155
          </Button>
          <Button
            sx={{
              px: 2,
              color: "#000",
              display: "block",
              fontSize: 18,
              background: "#CDC2B1",

              "&.active": {
                background: "#CDC2B1",
              },
            }}
          >
            ERC721
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
