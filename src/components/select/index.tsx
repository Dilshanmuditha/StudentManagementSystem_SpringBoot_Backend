import { Autocomplete, TextField } from "@mui/material";
import  { useEffect, useState } from "react";

const CustomSelect = ({
  option,
  label,
  clearableState,
  value,
  style,
}: {
  option: { label: string; value: number | string }[];
  label: string;
  clearableState?: boolean;
  value: string|number|null
  style?: any;
}) => {
  const [autocompleteValue, setAutocompleteValue] = useState<string|null>(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if(value != "" && value != null){
      const selectedValue = option.find((data:any)=>data.value == value)?.label
      setAutocompleteValue(selectedValue || "");
    }
  }, [value])
  


  return (
    <>
      <Autocomplete
        disablePortal
        options={option || []}
        value={autocompleteValue}
        onChange={(_event: any, newValue: string | null) => {
            setAutocompleteValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(_event, newInputValue) => {
            setInputValue(newInputValue);
          }}
        getOptionLabel={(option:any) => option?.label}
        renderInput={(params) => (
          <TextField {...params} label={label || "Autocomplete"} />
        )}
        disableClearable={clearableState || false}
        sx={{ ...style }}
      />
    </>
  );
};

export default CustomSelect;
