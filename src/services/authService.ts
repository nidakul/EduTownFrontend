import axiosInstance from "../core/interceptors/axiosInceptor";
import { BASE_API_URL } from "../environment/environment";
import { LoginRequest } from "../models/requests/loginRequest";

class AuthService {
  login(userData: LoginRequest) {
    return axiosInstance
      .post(BASE_API_URL + "Auth/Login", userData)
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }
}

export default new AuthService();
