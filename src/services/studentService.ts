import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInceptor";
import { BASE_API_URL } from "../environment/environment";
import { StudentGradesResponse } from "../models/responses/studentGradesResponse";
import { StudentInformationList } from "../models/responses/studentInformationResponse";
import { StudentRequest } from "../models/requests/studentRequest";
import { GetStudentsBySchoolIdClassIdBranchIdResponse } from "../models/responses/getStudentsBySchoolIdClassIdBranchIdResponse";

class StudentService{
apiUrl = BASE_API_URL + "Students";

addStudent(userData: StudentRequest ){
    return axiosInstance.post(this.apiUrl, userData)
}

// updateStudent(userData: StudentRequest ){
//     return axiosInstance.put(this.apiUrl, userData)
// } 

 async updateStudent(userData: StudentRequest) {
        try {
            console.log('Sending data:', userData); // Veriyi loglayın
            const response = await axiosInstance.put(this.apiUrl, userData);
            return response;
        } catch (error:any) {
            console.error('Error details:', error.response?.data || error.message || error);
            throw error;
        }
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

getStudentsBySchoolIdClassIdBranchId(schoolId: number, classId: number, branchId: number): Promise<AxiosResponse<GetStudentsBySchoolIdClassIdBranchIdResponse, any>>{
    return  axiosInstance.get<GetStudentsBySchoolIdClassIdBranchIdResponse>(this.apiUrl  + "/getListStudentsBySchoolIdClassIdBranchId/" + schoolId +'/'+ classId +'/'+ branchId)
}

}

export default new StudentService();  


