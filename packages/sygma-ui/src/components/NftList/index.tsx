import React from "react";

import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import { useStyles } from "./styles";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];

export function StandardImageList() {
  const { classes, cx } = useStyles();

  return (
    <ImageList className={classes.imageList} variant="masonry" cols={6} gap={8}>
      {itemData.slice(0, 3).map((item) => (
        <ImageListItem key={item.img} className={classes.imageListItem}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default function NftList() {
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
            <StandardImageList />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
