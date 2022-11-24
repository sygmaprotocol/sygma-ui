import React from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface ISelectDestinationNetwork {
  disabled?: boolean;
  label?: string;
  options?: any;
  onChange?: any;
  value?: number;
}

export default function HomeNetworkSelect({
  disabled,
  label,
  value,
  options,
  onChange,
}: ISelectDestinationNetwork) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };
  return (
    <>
      <InputLabel
        color="secondary"
        sx={{
          fontWeight: 500,
          fontSize: 18,
          marginLeft: "4px",
        }}
      >
        {label}
      </InputLabel>
      <FormControl sx={{ my: 2, mt: 1 }} fullWidth disabled={disabled}>
        <Select
          IconComponent={KeyboardArrowDownRoundedIcon}
          color="secondary"
          onChange={handleChange}
          label={label}
          value={value !== undefined ? value.toString() : "-1"}
          sx={{
            fontWeight: 700,
            "&.disabled": {
              opacity: 0.4,
            },
          }}
        >
          <MenuItem disabled value="-1">
            <em>Select Network</em>
          </MenuItem>
          {options.map((option: { label: any; value: any }) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
