import { GetListGradeTypeList } from "../models/responses/getListGradeTypeResponse";
import axiosInstance from "../core/interceptors/axiosInceptor";
import { BASE_API_URL } from "../environment/environment";

class GradeTypeService {

        apiUrl = BASE_API_URL + "GradeTypes";
        // this.dtoUrl = this.apiUrl + "/GetAllCalendar";    
    
  getList(
    pageIndex: number = 0,
    pageSize: number = 10
  ) {
    return axiosInstance.get<GetListGradeTypeList>(
      (this.apiUrl + `?PageIndex=${pageIndex}&PageSize=${pageSize}`)
    );
  }
}

export default new GradeTypeService();
