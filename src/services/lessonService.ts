import { AxiosResponse } from "axios";
import { BASE_API_URL } from "../environment/environment";
import axiosInstance from "../core/interceptors/axiosInceptor";
import { GetLessonsBySchoolIdAndClassIdResponse } from "../models/responses/getLessonsBySchoolIdAndClassIdResponse";

class LessonService{
    apiUrl = BASE_API_URL;

    getLessonsBySchoolIdAndClassId(schoolId: number, classId: number): Promise<AxiosResponse<GetLessonsBySchoolIdAndClassIdResponse, any>>{
        return axiosInstance.get<GetLessonsBySchoolIdAndClassIdResponse>(this.apiUrl + "SchoolClasses/" + "getLessonsBySchoolIdAndClassId/" + schoolId +"/"+ classId)
    }
}

export default new LessonService();