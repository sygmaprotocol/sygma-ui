import React, { useCallback, useState } from "react";
import { useController } from "react-hook-form";
import FormControl from "@mui/material/FormControl";

import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
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
  // console.log("🚀 ~ file: index.tsx ~ line 36 ~ disabled", disabled)
  const { field, fieldState } = useController({ name, control });

  const [stored, setStored] = useState<string | undefined>();
  // console.log("🚀 ~ file: index.tsx ~ line 40 ~ stored", stored)

  const toggleReceiver = useCallback(() => {
    if (stored === undefined) {
      setStored(field.value);
      setValue(name, senderAddress);
    } else {
      setValue(name, "");
      setStored(undefined);
    }
  }, [name, senderAddress, field, setStored, setValue]);
  console.log("disabled && !stored", disabled, !stored);
  return (
    <Grid container spacing={2}>
      <Grid item xs={7}>
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
          <TextField
            color="secondary"
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : undefined}
            fullWidth
            {...field}
            placeholder={placeholder}
            disabled={Boolean(disabled && !stored)}
            sx={{
              fontWeight: 700,
            }}
          />
        </FormControl>
      </Grid>
      <Grid
        item
        xs={5}
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <Button
          size="large"
          variant="contained"
          color="secondary"
          onClick={() => toggleReceiver()}
          sx={{
            marginLeft: "8px",
            fontWeight: 500,
            mb: 3,
          }}
        >
          Send funds to my address
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddressInput;
