import axiosInstance from "../core/interceptors/axiosInceptor";
import { BASE_API_URL } from "../environment/environment";
import { AddStudent } from "../models/requests/addStudent";
import { StudentInformationList } from "../models/responses/studentInformationResponse";

class StudentService{
apiUrl = BASE_API_URL + "Students";

addStudent(userData: AddStudent ){
    return axiosInstance.post(this.apiUrl, userData)
}

getListStudentDetail( 
    pageIndex: number = 0,
    pageSize: number = 10 
){
    return axiosInstance.get<StudentInformationList>(
        (this.apiUrl + "/getListStudentDetail" + `?PageIndex=${pageIndex}&PageSize=${pageSize}`)
    )
}

}

export default new StudentService();  


