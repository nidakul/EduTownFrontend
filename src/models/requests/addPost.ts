export interface AddPost {
    userId: string;
    schoolId: number;
    classroomId: number;
    branchId: number;
    likeCount: number;
    message: string;
    isCommentable: boolean;
}