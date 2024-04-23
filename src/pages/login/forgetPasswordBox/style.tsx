import { MuiOtpInput } from "mui-one-time-password-input";
import styled from "styled-components";

export const StyledOTPContainer = styled(MuiOtpInput)`
  display: flex;
  gap: 30px;
  margin-inline: auto;
  justify-content: center;
  margin-bottom: 10px;

  & .MuiOtpInput-Box {
    background-color: #09ff84;
  }

  & .MuiOtpInput-TextField {
    width: 50px;
    height: 50px;
  }
`;
