import React from "react";
import { useController } from "react-hook-form";
import { Tokens } from "../../types";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

interface ITokenInput {
  disabled?: boolean;
  name: string;
  tokens: Tokens;
  tokenSelectorKey: string;
  classNames?: {
    input?: string;
    button?: string;
  };
  setValue?: any;
  control?: any;
}

const TokenInput: React.FC<ITokenInput> = ({
  classNames,
  disabled,
  tokens,
  tokenSelectorKey,
  name,
  setValue,
  control,
}: ITokenInput) => {
  const { field, fieldState } = useController({ name, control });
  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        sx={{
          borderRadius: "8px",
          fontWeight: 500,
          color: "#5D503C",
          borderColor: "#CDC2B1 !important",
        }}
        disabled={disabled}
        error={!!fieldState.error}
        fullWidth
        helperText={fieldState.error ? fieldState.error.message : undefined}
        className={classNames?.input}
        {...field}
        InputProps={{
          endAdornment: (
            <Button
              disabled={disabled || !tokens[tokenSelectorKey]}
              className={classNames?.button}
              onClick={() => {
                setValue(name, tokens[tokenSelectorKey].balance);
              }}
              variant="contained"
              color="primary"
              type="button"
              sx={{
                color: "black !important",
                border: "unset !important",
                backgroundColor: "#CDC2B1",
              }}
            >
              MAX
            </Button>
          ),
        }}
      />
    </Box>
  );
};

export default TokenInput;
