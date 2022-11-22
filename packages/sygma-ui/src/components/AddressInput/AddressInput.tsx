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
            fontWeight: 700,
          }}
        />
      </>
      {sendToSameAccountHelper && (
        <FormGroup sx={{ my: 1 }}>
          <FormControlLabel
            sx={{
              marginRight: 0,
              justifyContent: "space-between",
            }}
            control={
              <Checkbox
                size="small"
                checked={stored !== undefined}
                onChange={() => toggleReceiver()}
                sx={{
                  marginLeft: "8px",
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
