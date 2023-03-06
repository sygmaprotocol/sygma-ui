import React from "react";

import { TransitState } from "../../reducers";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function InTransitBody({
  classes,
  inTransitMessages,
}: {
  classes: any;
  inTransitMessages?: TransitState;
}) {
  return (
    <>
      <Box sx={{ my: 2 }}>
        {inTransitMessages &&
          inTransitMessages.transitMessage.map((m, i) => {
            if (typeof m === "string") {
              return (
                <Typography className={classes.vote} component="p" key={i}>
                  {m}
                </Typography>
              );
            } else if (typeof m === "object" && m.message !== undefined) {
              return (
                <Typography className={classes.vote} component="p" key={i}>
                  {m.message}
                </Typography>
              );
            } else {
              return (
                <Typography className={classes.vote} component="p" key={i}>
                  <span>Vote casted by {m.address}</span>
                  <span>{m.signed}</span>
                </Typography>
              );
            }
          })}
        <Typography className={classes.warningMsg} sx={{ mt: 3, mb: 4 }}>
          This should take a few minutes. <br />
          Please do not refresh or leave the page.
        </Typography>
      </Box>
    </>
  );
}
