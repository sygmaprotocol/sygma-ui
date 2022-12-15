import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface INftPreflightModalTransferProps {
  open: boolean;
  close: () => void;
  start: () => void;
}

const NftPreflightModalTransfer = ({
  open,
  close,
  start,
}: INftPreflightModalTransferProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      maxWidth="md"
      onClose={close}
      PaperProps={{ sx: { maxWidth: 800 } }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 500, textAlign: "center" }}
          color="black"
        >
          Wait a minute!
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: 500, textAlign: "center", my: 3 }}
          color="black"
        >
          Bridging NFTs is a fairly new operation.
          <br />A few things to keep in mind:
        </Typography>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={6}>
            <Stack
              direction="column"
              justifyContent="space-between"
              height="100%"
            >
              <Stack direction="row" alignItems="center" spacing={2} my={2}>
                <Typography
                  variant="h4"
                  component="div"
                  color="primary"
                  sx={{ fontWeight: 500 }}
                >
                  1
                </Typography>
                <Typography variant="h6" component="div" color="black">
                  Transactions cannot be cancelled after submitting.
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2} my={2}>
                <Typography
                  variant="h4"
                  component="div"
                  color="primary"
                  sx={{ fontWeight: 500 }}
                >
                  2
                </Typography>
                <Typography variant="h6" component="div" color="black">
                  The transfer fee might be higher than expected.
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack
              direction="column"
              justifyContent="space-between"
              height="100%"
            >
              <Stack direction="row" alignItems="center" spacing={2} my={2}>
                <Typography
                  variant="h4"
                  component="div"
                  color="primary"
                  sx={{ fontWeight: 500 }}
                >
                  3
                </Typography>
                <Typography variant="h6" component="div" color="black">
                  Transactions can get stuck indefinitely.
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2} my={2}>
                <Typography
                  variant="h4"
                  component="div"
                  color="primary"
                  sx={{ fontWeight: 500 }}
                >
                  4
                </Typography>
                <Typography variant="h6" component="div" color="black">
                  Funds cannot be returned if they are sent to the wrong
                  address, double check!
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <Stack
          direction="column"
          alignItems="center"
          spacing={2}
          sx={{ my: 3 }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={start}
          >
            I understand, start transfer
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={close}
          >
            Back
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default React.memo(NftPreflightModalTransfer);
