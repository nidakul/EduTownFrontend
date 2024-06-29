import axiosInstance from "../core/interceptors/axiosInceptor";
import { BASE_API_URL } from "../environment/environment";
import { GetTermsItems, GetTermsResponse } from "../models/responses/getTermsResponse";

class TermService{
    apiUrl = BASE_API_URL + "Terms";

    getList(
        pageIndex: number = 0,
        pageSize: number = 3
      ) {
        return axiosInstance.get<GetTermsItems>(
          (this.apiUrl + `?PageIndex=${pageIndex}&PageSize=${pageSize}`)
        );
      }
}

export default new TermService();