import axiosInstance from "../core/interceptors/axiosInceptor";
import { BASE_API_URL } from "../environment/environment";
import { ClassInformationList } from "../models/responses/classInformationResponse";

class ClassService {
    apiUrl = BASE_API_URL + "Classrooms";

    getList(pageIndex: number = 0,
        pageSize: number = 20 ){
            return axiosInstance.get<ClassInformationList>(
                (this.apiUrl + `?PageIndex=${pageIndex}&PageSize=${pageSize}`)
            )
        }
}

export default new ClassService();