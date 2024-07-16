export interface GetListClassesBySchoolTypeId {
    classes: Classes[];
} 

export interface Classes{
    classroomId: number
    classroomName: string;
}