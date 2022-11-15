import React from "react";
import { Typography, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { BridgeConfig } from "../../sygmaConfig";

import { ConnectionDialog } from "../../modules";

import { useStyles } from "./styles";

type HomeNetworkConnectViewProps = {
  isReady: boolean | undefined;
  walletConnecting: boolean;
  homeConfig: BridgeConfig | undefined;
  dispatcher: any;
};

export default function HomeNetworkConnectView({
  isReady,
  walletConnecting,
  homeConfig,
  dispatcher,
}: HomeNetworkConnectViewProps) {
  const { classes } = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ConnectionDialog
        dispatcher={dispatcher}
        open={open}
        handleClose={handleClose}
      />
      <div className={classes.walletArea}>
        {!isReady && (
          <Button
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              backgroundColor: "#F0F0F0",
              color: "#FF7A45",
              border: "2px solid #FF7A45",
              borderRadius: "8px",
              boxShadow:
                "0px 1px 2px rgba(0, 0, 0, 0.16), 0px 2px 4px rgba(0, 0, 0, 0.12), 0px 1px 8px rgba(0, 0, 0, 0.1)",
              ":hover": {
                backgroundColor: "#FF7A45",
                color: "#fff",
              },
            }}
            onClick={handleClickOpen}
          >
            Connect
          </Button>
        )}
        {isReady &&
          (walletConnecting ? (
            <section className={classes.connecting}>
              <Typography component="p" variant="h5">
                This app requires access to your wallet, <br />
                please login and authorize access to continue.
              </Typography>
            </section>
          ) : (
            <>
              <FormControl sx={{ my: 2, color: "#1D9A52" }} fullWidth>
                <InputLabel
                  id="homenetwork-select-label"
                  sx={{ color: "#1D9A52 !important" }}
                >
                  Home network
                </InputLabel>
                <Select
                  label="homenetwork"
                  value={homeConfig?.domainId ?? ""}
                  sx={{
                    borderRadius: "8px",
                    fontWeight: 700,
                    color: "#1D9A52",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#1D9A52 !important",
                      borderWidth: "2px",
                    },
                    "& .MuiSelect-iconOutlined": {
                      color: "#1D9A52",
                    },
                  }}
                >
                  <MenuItem value={homeConfig?.domainId ?? ""}>
                    {homeConfig?.name}
                  </MenuItem>
                </Select>
              </FormControl>
            </>
          ))}
      </div>
    </>
  );
}
