import React from "react";
import { CustomDrawer } from "../../components";
import { Button, Typography } from "@chainsafe/common-components";
import { useStyles } from "./styles";

interface AboutDrawerProps {
  open: boolean;
  close: () => void;
}

const AboutDrawer: React.FC<AboutDrawerProps> = ({
  open,
  close,
}: AboutDrawerProps) => {
  const classes = useStyles();

  return (
    <CustomDrawer onClose={close} open={open} className={classes.root}>
      <Typography variant="h1" component="h4">
        What is Sygma?
      </Typography>
      <Typography component="p" variant="h5">
        Sygma is a modular multi-directional blockchain bridge to allow data and
        value transfer between any number of blockchains. This should enable
        users to specify a destination blockchain from their source chain, and
        send data to that blockchain for consumption on the destination chain.{" "}
        <br />
        <br />
        This could be a token that is locked on ChainA and redeemed on ChainB,
        or an operation that is executed on a destination chain and initiated on
        the source chain.
      </Typography>
      <section className={classes.buttons}>
        <Button onClick={(): void => close()} variant="outline">
          OK
        </Button>
        <a
          rel="noopener noreferrer"
          href={process.env.REACT_APP_SUPPORT_URL}
          target="_blank"
        >
          <Button variant="outline">
            Ask a question on {process.env.REACT_APP_SUPPORT_SERVICE}
          </Button>
        </a>
      </section>
    </CustomDrawer>
  );
};

export default AboutDrawer;
