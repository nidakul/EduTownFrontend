import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInceptor";
import { BASE_API_URL } from "../environment/environment";
import { UserInformationResponse } from "../models/responses/userInformationResponse";

class UserService {
    getUserDetailById(userId: string) : Promise<AxiosResponse<UserInformationResponse, any>>{
        return axiosInstance.get<UserInformationResponse>(BASE_API_URL + "Users/" + userId)
    }
}

export default new UserService();

