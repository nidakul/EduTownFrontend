import { AxiosResponse } from "axios";
import { BASE_API_URL } from "../environment/environment";
import axiosInstance from "../core/interceptors/axiosInceptor";
import { GetListClassesBySchoolTypeId } from "../models/responses/getListClassesBySchoolTypeId";

class SchoolType {
    apiUrl = BASE_API_URL + "SchoolTypes/";

    getClassesBySchoolTypeIdResponse(id: number) : Promise<AxiosResponse<GetListClassesBySchoolTypeId,any>>{
        return axiosInstance.get<GetListClassesBySchoolTypeId>(this.apiUrl + "getClassesBySchoolTypeId/" + id)
    }
}

export default new SchoolType();