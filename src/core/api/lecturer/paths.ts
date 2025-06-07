export const BASE_PATH = `/api/v1/lecturer`;

export const LECTURER_PATH = {
  GET_LECTURERS_ALL: `${BASE_PATH}`,
  SEARCH_LECTURERS: `${BASE_PATH}/search`,
  GET_LECTURER_BY_ID: `${BASE_PATH}/:id`,
  CREATE_LECTURER: `${BASE_PATH}`,
  UPDATE_LECTURER: `${BASE_PATH}/:id`,
  DELETE_LECTURER: `${BASE_PATH}/:id`,
};
