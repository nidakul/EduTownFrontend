export interface UpdatePostRequest {
    id: number;
    userId: string;
    schoolId: number;
    classroomId: number;
    branchId: number;
    likeCount: number;
    message: string;
    isCommentable: boolean;
    filePath: string[];
  }
   