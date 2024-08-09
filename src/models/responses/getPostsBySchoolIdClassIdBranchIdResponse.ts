export interface GetPostsBySchoolIdClassIdBranchIdResponse{
    schoolId: number;
    classroomId: number;
    classroomName: string;
    branchId: number;
    branchName: string;
    posts: Posts[];
}

export interface Posts{
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