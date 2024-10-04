export interface GetStudentsBySchoolIdClassIdBranchIdResponse{
students: Students[];
}

export interface Students{
    firstName: string;
    lastName: string;
}