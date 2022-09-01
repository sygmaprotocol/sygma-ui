import React, { useCallback, useState } from "react";
import { useController } from "react-hook-form";
import FormControl from "@mui/material/FormControl";

import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

interface IAddressInput {
  senderAddress: string;
  className?: any;
  placeholder: string;
  name: string;
  label: string;
  disabled: boolean;
  sendToSameAccountHelper?: boolean;
  control?: any;
  classNames?: any;
  setValue?: any;
}

const AddressInput: React.FC<IAddressInput> = ({
  senderAddress,
  placeholder,
  name,
  label,
  sendToSameAccountHelper = false,
  control,
  setValue,
  disabled,
  ...rest
}: IAddressInput) => {
  const { field, fieldState } = useController({ name, control });

  const [stored, setStored] = useState<string | undefined>();

  const toggleReceiver = useCallback(() => {
    if (stored === undefined) {
      setStored(field.value);
      setValue(name, senderAddress);
    } else {
      setValue(name, "");
      setStored(undefined);
    }
  }, [name, senderAddress, field, setStored, setValue]);

  return (
    <FormControl disabled={disabled} fullWidth>
      <>
        <TextField
          error={!!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : undefined}
          fullWidth
          {...field}
          label={label}
          placeholder={placeholder}
          disabled={Boolean(disabled && !stored)}
          multiline
          rows={2}
          sx={{
            borderRadius: "8px",
            fontWeight: 700,
            color: "#FE5614",
            "& .MuiInputLabel-root": {
              color: "#FE5614",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#FE5614 !important",
            },
            "& .MuiSelect-iconOutlined": {
              color: "#FE5614 !important",
            },
            "& .MuiInputBase-input": {
              color: "#FE5614",
              "-webkit-text-fill-color": "unset",
            },
            "& .Mui-disabled": {
              color: "#FE5614",
              opacity: 0.4,
            },
          }}
        />
      </>
      {sendToSameAccountHelper && (
        <FormGroup sx={{ my: 1 }}>
          <FormControlLabel
            sx={{
              marginRight: 0,
              color: "#FE5614",
              justifyContent: "space-between",
              "& .MuiFormControlLabel-label": {
                color: "#FE5614",
                fontSize: "14px",
                fontWeight: "700",
                textAlign: "right",
              },
              "& .MuiFormControlLabel-label.Mui-disabled": {
                color: "#FE5614",
                opacity: 0.4,
              },
            }}
            control={
              <Checkbox
                size="small"
                checked={stored !== undefined}
                onChange={() => toggleReceiver()}
                sx={{
                  borderRadius: "8px",
                  marginLeft: "8px",
                  fontWeight: 700,
                  color: "#FE5614",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FE5614 !important",
                  },
                  "& .MuiSelect-iconOutlined": {
                    color: "#FE5614 !important",
                  },
                  "& .MuiInputBase-input": {
                    color: "#FE5614",
                    "-webkit-text-fill-color": "unset",
                    textAlign: "center",
                  },
                  "&.Mui-disabled": {
                    color: "#FE5614",
                    opacity: 0.4,
                  },
                  "&.Mui-checked": {
                    color: "#FE5614",
                  },
                }}
              />
            }
            label="Send funds to my address"
          />
        </FormGroup>
      )}
    </FormControl>
  );
};

export default AddressInput;
