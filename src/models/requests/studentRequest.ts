export interface UserForRegisterCommand {
    schoolId: number;
    nationalIdentity: string; 
    password: string;
    firstName: string;
    lastName: string; 
    email: string;
    gender: string;
    imageUrl?: string; 
} 

export interface StudentRequest {
    id?: string;
    userId: string;
    classroomId: number;
    branchId: number;
    studentNo: string;
    birthdate: Date;
    birthplace: string;
    userForRegisterCommand: UserForRegisterCommand;
}
