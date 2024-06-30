import axiosInstance from "../core/interceptors/axiosInceptor";
import { BASE_API_URL } from "../environment/environment";
import { GetListClassesResponse, GetListClassesResponseItems } from "../models/responses/getListClassesResponse";

class ClassService{
    apiUrl = BASE_API_URL + "Classrooms";

    getList(
        pageIndex: number = 0,
        pageSize: number = 10 
      ) {
        return axiosInstance.get<GetListClassesResponseItems>(
          (this.apiUrl + `?PageIndex=${pageIndex}&PageSize=${pageSize}`)
        );
      }

      getById(id: number){
        return axiosInstance.get<GetListClassesResponse>(
            (this.apiUrl + id)
        )
      }
}

export default new ClassService();