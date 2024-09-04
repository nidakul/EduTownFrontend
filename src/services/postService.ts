import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInceptor"
import { BASE_API_URL } from "../environment/environment"
import { AddPost } from "../models/requests/addPost";
import { GetPostsBySchoolIdClassIdBranchIdResponse } from "../models/responses/getPostsBySchoolIdClassIdBranchIdResponse";
import { UpdatePostRequest } from "../models/requests/updatePostRequest";

class PostService{
    apiUrl = BASE_API_URL + "Posts";

    addPost(postData: AddPost) {
        return axiosInstance.post(this.apiUrl, postData);
    }

    deletePost(id: number) {
        return axiosInstance.delete(this.apiUrl + "/" +id);
    }

    // updatePost(updatePost: UpdatePostRequest){
    //     return axiosInstance.put(this.apiUrl, updatePost);
    // }

    async updatePost(updatePost: UpdatePostRequest) {
        try {
            console.log('Sending data:', updatePost); // Veriyi loglayın
            const response = await axiosInstance.put(this.apiUrl, updatePost);
            return response;
        } catch (error:any) {
            console.error('Error details:', error.response?.data || error.message || error);
            throw error;
        }
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

