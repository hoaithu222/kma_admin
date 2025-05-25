const BASE_PATH = "/api/v1/sub_category";

export const SUBCATEGORY_PATH = {
  GET_ALL_SUBCATEGORIES: `${BASE_PATH}/all`,
  GET_SUBCATEGORIES: `${BASE_PATH}/filter?categoryId=:id`,
  ADD_SUBCATEGORY: `${BASE_PATH}/create`,
  EDIT_SUBCATEGORY: `${BASE_PATH}/update/:id`,
  DELETE_SUBCATEGORY: `${BASE_PATH}/delete`,
};
