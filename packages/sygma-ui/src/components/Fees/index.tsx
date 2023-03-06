import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface IFeesProps {
  className?: string;
  symbol?: string;
  fee?: number | string;
  feeSymbol?: string;
  amount?: string;
  showTransferAmount?: boolean;
}

const Fees: React.FC<IFeesProps> = ({
  symbol,
  fee,
  feeSymbol,
  amount,
  showTransferAmount,
}: IFeesProps) => {
  return (
    <Box sx={{ my: 2, fontSize: "16px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {fee !== undefined && feeSymbol !== undefined && (
          <>
            <Typography component="p" sx={{ fontWeight: "500" }}>
              Bridge Fee
            </Typography>
            <Typography
              component="p"
              sx={{
                fontWeight: "500",
                height: "18px",
                flexGrow: 1,
                textAlign: "right",
              }}
            >
              {Number(fee).toFixed(8)} {feeSymbol}
            </Typography>
          </>
        )}
      </Box>
      {showTransferAmount && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {symbol !== undefined && (
            <>
              <Typography
                component="p"
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Transfer Amount:
              </Typography>
              <Typography
                component="p"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  height: "18px",
                  flexGrow: 1,
                  textAlign: "right",
                  borderBottom: "1px solid rgba(255, 122, 69, 0.5)",
                }}
              >
                {(Number(amount) + Number(fee)).toFixed(2)} {symbol}
              </Typography>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Fees;
