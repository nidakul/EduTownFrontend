import axiosInstance from "../core/interceptors/axiosInceptor";
import { BASE_API_URL } from "../environment/environment";

class UserService {
    getUserDetailById(userId: string){
        return axiosInstance.get(BASE_API_URL + "Users/" + userId)
    }
}

export default new UserService();