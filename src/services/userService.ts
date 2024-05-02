import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInceptor";
import { BASE_API_URL } from "../environment/environment";
import { StudentInformationResponse } from "../models/responses/studentInformationResponse";
import {  StudentCertificateResponse } from "../models/responses/studentCertificateResponse";
import { StudentGradesResponse } from "../models/responses/studentGradesResponse";

class UserService {
    apiUrl = BASE_API_URL + "Users";

    getUserDetailById(userId: string) : Promise<AxiosResponse<StudentInformationResponse, any>>{
        return axiosInstance.get<StudentInformationResponse>(this.apiUrl + "/getStudentDetail/" + userId)
    }
    getStudentCertificate(userId: string): Promise<AxiosResponse<StudentCertificateResponse,any>>{
        return axiosInstance.get<StudentCertificateResponse>(this.apiUrl + "/getStudentCertificate/" + userId)
    }

    getStudentGrades(userId: string): Promise<AxiosResponse<StudentGradesResponse,any>>{
        return axiosInstance.get<StudentGradesResponse>(this.apiUrl + "/getStudentGrades/" + userId)
    }
}

export default new UserService();

