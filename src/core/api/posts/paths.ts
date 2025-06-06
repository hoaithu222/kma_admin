export const BASE_PATH: string = "/api/v1/article";

// Định nghĩa các đường dẫn API bài viết
export const POST_PATH = {
  delete: `${BASE_PATH}/:id`, // Xóa bài viết theo id
  getArticle: `${BASE_PATH}/:id`, // Lấy bài viết theo id
  slugArticle: `${BASE_PATH}/slug/:slug`, // Lấy bài viết theo slug
  searchArticle: `${BASE_PATH}/search`, // Tìm kiếm bài viết

  homeArticle: `${BASE_PATH}/home`, // Bài viết hiển thị ở trang chủ

  updateArticle: `${BASE_PATH}/:id`, // Cập nhật bài viết

  incrementViewArticle: `${BASE_PATH}/increment/:id`, // Tăng lượt xem
  createArticle: `${BASE_PATH}/create`, // Tạo mới bài viết
};
