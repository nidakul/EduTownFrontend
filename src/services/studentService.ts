import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInceptor";
import { BASE_API_URL } from "../environment/environment";
import { AddStudent } from "../models/requests/addStudent";
import { StudentGradesResponse } from "../models/responses/studentGradesResponse";
import { StudentInformationList } from "../models/responses/studentInformationResponse";

class StudentService{
apiUrl = BASE_API_URL + "Students";

addStudent(userData: AddStudent ){
    return axiosInstance.post(this.apiUrl, userData)
}

getListStudentDetail( 
    pageIndex: number = 0,
    pageSize: number = 20 
){
    return axiosInstance.get<StudentInformationList>(
        (this.apiUrl + "/getListStudentDetail" + `?PageIndex=${pageIndex}&PageSize=${pageSize}`)
    )
}

getStudentGrades(studentId: string): Promise<AxiosResponse<StudentGradesResponse,any>>{
    return axiosInstance.get<StudentGradesResponse>(this.apiUrl + "/getStudentGrades/" + studentId)
}

}

export default new StudentService();  


