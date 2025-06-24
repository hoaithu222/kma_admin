export const BASE_PATH = "/api/v1/user";
export const AUTH_PATH = {
  login: `${BASE_PATH}/login`,
  register: `${BASE_PATH}/register`,
  delete: `${BASE_PATH}/delete/:id`,
  getUser: `${BASE_PATH}/filter`,
  updateUser: `${BASE_PATH}/update/:id`,
  logout: `${BASE_PATH}/logout`,
};
