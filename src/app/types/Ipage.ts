export interface IPage
{
    children: React.ReactNode;
}

export interface IPatient
{
    _id: string;
    patientId: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: Date | null;
    age: number | null;
    location: string | null;
    occupation: string | null;
    gender: string | null;
    maritalStatus: string | null;
    address: string;
    phoneNumber: string | null;
    nextOfKin: string | null;
    relationshipWithNextOfKin: string | null;
    contactOfNextOfKin: string | null;
    confirmed: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
