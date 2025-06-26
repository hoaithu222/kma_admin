/**
 * Sắp xếp danh sách bài viết theo ngày xuất bản giảm dần (mới nhất trước).
 * @param {Array} posts - Mảng các bài viết có thuộc tính `publishedAt`.
 * @returns {Array} - Mảng đã được sắp xếp.
 */
export function sortByPublishedDate(posts: any[]) {
  return posts
    .slice()
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}
