export interface StudentGradesResponse{
    id: number;
    classroomName: string;
    lessonName: string;
    gradeTypeName: string;
    termName: string;
    examCount: number;
    grade: number;
}

export interface StudentGradesList{
    // userId: string;
    studentGrades: StudentGradesResponse[];
}

