export interface GetBranchesBySchoolIdAndClassIdResponse {
    schoolName: string;
    classroomName: string;
    branches: Branches[];
}

export interface Branches{
    branchId: number;
    branchName: string;
}