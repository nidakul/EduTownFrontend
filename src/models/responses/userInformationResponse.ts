export interface UserInformationResponse{
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
  gender: string;
  birthdate: Date;
  birthplace: string;
  branch:string;
}

export interface UserInformationList{
  items:UserInformationResponse[];
}