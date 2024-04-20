import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInceptor";
import { BASE_API_URL } from "../environment/environment";
import { StudentInformationResponse } from "../models/responses/studentInformationResponse";

class UserService {
    getUserDetailById(userId: string) : Promise<AxiosResponse<StudentInformationResponse, any>>{
        return axiosInstance.get<StudentInformationResponse>(BASE_API_URL + "Users/" + "getStudentDetail/" + userId)
    }
}

export default new UserService();

