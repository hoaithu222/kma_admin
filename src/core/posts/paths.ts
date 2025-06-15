const BASE_PATH = `/api/public`;

export const POST_PATH = {
  // get all post
  getAllPost: `${BASE_PATH}/posts/latest`,
  // get post by id
  getPostById: `${BASE_PATH}/posts`,
  // get post by slug
  getPostBySlug: `${BASE_PATH}/posts`,
};
