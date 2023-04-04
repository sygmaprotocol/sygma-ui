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
  const { name, tokens, sync, control, rules, disabled, options, setValue } =
    props;
  const { field } = useController({ name, control, rules });
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
        <InputLabel
          id="token-select-label"
          sx={{
            color: "#5D503C !important",
            display: "flex",
            flexDirection: "row",
            alignSelf: "flex-start",
            fontWeight: 500,
          }}
        >
          Token
        </InputLabel>
        <FormControl disabled={disabled} fullWidth>
          <Select
            {...field}
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
            {options.map((option: any) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{ color: "#5D503C", fontWeight: 500 }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText> </FormHelperText>
        </FormControl>
      </Box>
      <Box sx={{ flexGrow: 1, borderColor: "black !important" }}>
        <FormControl
          fullWidth
          disabled={true}
          sx={{ borderColor: "black !important" }}
        >
          <TextField
            size="small"
            disabled={true}
            fullWidth
            value={balance}
            sx={{
              fontWeight: 500,
              color: "#5D503C",
              borderColor: "black !important",
              borderWidth: "2px",
              "& .MuiInputBase-input": {
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
