import axiosInstance from "../core/interceptors/axiosInceptor"
import { BASE_API_URL } from "../environment/environment"
import { AddPost } from "../models/requests/addPost";

class PostService{
    apiUrl = BASE_API_URL + "Posts";

    addPost(postData: AddPost) {
        return axiosInstance.post(this.apiUrl, postData);
    }

    

    // async addPost(postData: AddPost) {
    //     try {
    //         console.log('Sending data:', postData); // Veriyi loglayın
    //         const response = await axiosInstance.post(this.apiUrl, postData);
    //         return response;
    //     } catch (error:any) {
    //         console.error('Error details:', error.response?.data || error.message || error);
    //         throw error;
    //     }
    // }

}

export default new PostService();

