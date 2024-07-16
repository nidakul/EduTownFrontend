import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInceptor";
import { BASE_API_URL } from "../environment/environment";
import {  StudentCertificateResponse } from "../models/responses/studentCertificateResponse";
import { StudentGradesList, StudentGradesResponse } from "../models/responses/studentGradesResponse";
import { UserInformationResponse } from "../models/responses/studentInformationResponse";

class UserService {
    apiUrl = BASE_API_URL + "Users";

    getUserDetailById(userId: string) : Promise<AxiosResponse<UserInformationResponse, any>>{
        return axiosInstance.get<UserInformationResponse>(this.apiUrl + "/getStudentDetail/" + userId)
    } 
    getStudentCertificate(userId: string): Promise<AxiosResponse<StudentCertificateResponse,any>>{
        return axiosInstance.get<StudentCertificateResponse>(this.apiUrl + "/getStudentCertificate/" + userId)
    }

    getStudentGrades(userId: string): Promise<AxiosResponse<StudentGradesList,any>>{
        return axiosInstance.get<StudentGradesList>(this.apiUrl + "/getStudentGrades/" + userId)
    }
}

export default new UserService();

