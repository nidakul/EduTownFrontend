import { BASE_API_URL } from "../../environment/environment";
import axios from "axios";
import tokenService from "../services/tokenService";

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
});
axiosInstance.interceptors.request.use((config) => {
  const token = tokenService.getToken();
  config.headers.Authorization = "Bearer" + token;
  return config;
});

// axiosInstance.interceptors.response.use(
//   (response) => {
//     store.dispatch(removeRequest);
//     return response;
//   },
//   (error) => {
//     handleError(error);
//     store.dispatch(removeRequest());
//     return error;
//   }
// );

export default axiosInstance;