export interface StudentCertificateResponse{
    id: number;
    certificateName: string;
    classroomName: string;
    year: Date;
    semester: number;
}

export interface StudentCertificateList{
    userId: string;
    studentCertificateDtoItems:StudentCertificateResponse[];
}


