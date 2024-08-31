import axiosInstance from "../core/interceptors/axiosInceptor";
import { BASE_API_URL } from "../environment/environment";
import { GetListCityItems } from "../models/responses/getListCityResponse";

class CityService {
    apiUrl = BASE_API_URL + "Cities";

getListCities(
    pageIndex: number = 0, 
    pageSize: number = 81
){
    return axiosInstance.get<GetListCityItems>(this.apiUrl + `?PageIndex=${pageIndex}&PageSize=${pageSize}`)
} 
}

export default new CityService();