export const BASE_PATH = `/api/public`;
//  định nghĩa các endpoint cụ thể
export const HOME_PATH = {
  //  get banner
  getBanner: `${BASE_PATH}/posts/latest`,
  // menu item
  getMenu: `${BASE_PATH}/menu_items`,
  // get all post
  getAllPost: `${BASE_PATH}/posts`,
  // get category
  getCategory: `/api/get-category`,
};
