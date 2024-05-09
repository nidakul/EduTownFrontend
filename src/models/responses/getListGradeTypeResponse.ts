export interface GetListGradeTypeResponse{
    id: number;
    name: string;
    gradeCount: number;
}

export interface GetListGradeTypeList{
    items: GetListGradeTypeResponse[];
}