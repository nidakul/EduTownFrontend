export interface GetLessonsBySchoolIdAndClassIdResponse{
    schoolName: string;
    classroomName: string;
    lessons: Lessons[];

}

export interface Lessons{
    lessonId: number;
    lessonName: string;
}