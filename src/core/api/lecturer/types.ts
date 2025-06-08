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
  name: string; // Tên
  photoId: number; // ID của ảnh
  title: string; // Chức vụ
  email: string; // Email
  bio: string; // Giới thiệu
  position: string; // Vị trí
  awards: string; // Giải thưởng
  education: string; // Học vấn
  teachingAreas: string; // Lĩnh vực giảng dạy
  scientificWorks: string; // Công trình khoa học
  researchInterests: string; // Lĩnh vực nghiên cứu
  majorId: number; // ID chuyên ngành
  subMajorId: number | null; // ID chuyên ngành con
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
  id: number; // ID
  name: string; // Tên
  photoId: number; // ID của ảnh
  title: string; // Chức vụ
  email: string; // Email
  bio: string; // Giới thiệu
  position: string; // Vị trí
  awards: string; // Giải thưởng
  education: string; // Học vấn
  teachingAreas: string; // Lĩnh vực giảng dạy
  filePath: string; // URL của ảnh
  scientificWorks: string; // Công trình khoa học
  researchInterests: string; // Lĩnh vực nghiên cứu
  createdAt: string;
  updatedAt: string;
  majorId: number; // ID chuyên ngành
  majorName: string; // Tên chuyên ngành
  subMajorId: number; // ID chuyên ngành con
  subMajorName: string; // Tên chuyên ngành con
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
