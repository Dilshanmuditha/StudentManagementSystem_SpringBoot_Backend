import {
  CircularProgress,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import CustomInput from "../../../components/inputBox";
import CustomButton from "../../../components/buttons";
import { StyledOTPContainer } from "./style";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getOTP, resetPassword, verifyOtp } from "../../../services/AuthService";

const buttonStyle = {
  borderRadius: "25px",
  height: "54px",
  color: "#0a0a0a",
  border: "1px solid black",
  "&:hover": { border: "1px solid black" },
};

const ForgetPassword = ({ setViewState }: { setViewState: any }) => {
  const [forgetPasswordFelids, setForgetPasswordFelids] = useState({
    email: "",
    emailError: false,
    emailErrorMsg: "",
    passwordOne: "",
    passwordOneError: false,
    passwordOneErrorMsg: "",
    passwordTwo: "",
    passwordTwoError: false,
    passwordTwoErrorMsg: "",
  });
  const [forgetPageViewState, setForgetPageViewState] =
    useState<string>("forgetView");
  const [OTPNumber, setOTPNumber] = useState("");
  const [OTPToken, setOTPToken] = useState("");
  const [resendTimer, setResendTimer] = useState(120);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    state: false,
    color: "#ff2929",
    message: "",
  });
  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);

  const sendCodeFunction = async () => {
    if (forgetPasswordFelids.email == "") {
      setForgetPasswordFelids((pre) => {
        return {
          ...pre,
          emailError: true,
          emailErrorMsg: "You need to Enter Email",
        };
      });
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgetPasswordFelids.email)) {
      setForgetPasswordFelids((pre) => {
        return {
          ...pre,
          emailError: true,
          emailErrorMsg: "You need to Enter valid Email",
        };
      });
      return;
    }

    try {
      setLoading(true);
      const body = { email: forgetPasswordFelids.email };
      const {
        data: { token },
      } = await getOTP(body);
      setOTPToken(token);
      setLoading(false);
      setForgetPageViewState("OTPView");
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      setError({
        state: true,
        color: "#ff2929",
        message:
          error?.response?.data?.error ||
          "Something is wrong Please Try Again later",
      });
    }
  };

  const verifyOTPFunction = async () => {
    if (OTPNumber.length != 4) {
      setError({
        state: true,
        color: "#ff2929",
        message: "You have to Enter the Valid OTP",
      });
      return;
    }

    try {
      setLoading(true);
      const body = { otp: OTPNumber };
      const {
        data: { token },
      } = await verifyOtp(body, OTPToken);
      setOTPToken(token);
      setLoading(false);
      setForgetPageViewState("ResetView");
    } catch (error: any) {
      setLoading(false);
      setError({
        state: true,
        color: "#ff2929",
        message:
          error?.response?.data?.error ||
          "Something is wrong Please Try Again later",
      });
    }

  };

  const resendOTPFunction = async () => {
    setResendTimer(120);
    setIsResendDisabled(true);
    try {
      const body = { email: forgetPasswordFelids.email };
      const {
        data: { token },
      } = await getOTP(body);
      setOTPToken(token);
    } catch (error: any) {
      setError({
        state: true,
        color: "#ff2929",
        message:
          error?.response?.data?.error ||
          "Something is wrong Please Try Again later",
      });
    }
  };

  const resetPasswordFunction = async () => {
    if(forgetPasswordFelids.passwordOne == ""){
      setForgetPasswordFelids((pre) => {
        return {
          ...pre,
          passwordOneError: true,
          passwordOneErrorMsg: "You need to Enter Password",
        };
      });
      return;
    }else if(!(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{8,}$/.test(forgetPasswordFelids.passwordOne))){
      setError({
        state: true,
        color: "#ff2929",
        message:"Your password must contain a minimum of 8 characters, have a uppercase and lowercase letters, a number and a special character. Spaces are not permitted."
      });
      return;
    }
    if(forgetPasswordFelids.passwordTwo == ""){
      setForgetPasswordFelids((pre) => {
        return {
          ...pre,
          passwordTwoError: true,
          passwordTwoErrorMsg: "You need to Enter Password",
        };
      });
      return;
    }
    if(forgetPasswordFelids.passwordOne != forgetPasswordFelids.passwordTwo){
      setError({
        state: true,
        color: "#ff2929",
        message:"Password Is Not Match"
      });
      return
    }

    try {
      setLoading(true);
      const body = {password:forgetPasswordFelids.passwordOne}
      const {data:{message}} = await resetPassword(body,OTPToken);
      setError({
        state: true,
        color: "#024D21",
        message:message,
      });
      setLoading(false);
      setTimeout(() => {
        setViewState("login");
      }, 1000);
    } catch (error:any) {
      setLoading(false);
      setError({
        state: true,
        color: "#ff2929",
        message:
          error?.response?.data?.error ||
          "Something is wrong Please Try Again later",
      });
    }
  };

  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  const mainViewFunction = (state: any) => {
    switch (state) {
      case "forgetView":
        return (
          <>
            <Typography sx={{ fontSize: "2rem", fontWeight: 700 }}>
              Forgot Password
            </Typography>
            <Typography>
              Please enter your email address to receive a code to reset your
              account password.
            </Typography>
            <CustomInput
              id={0}
              TextFieldName={"email"}
              labelText={"Enter Email Address"}
              TextFieldType={"email"}
              variant={"outlined"}
              value={forgetPasswordFelids.email}
              onchangeFunction={(e: any) => {
                setError({
                  state: false,
                  color: "#ff2929",
                  message: "",
                });
                setForgetPasswordFelids((pre) => {
                  return {
                    ...pre,
                    email: e.target.value,
                    emailError: false,
                    emailErrorMsg: "",
                  };
                });
              }}
              errorTextState={forgetPasswordFelids.emailError}
              errorText={forgetPasswordFelids.emailErrorMsg}
              style={{
                height: "64px",
                "& .MuiOutlinedInput-root": { borderRadius: "35px" },
                "& .MuiOutlinedInput-input": {
                  marginLeft: "10px",
                },
                "& .MuiInputBase-root": {
                  backgroundColor: "#ffffff",
                },
              }}
            />
            {error.state ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Typography sx={{ color: error.color, display: "block" }}>
                  {error.message}
                </Typography>
              </div>
            ) : (
              <div style={{ height: "24px" }}></div>
            )}
            <CustomButton
              variant={"outlined"}
              buttonText={loading ? <CircularProgress /> : "Send Code"}
              id={0}
              buttonFunction={sendCodeFunction}
              disableState={loading ? true : false}
              style={buttonStyle}
            />
          </>
        );
      case "OTPView":
        return (
          <>
            <Typography sx={{ fontSize: "2rem", fontWeight: 700 }}>
              Enter OTP Code
            </Typography>
            <Typography>
              {`Enter the 4-digit that we have sent via the
            E-mail ${forgetPasswordFelids.email || "xxxxxxxx@xxxx.com"}`}
            </Typography>
            <Typography>Didn't receive the code yet?</Typography>
            <div
              style={{
                marginTop: "-20px",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {isResendDisabled ? (
                <span>{formatTime(resendTimer)}</span>
              ) : (
                <Typography
                  sx={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => {
                    resendOTPFunction();
                  }}
                >{`Resend the Code`}</Typography>
              )}
            </div>
            <div>
              <StyledOTPContainer
                value={OTPNumber}
                onChange={(e) => {
                  setError({
                    state: false,
                    color: "#ff2929",
                    message: "",
                  });
                  setOTPNumber(e);
                }}
                length={4}
                autoFocus
                // onComplete={(e) => {}}
              />
            </div>
            {error.state ? (
              <Typography sx={{ color: error.color, display: "block" }}>
                {error.message}
              </Typography>
            ) : (
              <div style={{ height: "24px" }}></div>
            )}
            <CustomButton
              variant={"outlined"}
              buttonText={loading ? <CircularProgress /> : "Verify"}
              id={1}
              buttonFunction={verifyOTPFunction}
              disableState={loading ? true : false}
              style={buttonStyle}
            />
          </>
        );
      case "ResetView":
        return (
          <>
            <Typography sx={{ fontSize: "2rem", fontWeight: 700 }}>
              Reset Password
            </Typography>
            <Typography>
              Please enter a new password to reset your password
            </Typography>
            <CustomInput
              id={1}
              TextFieldName={"password"}
              labelText={"Enter New Password"}
              TextFieldType={showPasswordOne ? "text" : "password"}
              variant={"outlined"}
              value={forgetPasswordFelids.passwordOne}
              style={{
                height: "64px",
                "& .MuiOutlinedInput-root": { borderRadius: "35px" },
                "& .MuiOutlinedInput-input": {
                  marginLeft: "10px",
                },
                "& .MuiInputBase-root": {
                  backgroundColor: "#ffffff",
                },
              }}
              onchangeFunction={(e: any) => {
                setError({
                  state: false,
                  color: "#ff2929",
                  message: "",
                });
                setForgetPasswordFelids((pre) => {
                  return { ...pre, passwordOne: e.target.value,passwordOneError:false,passwordOneErrorMsg:"" };
                });
              }}
              errorTextState={forgetPasswordFelids.passwordOneError}
              errorText={forgetPasswordFelids.passwordOneErrorMsg}
              endAdornment={
                <InputAdornment position="end" sx={{ marginRight: "10px" }}>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPasswordOne((show) => !show);
                    }}
                    edge="end"
                  >
                    {showPasswordOne ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <CustomInput
              id={2}
              TextFieldName={"password"}
              labelText={"Confirm Password"}
              TextFieldType={showPasswordTwo ? "text" : "password"}
              variant={"outlined"}
              value={forgetPasswordFelids.passwordTwo}
              style={{
                height: "64px",
                "& .MuiOutlinedInput-root": { borderRadius: "35px" },
                "& .MuiOutlinedInput-input": {
                  marginLeft: "10px",
                },
                "& .MuiInputBase-root": {
                  backgroundColor: "#ffffff",
                },
              }}
              onchangeFunction={(e: any) => {
                setError({
                  state: false,
                  color: "#ff2929",
                  message: "",
                });
                setForgetPasswordFelids((pre) => {
                  return { ...pre, passwordTwo: e.target.value,passwordTwoError:false,passwordTwoErrorMsg:"" };
                });
              }}
              errorTextState={forgetPasswordFelids.passwordTwoError}
              errorText={forgetPasswordFelids.passwordTwoErrorMsg}
              endAdornment={
                <InputAdornment position="end" sx={{ marginRight: "10px" }}>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPasswordTwo((show) => !show);
                    }}
                    edge="end"
                  >
                    {showPasswordTwo ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {error.state ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                <Typography sx={{ color: error.color, display: "block" }}>
                  {error.message}
                </Typography>
              </div>
            ) : (
              <div style={{ height: "30px" }}></div>
            )}
            <CustomButton
              variant={"outlined"}
              buttonText={loading ? <CircularProgress /> : "Reset Password"}
              id={2}
              buttonFunction={resetPasswordFunction}
              disableState={loading ? true : false}
              style={buttonStyle}
            />
          </>
        );

      default:
        break;
    }
  };

  useEffect(() => {
    let countdownInterval: any;

    if (resendTimer > 0 && isResendDisabled) {
      countdownInterval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [resendTimer, isResendDisabled]);

  useEffect(() => {
    if (forgetPageViewState === "OTPView") {
      setIsResendDisabled(true);
      setResendTimer(120);
    } else {
      setResendTimer(0);
    }
  }, [forgetPageViewState]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: 5,
        gap: 3,
        width: "70%",
        // backgroundColor: "#ac0f0f",
      }}
    >
      {mainViewFunction(forgetPageViewState)}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          sx={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => {
            setViewState("login");
          }}
        >
          Back to Log In
        </Typography>
      </div>
    </Box>
  );
};

export default ForgetPassword;
