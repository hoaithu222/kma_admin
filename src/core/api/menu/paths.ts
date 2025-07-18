export const BASE_PATH = `/api/v1/menu`;

export const MENU_PATH = {
  GET_MENUS: `${BASE_PATH}`,
  DELETE_MENU_BY_CATEGORY_ID: `${BASE_PATH}/categories/:categoryId`,
  GET_MENU_VISIBLE: `${BASE_PATH}/visible`,
  CREATE_MENU: `${BASE_PATH}/categories`,
  UPDATE_MENU: `${BASE_PATH}/categories/:categoryId`,
  UPDATE_TOGGLE_MENU: `${BASE_PATH}/categories/:categoryId/toggle-visibility`,
  UPDATE_ORDER_MENU: `${BASE_PATH}/categories/:categoryId/order/{newOrder}`,
};
