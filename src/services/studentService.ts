import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInceptor";
import { BASE_API_URL } from "../environment/environment";
import { AddStudent } from "../models/requests/addStudent";
import { UserInformationList } from "../models/responses/userInformationResponse";
import { StudentGradesList } from "../models/responses/studentGradesResponse";

class StudentService{
apiUrl = BASE_API_URL + "Students";

addStudent(userData: AddStudent ){
    return axiosInstance.post(this.apiUrl, userData)
}

getListStudentDetail( 
    pageIndex: number = 0,
    pageSize: number = 10 
){
    return axiosInstance.get<UserInformationList>(
        (this.apiUrl + "/getListStudentDetail" + `?PageIndex=${pageIndex}&PageSize=${pageSize}`)
    )
}

getStudentGrades(studentId: string): Promise<AxiosResponse<StudentGradesList,any>>{
    return axiosInstance.get<StudentGradesList>(this.apiUrl + "/getStudentGrades/" + studentId)
}

}

export default new StudentService();  


