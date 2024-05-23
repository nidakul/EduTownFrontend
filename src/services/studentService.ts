import axiosInstance from "../core/interceptors/axiosInceptor";
import { BASE_API_URL } from "../environment/environment";
import { AddStudent } from "../models/requests/addStudent";

class StudentService{
apiUrl = BASE_API_URL + "Students";

addStudent(userData: AddStudent ){
    return axiosInstance.post(this.apiUrl, userData)
}

}

export default new StudentService();  