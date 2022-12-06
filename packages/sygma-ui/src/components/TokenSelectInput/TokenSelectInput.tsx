import React, { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";

import { Tokens } from "../../types";

interface ITokenSelectInput {
  className: any;
  label: any;
  name: any;
  tokens: Tokens;
  rules?: any;
  disabled: any;
  options: any;
  placeholder?: any;
  sync?: (value: string) => void;
  setValue?: any;
  control?: any;
}

const TokenSelectInput: React.FC<ITokenSelectInput> = (
  props: ITokenSelectInput
) => {
  const {
    className,
    label,
    name,
    tokens,
    sync,
    control,
    rules,
    disabled,
    options,
    setValue,
  } = props;
  const { field, fieldState } = useController({ name, control, rules });

  const labelParsed =
    field && tokens[field.value] ? " " : "Please select token";
  const balance = tokens[field.value] ? tokens[field.value]?.balance : " ";

  const [synced, setSynced] = useState();
  useEffect(() => {
    if (sync && field.value !== synced) {
      setSynced(field.value);
      if (field.value !== "") {
        sync(field.value);
      }
    }
    // eslint-disable-next-line
  }, [field]);

  useEffect(() => {
    // If there is only one token, auto select
    if (options.length === 1 && field.value === "") {
      setValue("token", options[0].address);
    }
  }, [tokens, setValue, field.value]);

  return (
    <Box>
      <Box>
        <FormControl disabled={disabled} fullWidth>
          <InputLabel
            id="token-select-label"
            sx={{
              color: "#FE5614 !important",
              "&.Mui-disabled": {
                color: "#FE5614",
                opacity: 0.4,
              },
            }}
          >
            Token
          </InputLabel>
          <Select {...field} label="token">
            {options.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText> </FormHelperText>
        </FormControl>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <FormControl fullWidth disabled={true}>
          <TextField
            size="small"
            disabled={true}
            fullWidth
            label="Balance"
            value={balance}
            color="primary"
            sx={{
              "& .MuiInputBase-input": {
                "-webkit-text-fill-color": "unset",
                textAlign: "center",
              },
            }}
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default TokenSelectInput;
