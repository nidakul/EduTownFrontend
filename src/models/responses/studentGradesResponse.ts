export interface StudentGradesResponse{
    id: string;
    classroomId: number;
    termId: number;
    classroomName: string;
    lessonName: string;
    gradeTypeName: string;
    termName: string;
    examCount: number;
    grade: number;
}

export interface StudentGradesList{
    studentGrades: StudentGradesResponse[];
}

