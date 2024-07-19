export interface GradeDto {
    examCount: number;
    grade: number;
}

export interface GradeType {
    gradeTypeId: number;
    gradeTypeName: string;
    gradesDto: GradeDto[];
}

export interface Lesson {
    lessonId: number;
    lessonName: string;
    grades: GradeType[];
}

export interface TermName {
    termId: number;
    termName: string;
    lessons: Lesson[];
}

export interface StudentGrade {
    classroomId: number;
    classroomName: string;
    termNames: TermName[];
}

export interface StudentGradesResponse {
    id: string;
    studentGrades: StudentGrade[];
}
