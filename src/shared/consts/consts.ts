export const PAGE_SIZE = 10;
export const PAGE_SIZE_SMALL = 1;

// trang chủ
export const SUBCATEGORY_IDS = {
  BANNER: 53, // banner
  NEWS: 50, // tin tức
  EVENT_NEW: 49, // sự kiện mới
  EVENT_ADMISSION: 51, // sự kiện tuyển sinh
  STUDENT: 52, // sinh viên
  COOPERATION: 40, // hợp tác
} as const;

export const CATEGORY_IDS = {
  BANNER: 50, // banner
  NEWS: 50, // tin tức
  EVENT_NEW: 52, // sự kiện mới
  EVENT_ADMISSION: 51, // sự kiện tuyển sinh
  STUDENT: 51, // sinh viên
  COOPERATION: 50, // hợp tác
} as const;

// tuyển sinh
export const ADMISSION_IDS = {
  ADMISSION_CATEGORY: 54, // tuyển sinh
  ADMISSION_IT: 56, // tuyển sinh công nghệ thông tin
  ADMISSION_SECURITY: 57, // tuyển sinh an toàn thông tin
  ADMISSION_TELECOMMUNICATION: 58, // tuyển sinh điện tử viễn thông
} as const;

// nghiên cứu

export const RESEARCH_IDS = {
  RESEARCH_CATEGORY: 53, // nghiên cứu
  RESEARCH_SCIENTIFIC_PUBLICATION: 54, // Công bố khoa học
  RESEARCH_RESEARCH_TOPIC: 55, // Đề tài nghiên cứu
} as const;

// sinh viên

export const STUDENT_IDS = {
  STUDENT_CATEGORY: 51, // sinh viên
  STUDENT_ACTIVITY: 42, // Hoạt động ngoại khóa
  STUDENT_JOB: 43, // Việc làm thực tập
  STUDENT_SUPPORT: 44, // Hỗ trợ sinh viên
  STUDENT_GUIDE: 45, // Hướng dẫn thủ tục
  STUDENT_PRACTICE: 46, // Đồ án thực hành
  STUDENT_EDUCATION: 51, // Đào tạo tuyển sinh
  STUDENT_ALUMNI: 52, // Cựu sinh viên
} as const;

// sự kiện
export const EVENT_IDS = {
  EVENT_CATEGORY: 52, // sự kiện
  EVENT_NEW: 49, // sự kiện mới
  EVENT_FALL: 47, // sự kiện sắp tới
  EVENT_SPRING: 48, // sự kiện đã diễn ra
} as const;

// tin tức
export const NEWS_IDS = {
  NEWS_CATEGORY: 50, // tin tức
  NEWS_NOTICE: 39, // Thông báo chung
  NEWS_COOPERATION: 40, // Hợp tác đối ngoại
  NEWS_RESEARCH: 41, // Nghiên cứu khoa học
} as const;
