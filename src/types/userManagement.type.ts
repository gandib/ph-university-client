import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "./academicManagement.type";

export type TStudent = {
  _id: string;
  id: string;
  user: TUser;
  name: TName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg: string;
  admissionSemester: TAcademicSemester;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFaculty;
  isDeleted: boolean;
  fullName: string;
};

export type TUser = {
  _id: string;
  id: string;
  email: string;
  needsPassword: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TName = {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  _id: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
  _id: string;
};

export type TAdmin = {
  _id: string;
  id: string;
  user: TUser;
  designation: string;
  name: TName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  isDeleted: boolean;
  fullName: string;
};

export type TFaculty = {
  _id: string;
  id: string;
  user: TUser;
  designation: string;
  name: TName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFaculty;
  isDeleted: boolean;
  fullName: string;
};
