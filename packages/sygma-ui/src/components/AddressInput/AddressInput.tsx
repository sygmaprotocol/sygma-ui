import React, { useCallback, useState } from "react";
import { useController } from "react-hook-form";
import FormControl from "@mui/material/FormControl";

import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";

interface IAddressInput {
  senderAddress: string;
  className?: any;
  placeholder: string;
  name: string;
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
  sendToSameAccountHelper = false,
  control,
  setValue,
  disabled,
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
          <Button
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              color: "#FF7A45",
              fontSize: "18px",
              fontWeight: 500,
              fontStyle: "normal",
              padding: "0px",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            onClick={() => toggleReceiver()}
          >
            Transfer to same address
          </Button>
        </FormGroup>
      )}
    </FormControl>
  );
};

export default AddressInput;
