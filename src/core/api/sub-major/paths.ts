export const BASE_PATH = `/api/v1/sub-major`;

export const SUB_MAJOR_PATH = {
  GET_SUB_MAJORS: `${BASE_PATH}`,
  GET_SUB_MAJOR_WITH_MAJOR: `${BASE_PATH}/major/:majorId`,
  GET_SUB_MAJOR_BY_ID: `${BASE_PATH}/:id`,
  CREATE_SUB_MAJOR: `${BASE_PATH}`,
  UPDATE_SUB_MAJOR: `${BASE_PATH}/:id`,
  DELETE_SUB_MAJOR: `${BASE_PATH}/:id`,
};
