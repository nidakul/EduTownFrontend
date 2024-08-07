import axiosInstance from "../core/interceptors/axiosInceptor"
import { BASE_API_URL } from "../environment/environment"
import { AddPost } from "../models/requests/addPost";

class PostService{
    apiUrl = BASE_API_URL + "Posts";

    AddPost(post: AddPost) {
        return axiosInstance.post(this.apiUrl, post);
    }

}

export default new PostService();

