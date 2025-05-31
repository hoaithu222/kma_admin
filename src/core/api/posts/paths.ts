export const BASE_PATH: string = "/api/v1/article";

export const POST_PATH = {
  delete: `${BASE_PATH}/delete/:id`,
  viewArticle: `${BASE_PATH}/view/:id`,
  statusArticle: `${BASE_PATH}/status/:id`,
  starArticle: `${BASE_PATH}/star`,
  slugArticle: `${BASE_PATH}/slug/:slug`,
  searchArticle: `${BASE_PATH}/search`,
  paginationArticle: `${BASE_PATH}/paging`,
  hotArticle: `${BASE_PATH}/hot`,
  homeArticle: `${BASE_PATH}/home`,
  getFilterArticle: `${BASE_PATH}/filter/page`,
  draftArticle: `${BASE_PATH}/draft`,
  getCategoryArticle: `${BASE_PATH}/category/:categoryId`,
  getByTagArticle: `${BASE_PATH}/bg_tags`,
  getBgSubArticle: `${BASE_PATH}/bg_sub`,
  updateArticle: `${BASE_PATH}/update/:id`,
  matchTagArticle: `${BASE_PATH}/match/tag`,
  incrementViewArticle: `${BASE_PATH}/increment/{id}`,
  createArticle: `${BASE_PATH}/create`,
};
