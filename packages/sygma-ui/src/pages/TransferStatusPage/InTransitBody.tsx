import React from "react";

import { TransitState } from "../../reducers";
import { BridgeConfig } from "../../sygmaConfig";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { TransactionStatus } from "../../contexts";

const StatusIndicator = ({
  statusNumber,
  stepNumber,
}: {
  statusNumber: number;
  stepNumber: number;
}) =>
  statusNumber > stepNumber ? (
    <CheckCircleIcon color="success" sx={{ mt: 1 }} />
  ) : (
    <FbCircularProgress />
  );

const getTransactionStateIndicator = (status?: TransactionStatus) => {
  const transactionStatuses: { [key: string]: number } = {
    "Initializing Transfer": 1,
    "In Transit": 2,
    "Transfer Completed": 3,
    default: 0,
  };
  if (!status) return transactionStatuses["default"];

  return transactionStatuses[status] || transactionStatuses["default"];
};

function FbCircularProgress(props: CircularProgressProps) {
  return (
    <Box sx={{ position: "relative", mt: 1 }}>
      <CircularProgress
        variant="determinate"
        size={24}
        thickness={7}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: "#999",
          animationDuration: "1550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={24}
        thickness={7}
        {...props}
      />
    </Box>
  );
}

export default function InTransitBody({
  tokenType,
  transactionStatus,
}: {
  tokenType?: string;
  transactionStatus?: TransactionStatus;
  inTransitMessages?: TransitState;
  homeConfig?: BridgeConfig;
  homeTransferTxHash?: string;
}) {
  const statusNumber = getTransactionStateIndicator(transactionStatus);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ fontWeight: 500, mb: 4 }}>
        Transfering {tokenType?.toLocaleUpperCase()} token
      </Typography>
      <Stack spacing={3}>
        <Box>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Grid item>
              <Typography
                variant="h4"
                component="span"
                color="primary"
                sx={{ fontWeight: 500 }}
              >
                1
              </Typography>
            </Grid>
            <Grid item sx={{ width: "70%" }}>
              <Typography variant="h5" component="span">
                Initilazing
              </Typography>
            </Grid>
            <Grid item>
              <StatusIndicator statusNumber={statusNumber} stepNumber={0} />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Grid item>
              <Typography
                variant="h4"
                component="span"
                color="primary"
                sx={{ fontWeight: 500 }}
              >
                2
              </Typography>
            </Grid>
            <Grid item sx={{ width: "70%" }}>
              <Typography variant="h5" component="span">
                Depositing
              </Typography>
            </Grid>
            <Grid item>
              <StatusIndicator statusNumber={statusNumber} stepNumber={1} />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Grid item>
              <Typography
                variant="h4"
                component="span"
                color="primary"
                sx={{ fontWeight: 500 }}
              >
                3
              </Typography>
            </Grid>
            <Grid item sx={{ width: "70%" }}>
              <Typography variant="h5" component="span">
                In transit
              </Typography>
            </Grid>
            <Grid item>
              <StatusIndicator statusNumber={statusNumber} stepNumber={2} />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Grid item>
              <Typography
                variant="h4"
                component="span"
                color="primary"
                sx={{ fontWeight: 500 }}
              >
                4
              </Typography>
            </Grid>
            <Grid item sx={{ width: "70%" }}>
              <Typography variant="h5" component="span">
                Finilizing
              </Typography>
            </Grid>
            <Grid item>
              <StatusIndicator statusNumber={statusNumber} stepNumber={3} />
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}
