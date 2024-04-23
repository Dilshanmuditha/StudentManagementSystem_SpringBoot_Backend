// import axios from "axios";
// const BASE_URL = import.meta.env.VITE_BASE_URL;
// import { getTokens, setToken, } from "./AuthService";

// let refreshFlag = true;


// const AXIOS_INSTANCE = axios.create({
//   baseURL: BASE_URL,
// });

// const requestHandler = (request:any) => {
//   const TOKENS = getTokens();

//   if (TOKENS && !request.headers.Authorization) {
//     request.headers.Authorization = TOKENS
//       ? "Bearer " + TOKENS.AccessToken
//       : null;
//   }

//   return request;
// };

// const responseHandler = (response:any) => {
//   return response;
// };

// const errorHandler = async (error:any) => {
//   const TOKENS = getTokens();
//   const originalConfig = error.config;
  

//   // if (originalConfig.url !== BASE_URL + "/login/refresh" && error.response) {
//   //   // Access Token was expired
//   //   if (error.response.status === 401 && !originalConfig._retry && refreshFlag) {
//   //     originalConfig._retry = true;
//   //     refreshFlag = false;

//   //     try {
//   //       const rs = await axios.post(BASE_URL + "/login/refresh", {
//   //         RefreshToken: TOKENS ? TOKENS.RefreshToken : null,
//   //       });
//   //       setTokens(JSON.stringify(rs.data));
//   //       AXIOS_INSTANCE.defaults.headers['Authorization'] =
//   //         'Bearer ' + rs.data.AccessToken;
//   //       originalConfig.headers["Authorization"] =
//   //         "Bearer " + rs.data.AccessToken;

//   //         refreshFlag = true;
//   //       return AXIOS_INSTANCE(originalConfig);
//   //     } catch (_error) {
//   //       refreshFlag = true;
//   //       logout();
//   //       return Promise.reject(_error);
//   //     }
//   //   }
//   // } else if (originalConfig.url === BASE_URL + "/login/refresh") {
//   //   logout();
//   // }
//   return Promise.reject(error);
// };

// AXIOS_INSTANCE.interceptors.request.use(
//   (request) => requestHandler(request),
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// AXIOS_INSTANCE.interceptors.response.use(
//   (response) => responseHandler(response),
//   (error) => errorHandler(error)
// );

// export default AXIOS_INSTANCE;
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;


const AXIOS_INSTANCE = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

const requestHandler = (request:any) => {
  return request;
};

const responseHandler = (response:any) => {
  return response;
};

const errorHandler = async (error:any) => {
const originalConfig = error.config;
  if (error.response) {
    // Access Token was expired
    if (error.response.status === 401 && !originalConfig._retry) {
        console.log("test");
        // logout();
    }
  }
  return Promise.reject(error);
};

AXIOS_INSTANCE.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => {
    return Promise.reject(error);
  }
);

AXIOS_INSTANCE.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default AXIOS_INSTANCE;