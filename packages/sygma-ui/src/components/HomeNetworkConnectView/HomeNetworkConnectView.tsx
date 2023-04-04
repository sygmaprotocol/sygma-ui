import React from "react";
import { Button, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { BridgeConfig } from "../../sygmaConfig";

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

  const handleClickOpen = () => {
    dispatcher({ type: "setShowConnectionDialog", payload: true });
  };

  return (
    <>
      <div className={classes.walletArea}>
        {!isReady && (
          <Button
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              backgroundColor: "#FF7A45",
              color: "#000000",
              border: "2px solid #FF7A45",
              borderRadius: "8px",
              boxShadow:
                "0px 1px 2px rgba(0, 0, 0, 0.16), 0px 2px 4px rgba(0, 0, 0, 0.12), 0px 1px 8px rgba(0, 0, 0, 0.1)",
              ":hover": {
                backgroundColor: "#FF7A45",
                color: "#fff",
              },
              fontWeight: 500,
              fontStyle: "normal",
              fontSize: "20px",
              marginBottom: "15px",
            }}
            onClick={handleClickOpen}
          >
            Connect Wallelt to Start
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
              <InputLabel
                id="homenetwork-select-label"
                sx={{
                  color: "#5D503C !important",
                  display: "flex",
                  flexDirection: "row",
                  alignSelf: "flex-start",
                  fontWeight: 500,
                }}
              >
                Home Network
              </InputLabel>
              <FormControl sx={{ my: 2, color: "#1D9A52" }} fullWidth>
                <Select
                  value={homeConfig?.domainId ?? ""}
                  sx={{
                    borderRadius: "8px",
                    fontWeight: 500,
                    color: "#5D503C",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#CDC2B1 !important",
                      borderWidth: "2px",
                    },
                    "& .MuiSelect-iconOutlined": {
                      color: "#5D503C",
                    },
                  }}
                >
                  <MenuItem
                    value={homeConfig?.domainId ?? ""}
                    sx={{
                      backgroundColor: "white !important",
                      color: "#5D503C",
                      fontWeight: 500,
                    }}
                  >
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
