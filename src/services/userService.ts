import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInceptor";
import { BASE_API_URL } from "../environment/environment";
import {  StudentCertificateResponse } from "../models/responses/studentCertificateResponse";
import { UserInformationResponse } from "../models/responses/userInformationResponse";

class UserService {
    apiUrl = BASE_API_URL + "Users";

    getUserDetailById(userId: string) : Promise<AxiosResponse<UserInformationResponse, any>>{
        return axiosInstance.get<UserInformationResponse>(this.apiUrl + "/getStudentDetail/" + userId)
    } 
    getStudentCertificate(userId: string): Promise<AxiosResponse<StudentCertificateResponse,any>>{
        return axiosInstance.get<StudentCertificateResponse>(this.apiUrl + "/getStudentCertificate/" + userId)
    }
}

export default new UserService();

