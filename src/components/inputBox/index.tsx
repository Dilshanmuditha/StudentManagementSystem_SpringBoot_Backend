import { TextField } from "@mui/material";

const CustomInput = ({
  id,
  TextFieldName,
  labelText,
  variant,
  TextFieldType,
  value,
  onchangeFunction,
  errorTextState,
  errorText,
  style,
  startAdornment,
  endAdornment,
}: {
  id: number;
  TextFieldName: string;
  labelText: string;
  TextFieldType: string
  variant: "outlined" | "filled" | "standard";
  value?: any;
  onchangeFunction:any
  errorTextState: boolean;
  errorText: string;
  style?: any;
  startAdornment?: any;
  endAdornment?: any;
}) => {

  return (
    <>
      <TextField
        key={id}
        name={TextFieldName}
        label={labelText}
        variant={variant}
        value={value}
        type={TextFieldType}
        error={errorTextState}
        helperText={errorText}
        sx={{ ...style}}
        InputProps={{
          startAdornment: startAdornment ? (startAdornment) : null,
          endAdornment: endAdornment ? (endAdornment):null,
        }}
        onChange={onchangeFunction}
      />
    </>
  );
};

export default CustomInput;
