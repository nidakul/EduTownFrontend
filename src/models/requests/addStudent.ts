// export interface AddStudent{
//     studentNo: string;
//     schoolId: number;
//     classroomId: number;
//     nationalIdentity: string;
//     password: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     birthdate: Date;
//     birthplace: string;
//     branch: string;
//     imageUrl: string;
// } 
// // cinsiyet ekle

export interface UserForRegisterCommand {
    schoolId: number;
    classroomId: number;
    nationalIdentity: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    imageUrl?: string;
}

export interface AddStudent {
    studentNo: string;
    birthdate: Date;
    birthplace: string;
    branch: string;
    userForRegisterCommand: UserForRegisterCommand;
}
