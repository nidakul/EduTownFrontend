import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInceptor";
import { BASE_API_URL } from "../environment/environment";
import { SchoolResponse } from "../models/responses/schoolResponse";

class ClassService{
    apiUrl = BASE_API_URL + "Schools/";

    getById(id:number) : Promise<AxiosResponse<SchoolResponse,any>>{
return axiosInstance.get<SchoolResponse>(this.apiUrl + id);
    }

    
}

export default new ClassService();