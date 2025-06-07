export const BASE_PATH = "/api/v1/media_file";
export const UPLOAD_PATH = {
  upload: `${BASE_PATH}/upload`,
  getAll: `${BASE_PATH}/all`,
  uploadsFiled: `${BASE_PATH}/uploads/:year/:month/:day/:filename`,
  getMediaFile: `${BASE_PATH}/:id`,
  deleteMediaFile: `${BASE_PATH}/:id`,
};

// article-media
export const BASE_PATH_ARTICLE_MEDIA = "/api/v1/article_media";
export const UPLOAD_PATH_ARTICLE_MEDIA = {
  addMediaFile: `${BASE_PATH_ARTICLE_MEDIA}/add`,
  getMediaFilesWithArticleId: `${BASE_PATH_ARTICLE_MEDIA}/article/:articleId`,
  getMediaFileArticle: `${BASE_PATH_ARTICLE_MEDIA}/media/:mediaId`,
  removeMediaFile: `${BASE_PATH_ARTICLE_MEDIA}/remove`,
  removeAllMediaFile: `${BASE_PATH_ARTICLE_MEDIA}/remove-all/:articleId`,
};
