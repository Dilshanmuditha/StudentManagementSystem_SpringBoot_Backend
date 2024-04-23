import { Box, Divider, Typography } from "@mui/material";
import CustomButton from "../../buttons";
import { useDispatch } from "react-redux";
import { addMessageModal } from "../../../features/messageModalSlice";

const LogOut = () => {
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(
          addMessageModal({
            modalState: false,
            modalComponentName: "",
          })
        );
      };
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          left: "40%",
          boxShadow: 24,
          borderRadius: 3,
          width: "700px",
          height: "auto",
          maxHeight: "300px",
          backgroundColor: "#ffffff",
          padding: 2,
        }}
      >
        <Box sx={{ paddingBottom: 2 }}>
          <Typography sx={{ fontSize: "2rem" }}>
            {"Logout"}
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            padding: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "1.5rem" }}>
            {"Are you want Logout"}
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            marginTop: "auto",
            padding: 3,
            display: "flex",
            gap: 3,
            justifyContent: "flex-end",
          }}
        >
          <CustomButton
            variant={"outlined"}
            buttonText={"Cancel"}
            id={0}
            buttonFunction={() => {
              handleClose();
            }}
          />
          <CustomButton
            variant={"contained"}
            buttonText={"Logout"}
            id={1}
            buttonFunction={() => {}}
          />
        </Box>
      </Box>
    </>
  );
};

export default LogOut;
