import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import postService from "../../services/postService"
import { AddPost } from "../../models/requests/addPost";
import { AddPostComment } from "../../models/requests/addPostComment";
import postComentService from "../../services/postComentService";
import { GetPostsBySchoolIdClassIdBranchIdResponse } from "../../models/responses/getPostsBySchoolIdClassIdBranchIdResponse";
import { UpdatePostRequest } from "../../models/requests/updatePostRequest";

interface PostState {
    post: AddPost | null;
    comments: AddPostComment | null;
    posts: GetPostsBySchoolIdClassIdBranchIdResponse | null;
    updatePost: UpdatePostRequest | null;
}

const initialState: PostState = {
    post: null,
    comments: null,
    posts: null,
    updatePost: null
}

export const addPost = createAsyncThunk('post/add', async(post: AddPost) => {
    const response = await postService.addPost(post);
    return response.data;
})

export const addPostComment= createAsyncThunk("post/addComment", async(comment: AddPostComment) => {
    const response = await postComentService.addPostComment(comment);
    return response.data;
})

export const updatePost = createAsyncThunk('post/update', async(updatePost: UpdatePostRequest) => {
    const response = await postService.updatePost(updatePost);
    return response.data;
})

export const getPostsBySchoolIdClassIdBranchId = createAsyncThunk<GetPostsBySchoolIdClassIdBranchIdResponse, {schoolId: number, classId: number, branchId: number}>("getPostsBySchoolIdClassIdBranchId", async(params) => {
    const { schoolId, classId , branchId} = params;
    const response = await postService.getPostsBySchoolIdClassIdBranchId(schoolId, classId, branchId);
    return response.data;
})


export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addPost.fulfilled, (state,action) => {
            state.post = action.payload;
        })
        .addCase(addPostComment.fulfilled, (state,action) => {
            state.comments = action.payload;
        })
        .addCase(addPost.rejected, (state, action) => {
            console.error('An error occurred while adding the post:', action.error.message);
        })
        .addCase(getPostsBySchoolIdClassIdBranchId.fulfilled,(state,action) => {
            state.posts = action.payload;
        })
        .addCase(updatePost.fulfilled, (state,action) => {
            const updatedPost = action.payload;
            if (state.posts && state.posts.posts) {
                state.posts.posts = state.posts.posts.map(post =>
                    post.postId === updatedPost.id ? updatedPost : post
                );
            }
        })
    }
})

export const {} = postSlice.actions;
export default postSlice.reducer;