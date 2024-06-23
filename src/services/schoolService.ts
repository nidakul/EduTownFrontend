import { AxiosResponse } from "axios";
import { BASE_API_URL } from "../environment/environment";
import axiosInstance from "../core/interceptors/axiosInceptor";
import { GetClassesBySchoolId } from "../models/responses/getClassesBySchoolId";

class SchoolService{
 apiUrl = BASE_API_URL + "Schools/"

 getClassesBySchoolId(schoolId: number): Promise<AxiosResponse<GetClassesBySchoolId, any>>{
    return axiosInstance.get<GetClassesBySchoolId>(this.apiUrl + "getClassesBySchoolId/" + schoolId);
 }

}

export default new SchoolService();