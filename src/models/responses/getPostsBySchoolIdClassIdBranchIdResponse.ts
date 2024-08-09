export interface GetPostsBySchoolIdClassIdBranchIdResponse{
    postId: number;
    userId: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
    likeCount: number;
    message: string;
    isCommentable: boolean;
    createdDate: Date;
}