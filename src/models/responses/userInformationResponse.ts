export interface UserInformationResponse{
  id:string;
  schoolId: number;
  branchId: number;
  classroomId: number;
  branchName: number;
  schoolName: string;
  classroomName: string;
  nationalIdentity: string;  
  firstName: string;
  lastName: string; 
  email: string;
  status: boolean;
  imageUrl: string;
  studentNo: string;
  gender: string;
  birthdate: Date;
  birthplace: string;
}

export interface UserInformationList{
  items:UserInformationResponse[];
}