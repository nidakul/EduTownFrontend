export interface StudentInformationResponse{
  id:number;
  schoolId: number;
  classroomId: number;
  schoolName: string;
  classroomName: string;
  nationalIdentity: string; 
  firstName: string;
  lastName: string;
  email: string;
  status: boolean;
  imageUrl: string;
  studentNo: string;
}