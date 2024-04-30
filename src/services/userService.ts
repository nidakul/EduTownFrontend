import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInceptor";
import { BASE_API_URL } from "../environment/environment";
import { StudentInformationResponse } from "../models/responses/studentInformationResponse";
import {  StudentCertificateResponse } from "../models/responses/studentCertificateResponse";
import { StudentGradesResponse } from "../models/responses/studentGradesResponse";

class UserService {
    getUserDetailById(userId: string) : Promise<AxiosResponse<StudentInformationResponse, any>>{
        return axiosInstance.get<StudentInformationResponse>(BASE_API_URL + "Users/" + "getStudentDetail/" + userId)
    }
    getStudentCertificate(userId: string): Promise<AxiosResponse<StudentCertificateResponse,any>>{
        return axiosInstance.get<StudentCertificateResponse>(BASE_API_URL + "Users/" + "getStudentCertificate/" + userId)
    }

    getStudentGrades(userId: string): Promise<AxiosResponse<StudentGradesResponse,any>>{
        return axiosInstance.get<StudentGradesResponse>(BASE_API_URL + "Users/" + "getStudentGrades/" + userId)
    }
}

export default new UserService();

