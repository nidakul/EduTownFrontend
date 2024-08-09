import axiosInstance from "../core/interceptors/axiosInceptor";
import { BASE_API_URL } from "../environment/environment";
import { AddPostComment } from "../models/requests/addPostComment";

class PostCommentService{
    apiUrl = BASE_API_URL + 'PostComments';

    // addPostComment(postCommentData: AddPostComment) {
    //     return axiosInstance.post(this.apiUrl, postCommentData); 
    // }

    async addPostComment(postCommentData: AddPostComment) {
        try {
            console.log('Sending data:', postCommentData); // Veriyi loglayın
            const response = await axiosInstance.post(this.apiUrl, postCommentData);
            return response;
        } catch (error:any) {
            console.error('Error details:', error.response?.data || error.message || error);
            throw error;
        }
    }
}

export default new PostCommentService();


    