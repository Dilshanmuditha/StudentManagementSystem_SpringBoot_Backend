import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import logo from "../../assets/react.svg";
import { useState } from "react";
import LoginBox from "./loginBox";
import ForgetPassword from "./forgetPasswordBox";



const Login = () => {
  
  const [viewState, setViewState] = useState<"login" | "forgetPassword">(
    "login"
  );
  const mainViewFunction = (state: any) => {
    switch (state) {
      case "login":
        return <LoginBox setViewState={setViewState}/>
      case "forgetPassword":
        return <ForgetPassword setViewState={setViewState}/>
      default:
        return <LoginBox setViewState={setViewState}/>
    }
  };

  
  return (
    <div style={{ padding: "15px", height: "100vh" }}>
      <Box sx={{ height: "100%" }}>
        <Grid container sx={{ height: "100%" }}>
          <Grid
            sx={{
              backgroundColor: "#024D21",
              display: {
                xs: "none",
                sm: "none",
                md: "block",
                lg: "block",
              },
              borderRadius: "20px",
            }}
            item
            xs={0}
            sm={0}
            md={5}
            lg={5}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 2,
                height: "100%",
              }}
            >
              <img src={logo} alt="Logo" height={"130px"} width={"150px"} />
              <Typography sx={{ color: "#ffffff", fontSize: "2rem" }}>
                Student Management System
              </Typography>
            </Box>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            item
            xs={12}
            sm={12}
            md={7}
            lg={7}
          >
            {mainViewFunction(viewState)}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Login;
