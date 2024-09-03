import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInceptor"
import { BASE_API_URL } from "../environment/environment"
import { AddPost } from "../models/requests/addPost";
import { GetPostsBySchoolIdClassIdBranchIdResponse } from "../models/responses/getPostsBySchoolIdClassIdBranchIdResponse";

class PostService{
    apiUrl = BASE_API_URL + "Posts";

    addPost(postData: AddPost) {
        return axiosInstance.post(this.apiUrl, postData);
    }

    deletePost(id: number) {
        return axiosInstance.delete(this.apiUrl + "/" +id);
    }

    getPostsBySchoolIdClassIdBranchId(schoolId: number, classId: number, branchId: number): Promise<AxiosResponse<GetPostsBySchoolIdClassIdBranchIdResponse, any>>{
        return  axiosInstance.get<GetPostsBySchoolIdClassIdBranchIdResponse>(this.apiUrl  + "/getPostsBySchoolIdClassIdBranchId/" + schoolId +'/'+ classId +'/'+ branchId)
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

