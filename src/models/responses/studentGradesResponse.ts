export interface StudentGradesResponse{
    id: number;
    lessonName: string;
    gradeTypeName: string;
    examCount: number;
    grade: number;
}

export interface StudentGradesList{
    userId: string;
    studentGradesDtoItems: StudentGradesResponse[];
}

