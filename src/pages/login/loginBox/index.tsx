import { IconButton, InputAdornment, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import CustomInput from "../../../components/inputBox";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomButton from "../../../components/buttons";
import { login, setToken } from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";

const loginButton = {
  borderRadius: "25px",
  height: "54px",
  color: "#0a0a0a",
  border: "1px solid black",
  "&:hover": { border: "1px solid black" },
};

const LoginBox = ({ setViewState }: { setViewState: any }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [felidValue, setFelidValue] = useState({
    email: "",
    emailError: false,
    emailErrorMsg: "",
    password: "",
    passwordError: false,
    passwordErrorMsg: "",
  });
  const [error, setError] = useState({
    state: false,
    massage: "",
  });

  const handleInputValue = (e: any) => {
    if (felidValue.emailError && e.target.name == "email") {
      setFelidValue((pre) => {
        return { ...pre, emailError: false, emailErrorMsg: "" };
      });
    }
    if (felidValue.passwordError && e.target.name == "password") {
      setFelidValue((pre) => {
        return { ...pre, passwordError: false, passwordErrorMsg: "" };
      });
    }
    if (error.state) {
      setError({
        state: false,
        massage: "",
      });
    }
    setFelidValue((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  const loginFunction = async () => {
    if (felidValue.email == "") {
      setFelidValue((pre) => {
        return {
          ...pre,
          emailError: true,
          emailErrorMsg: "You need to Enter Email",
        };
      });
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(felidValue.email)) {
      setFelidValue((pre) => {
        return {
          ...pre,
          emailError: true,
          emailErrorMsg: "You need to Enter valid Email",
        };
      });
      return;
    }
    if (felidValue.password == "") {
      setFelidValue((pre) => {
        return {
          ...pre,
          passwordError: true,
          passwordErrorMsg: "You need to Enter Password",
        };
      });
      return;
    }
    try {

      const body = {
        email:felidValue.email,
        password:felidValue.password
      }

      const {data} = await login(body);

      const { image:userImage, permissions:authorizedRout, role:userRole, ...userData } = data.admin;

      const userAllData = {
        authorizedRout:authorizedRout,
        userRole:userRole,
        userData:userData,
      }
      
      setToken(data.token);
      localStorage.setItem('user', JSON.stringify(userAllData));
      navigate("/")

    } catch (error) {
      setError({
        state: true,
        massage: "Login Failed",
      });
    }
  };
  console.log(felidValue);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: 5,
        gap: 3,
        width: "70%",
      }}
    >
      <Typography sx={{ fontSize: "2rem", fontWeight: 700 }}>
        Sign In
      </Typography>
      <CustomInput
        id={0}
        TextFieldName={"email"}
        labelText={"Enter Email Address"}
        TextFieldType={"text"}
        variant={"outlined"}
        value={felidValue.email}
        style={{
          height: "64px",
          "& .MuiOutlinedInput-root": { borderRadius: "35px" },
          "& .MuiOutlinedInput-input": {
            marginLeft: "10px",
          },
          "& .MuiInputBase-root": {
            backgroundColor: error.state ? "#FFEDED" : "#ffffff",
          },
        }}
        onchangeFunction={handleInputValue}
        errorTextState={felidValue.emailError}
        errorText={felidValue.emailErrorMsg}
      />
      <CustomInput
        id={1}
        TextFieldName={"password"}
        labelText={"Enter Password"}
        TextFieldType={showPassword ? "text" : "password"}
        variant={"outlined"}
        value={felidValue.password}
        style={{
          height: "64px",
          "& .MuiOutlinedInput-root": { borderRadius: "35px" },
          "& .MuiOutlinedInput-input": {
            marginLeft: "10px",
          },
          "& .MuiInputBase-root": {
            backgroundColor: error.state ? "#FFEDED" : "#ffffff",
          },
        }}
        onchangeFunction={handleInputValue}
        errorTextState={felidValue.passwordError}
        errorText={felidValue.passwordErrorMsg}
        endAdornment={
          <InputAdornment position="end" sx={{ marginRight: "10px" }}>
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                setShowPassword((show) => !show);
              }}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Typography
          sx={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => {
            setViewState("forgetPassword");
          }}
        >
          Forget Password
        </Typography>
      </div>
      {error.state ? (
        <Typography sx={{ color: "#ff2929", display: "block" }}>
          {error.massage}
        </Typography>
      ) : (
        <div style={{ height: "24px" }}></div>
      )}
      <CustomButton
        variant={"outlined"}
        buttonText={"Sign In"}
        id={0}
        buttonFunction={loginFunction}
        style={loginButton}
      />
    </Box>
  );
};

export default LoginBox;
