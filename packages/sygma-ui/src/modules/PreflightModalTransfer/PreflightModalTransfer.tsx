import React from "react";
import { CustomDrawer } from "../../components";
import Typography from "@mui/material/Typography";
import { Button, ButtonUnstyled } from "@mui/material";
import { shortenAddress } from "../../utils/Helpers";
import { useStyles } from "./styles";

interface IPreflightModalTransferProps {
  open: boolean;
  close: () => void;
  sender: string;
  receiver: string;
  value: string;
  tokenSymbol: string;
  sourceNetwork: string;
  targetNetwork: string;
  start: () => void;
}

const PreflightModalTransfer: React.FC<IPreflightModalTransferProps> = ({
  open,
  close,
  receiver,
  sender,
  sourceNetwork,
  targetNetwork,
  tokenSymbol,
  value,
  start,
}: IPreflightModalTransferProps) => {
  const { classes } = useStyles();

  return (
    <CustomDrawer
      className={classes.root}
      classNames={{
        backdrop: classes.backdrop,
      }}
      size={430}
      open={open}
    >
      <Typography variant="h3" component="h2" className={classes.title}>
        Pre-flight check
      </Typography>
      <Typography className={classes.subtitle} variant="h5" component="p">
        Please be advised this is an experimental application:
      </Typography>
      <ul className={classes.list}>
        <li>
          <Typography variant="body1" component="span">
            You will not be able to cancel the transaction once you submit it.
          </Typography>
        </li>
        <li>
          <Typography variant="body1" component="span">
            Your transaction could get stuck for an indefinite amount of time
          </Typography>
        </li>
        <li>
          <Typography variant="body1" component="span">
            Funds cannot be returned if they are sent to the wrong address.
          </Typography>
        </li>
        <li>
          <Typography variant="body1" component="span">
            The transaction fee may be higher than expected.
          </Typography>
        </li>
      </ul>
      <Typography className={classes.agreement} variant="h6" component="p">
        I agree and want to send{" "}
        <strong>
          {value} {tokenSymbol}
        </strong>{" "}
        from&nbsp;
        <strong>{shortenAddress(sender)}</strong> on{" "}
        <strong>{sourceNetwork}</strong> to&nbsp;
        <strong>{shortenAddress(receiver)}</strong> on{" "}
        <strong>{targetNetwork}</strong>.
      </Typography>
      <div className={classes.buttonContainer}>
        <Button onClick={start} className={classes.startButton} size="large">
          Start Transfer
        </Button>
        <ButtonUnstyled onClick={close} className={classes.buttonBack}>
          Back
        </ButtonUnstyled>
      </div>
    </CustomDrawer>
  );
};

export default PreflightModalTransfer;
