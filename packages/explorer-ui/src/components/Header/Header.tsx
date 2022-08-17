import React from "react";
import clsx from "clsx";
// import { Typography } from "@chainsafe/common-components";
import Typography from "@mui/material/Typography";
import { Switch, NavLink, Link } from "react-router-dom";

import { shortenAddress } from "../../utils/Helpers";
import { useSygma } from "@chainsafe/sygma-ui-core";
import { useStyles } from "./styles";

interface IAppHeader {}

const AppHeader: React.FC<IAppHeader> = () => {
  const classes = useStyles();
  const { homeConfig, isReady, address } = useSygma();

  const { __RUNTIME_CONFIG__ } = window;

  const indexerEnabled = "INDEXER_URL" in __RUNTIME_CONFIG__;

  return (
    <header className={clsx(classes.root)}>
      <div className={classes.left}>
        {/* ADD LOGO HERE */}
        {/* <div className={classes.logo}>
        </div> */}
        <div className={classes.mainTitle}>
          <Typography variant="h5">Sygma Explorer</Typography>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
