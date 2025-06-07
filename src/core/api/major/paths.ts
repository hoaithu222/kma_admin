export const BASE_PATH = `/api/v1/major`;

export const MAJOR_PATH = {
  GET_MAJORS: `${BASE_PATH}`,
  GET_MAJOR_WITH_SUB_MAJOR: `${BASE_PATH}/:id/with-sub-majors`,
  GET_MAJOR_WITH_SUB_MAJOR_ALL: `${BASE_PATH}/with-sub-majors`,
  GET_MAJOR_BY_ID: `${BASE_PATH}/:id`,
  CREATE_MAJOR: `${BASE_PATH}`,
  UPDATE_MAJOR: `${BASE_PATH}/:id`,
  DELETE_MAJOR: `${BASE_PATH}/:id`,
};
