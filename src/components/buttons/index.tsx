import { Button } from "@mui/material";

const CustomButton = ({
  variant,
  buttonText,
  id,
  style,
  paramOne,
  paramTwo,
  disableState,
  buttonFunction,
}: {
  variant: "text" | "contained" | "outlined";
  buttonText: any;
  id: number;
  style?: any;
  paramOne?: any;
  paramTwo?: any;
  disableState?:boolean;
  buttonFunction: (paramOne?: any, paramTwo?: any) => void;
}) => {
  return (
    <>
      <Button
        key={id}
        sx={{ ...style }}
        variant={variant}
        disabled={disableState || false}
        onClick={() => {
          buttonFunction(paramOne, paramTwo);
        }}
      >
        {buttonText}
      </Button>
    </>
  );
};

export default CustomButton;
