import { IResponse } from "@/core/base/Response";

export interface IRequestGetLecturer {}
export interface IRequestSearchLecturer {
  name: string;
  majorId: string;
  subMajorId: string;
  title: string;
  email: string;
  position: string;
}

export interface IRequestGetLecturerById {
  id: number;
}

export interface IRequestCreateLecturer {
  name: string;
  photoId: number;
  title: string;
  email: string;
  bio: string;
  position: string;
  awards: string;
  education: string;
  teachingAreas: string;
  scientificWorks: string;
  researchInterests: string;
  majorId: number;
  subMajorId: number;
}
export interface IRequestUpdateLecturer {
  id: number;
  name: string;
  photoId: number;
  title: string;
  email: string;
  bio: string;
  position: string;
  awards: string;
  education: string;
  teachingAreas: string;
  scientificWorks: string;
  researchInterests: string;
  majorId: number;
  subMajorId: number;
}
export interface IRequestDeleteLecturer {
  id: number;
}

export interface dataLecturer {
  id: number;
  name: string;
  photoId: number;
  title: string;
  email: string;
  bio: string;
  position: string;
  awards: string;
  education: string;
  teachingAreas: string;
  scientificWorks: string;
  researchInterests: string;
  createdAt: string;
  updatedAt: string;
  majorId: number;
  majorName: string;
  subMajorId: number;
  subMajorName: string;
}
export interface dataDeleteLecturer {
  data: string;
}
export interface IResponseSearchLecturer extends IResponse<dataLecturer[]> {}
export interface IResponseGetLecturer extends IResponse<dataLecturer[]> {}
export interface IResponseGetLecturerById extends IResponse<dataLecturer> {}
export interface IResponseCreateLecturer extends IResponse<dataLecturer> {}
export interface IResponseUpdateLecturer extends IResponse<dataLecturer> {}
export interface IResponseDeleteLecturer
  extends IResponse<dataDeleteLecturer> {}
