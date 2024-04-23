import { useState } from "react";
import CustomButton from "../../components/buttons";
import CustomInput from "../../components/inputBox";
import { adminRegister } from "../../services/AuthService";
import { IconButton, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Users = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    state: false,
    massage: "",
  });
  const [felidValue, setFelidValue] = useState({
    name: "",
    nameError: false,
    nameErrorMsg: "",
    email: "",
    emailError: false,
    emailErrorMsg: "",
    password: "",
    passwordError: false,
    passwordErrorMsg: "",
  });
  const handleInputValue = (e: any) => {
    if (felidValue.nameError && e.target.name == "name") {
      setFelidValue((pre) => {
        return { ...pre, nameError: false, nameErrorMsg: "" };
      });
    }
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
  const adminRegisterFunction = async () => {
    if (felidValue.name == "") {
      setFelidValue((pre) => {
        return {
          ...pre,
          nameError: true,
          nameErrorMsg: "You need to Enter Name",
        };
      });
      return;
    }
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
        name: felidValue.name,
        email: felidValue.email,
        password: felidValue.password,
      };
      console.log(body);
      const { data } = await adminRegister(body);

      console.log("response", data);

      // setToken(data.token);
      // localStorage.setItem('user', JSON.stringify(userAllData));
      navigate("/")
    } catch (error) {
      setError({
        state: true,
        massage: "Registration Failed",
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        gap: 50,
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "28px", color: "#024D81" }}>Admin Register</h1>
      <CustomInput
        id={1}
        TextFieldName={"name"}
        labelText={"Enter your name"}
        TextFieldType={"text"}
        variant={"outlined"}
        onchangeFunction={handleInputValue}
        errorTextState={felidValue.nameError}
        errorText={felidValue.nameErrorMsg}
        value={felidValue.name}
        style={{ width: "750px" }}
      />
      <CustomInput
        id={2}
        TextFieldName={"email"}
        labelText={"Enter your email"}
        TextFieldType={"text"}
        variant={"outlined"}
        onchangeFunction={handleInputValue}
        errorTextState={felidValue.emailError}
        errorText={felidValue.emailErrorMsg}
        value={felidValue.email}
        style={{ width: "750px" }}
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
          width: "750px",
          "& .MuiOutlinedInput-root": {  },
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

      <CustomButton
        variant={"contained"}
        buttonText={"Register"}
        id={5}
        buttonFunction={adminRegisterFunction}
      />
    </div>
  );
};

export default Users;
