import React from "react";
import { CustomDrawer } from "../../components";
import Typography from "@mui/material/Typography";
import { ButtonUnstyled } from "@mui/material";
import { useStyles } from "./styles";

interface IAboutDrawerProps {
  open: boolean;
  close: () => void;
}

const AboutDrawer: React.FC<IAboutDrawerProps> = ({
  open,
  close,
}: IAboutDrawerProps) => {
  const { classes } = useStyles();

  return (
    <CustomDrawer onClose={close} open={open} className={classes.root}>
      <Typography variant="h1" component="h4" className={classes.title}>
        What is Sygma?
      </Typography>
      <Typography component="p" variant="h5" className={classes.paragraph}>
        Sygma is an interoperability layer for building cross-blockchain
        applications.This should enable users to specify a destination
        blockchain from their source chain, and send data to that blockchain for
        consumption on the destination chain. <br />
        <br />
        This could be a token that is locked on ChainA and redeemed on ChainB,
        or an operation that is executed on a destination chain and initiated on
        the source chain.
      </Typography>
      <section className={classes.buttons}>
        <ButtonUnstyled onClick={() => close()}>OK</ButtonUnstyled>
        <a
          rel="noopener noreferrer"
          href={process.env.REACT_APP_SUPPORT_URL}
          target="_blank"
        >
          <ButtonUnstyled>
            Ask a question on {process.env.REACT_APP_SUPPORT_SERVICE}
          </ButtonUnstyled>
        </a>
      </section>
    </CustomDrawer>
  );
};

export default AboutDrawer;
