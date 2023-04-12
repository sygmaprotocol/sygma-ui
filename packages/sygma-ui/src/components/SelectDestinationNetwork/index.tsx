import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
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
    <>
      <InputLabel
        id="select-destination-network-label"
        sx={{
          color: "#5D503C !important",
          display: "flex",
          flexDirection: "row",
          alignSelf: "flex-start",
          fontWeight: 500,
        }}
      >
        {label}
      </InputLabel>
      <FormControl sx={{ my: 2 }} fullWidth disabled={disabled}>
        <Select
          id="select-destination-network"
          onChange={handleChange}
          value={
            value !== undefined
              ? value.toString()
              : "Select destination network"
          }
          sx={{
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
          renderValue={(value) => {
            const optionFound = options.find(
              (option: { value: any }) => option.value === value
            );
            return optionFound?.label || value;
          }}
        >
          {options.map((option: { label: any; value: any }) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{ color: "#5D503C", fontWeight: 500 }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectDestinationNetwork;
