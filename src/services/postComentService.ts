import axiosInstance from "../core/interceptors/axiosInceptor";
import { BASE_API_URL } from "../environment/environment";
import { AddPostComment } from "../models/requests/addPostComment";

class PostCommentService{
    apiUrl = BASE_API_URL + 'PostComments';

    addPostComment(postCommentData: AddPostComment) {
        return axiosInstance.post(this.apiUrl, postCommentData); 
    }
}

export default new PostCommentService();