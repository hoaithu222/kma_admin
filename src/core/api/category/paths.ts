const BASE_PATH = "/api/v1";

export const CATEGORY_PATH = {
  GET_CATEGORIES: `${BASE_PATH}/category/filter`,
  ADD_CATEGORY: `${BASE_PATH}/category/create`,
  EDIT_CATEGORY: `${BASE_PATH}/category/update/:id`,
  DELETE_CATEGORY: `${BASE_PATH}/category/delete/:id`,
  GET_CATEGORY: `${BASE_PATH}/category/view/:id`,
};
