export interface AddPostComment{
    userId: string;
    taggedUserId: string[];
    postId: number;
    comment: string;
}