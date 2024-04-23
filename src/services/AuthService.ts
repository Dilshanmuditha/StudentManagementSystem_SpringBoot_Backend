import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const VERSION = import.meta.env.VITE_APP_VERSION;

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  return axios.post(`${BASE_URL}/backend/${VERSION}/auth/signIn`, credentials,{
    withCredentials: true,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
  });
};

export const adminRegister = async (credentials: {
  name: string;
  email: string;
  password: string;
}) => {
  console.log(credentials)
  return axios.post(`${BASE_URL}/${VERSION}/admin`, credentials,{
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
  });
};

export const getOTP = async (body: { email: string }) => {
  return axios.post(
    `${BASE_URL}/backend/${VERSION}/auth/passwordReset/getOtp`,
    body
  );
};

export const verifyOtp = async (body: { otp: string },token:string) => {
  return axios.post(
    `${BASE_URL}/backend/${VERSION}/auth/passwordReset/verifyOtp`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const resetPassword = async (body: { password: string },token:string) => {
  return axios.post(
    `${BASE_URL}/backend/${VERSION}/auth/passwordReset/passwordReset`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const isAuthenticated = () => {
  return localStorage.getItem("user") ? true : true;
};

export const getTokens = () => {
  const userString = localStorage.getItem("USER");
  return userString ? JSON.parse(userString) : null;
};

export const setToken = (tokens: string) => {
  sessionStorage.setItem("token", tokens);
};
