import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "./academicManagement.type";
import { TFaculty } from "./userManagement.type";

export type TSemester = {
  _id: string;
  academicSemester: TAcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
};

export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: TPreRequisiteCourse[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TPreRequisiteCourse = {
  course: TCourse;
  isDeleted: boolean;
};

export type TFacultyWithCourse = {
  _id: string;
  course: string;
  faculties: TFaculty[];
};

export type TOfferedCourse = {
  _id: string;
  semesterRegistration: TSemesterRegistration;
  academicSemester: TAcademicSemester;
  academicFaculty: TAcademicFaculty;
  academicDepartment: TAcademicDepartment;
  course: TCourse;
  faculty: TFaculty;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type TSemesterRegistration = {
  _id: string;
  academicSemester: string;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
