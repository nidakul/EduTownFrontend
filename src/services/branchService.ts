import { AxiosResponse } from "axios";
import { BASE_API_URL } from "../environment/environment";
import { GetBranchesBySchoolIdAndClassIdResponse } from "../models/responses/getBranchesBySchoolIdAndClassIdResponse";
import axiosInstance from "../core/interceptors/axiosInceptor";

class BranchService {
    apiUrl = BASE_API_URL;

    getBranchesBySchoolIdAndClassId(schoolId: number, classId: number): Promise<AxiosResponse<GetBranchesBySchoolIdAndClassIdResponse, any>> {
        return axiosInstance.get<GetBranchesBySchoolIdAndClassIdResponse>(this.apiUrl + "SchoolClasses/" + "getBranchesBySchoolIdAndClassId/" + schoolId + "/" + classId)

    }
}

export default new BranchService();