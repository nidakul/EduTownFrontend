import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import postService from "../../services/postService"
import { AddPost } from "../../models/requests/addPost";

interface PostState {
    posts: AddPost | null;
}

const initialState: PostState = {
    posts: null
}

export const addPost = createAsyncThunk('post/add', async(post: AddPost) => {
    const response = await postService.addPost(post);
    return response.data;
})


export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addPost.fulfilled, (state,action) => {
            state.posts = action.payload;
        })
        .addCase(addPost.rejected, (state, action) => {
            console.error('An error occurred while adding the post:', action.error.message);

        });
    }
})

export const {} = postSlice.actions;
export default postSlice.reducer;