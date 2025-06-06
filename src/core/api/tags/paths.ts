export const BASE_PATH = "/api/v1/tag";

export const TAG_PATH = {
  create: `${BASE_PATH}/create`,
  getTag: `${BASE_PATH}/view/:id`,
  update: `${BASE_PATH}/update/:id`,
  delete: `${BASE_PATH}/delete/:id`,
  getAll: `${BASE_PATH}/filter`,
};
