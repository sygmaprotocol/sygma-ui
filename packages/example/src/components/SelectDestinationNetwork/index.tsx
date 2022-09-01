import React, { useEffect, useState } from "react";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface ISelectDestinationNetwork {
  disabled?: boolean;
  label?: string;
  options?: any;
  onChange?: any;
  value?: number;
}

const SelectDestinationNetwork: React.FC<ISelectDestinationNetwork> = ({
  disabled,
  label,
  options,
  onChange,
  value,
}: ISelectDestinationNetwork) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };
  return (
    <FormControl sx={{ my: 2 }} fullWidth disabled={disabled}>
      <InputLabel
        id="select-destination-network-label"
        sx={{
          color: "#FE5614 !important",
          "&.Mui-disabled": {
            color: "#FE5614",
            opacity: 0.4,
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId="select-destination-network-label"
        id="select-destination-network"
        onChange={handleChange}
        label={label}
        value={value !== undefined ? value.toString() : ""}
        sx={{
          borderRadius: "8px",
          fontWeight: 700,
          color: "#FE5614",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FE5614 !important",
            borderWidth: "2px",
          },
          "& .MuiSelect-iconOutlined": {
            color: "#FE5614 !important",
          },
          "&.Mui-disabled": {
            color: "#FE5614",
            opacity: 0.4,
          },
          "& .Mui-disabled": {
            color: "#FE5614",
            opacity: 0.4,
          },
        }}
      >
        {options.map((option: { label: any; value: any }) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectDestinationNetwork;
