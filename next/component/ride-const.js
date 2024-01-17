export const API_SERVER = "http://localhost:3002";

// 設施清單
export const RIDE_LIST = API_SERVER + "/ride/api";
// 設施單筆資料
export const RIDE_GET_ONE = API_SERVER + "/ride/api/details";
// 表演清單
export const SHOW_LIST = API_SERVER + "/show/api";
// 表演單筆資料
export const SHOW_GET_ONE = API_SERVER + "/show/api/details";
// 商店清單
export const SHOP_LIST = API_SERVER + "/shop/api";
// 商店單筆資料
export const SHOP_GET_ONE = API_SERVER + "/shop/api/details";
// 比對資料否符合格式
export const USER_LIST = API_SERVER + "/register/api/";
// 新增(註冊新會員)
export const USER_ADD = API_SERVER + "/register/add";
// 維護清單
export const MAINTAIN_GET_LIST = API_SERVER + "/maintenance/api";
// 取得單筆會員資料
export const USER_GET_ONE = API_SERVER + "/register/api/edit"
// 登入取得token存入localstorage
export const LOGIN = API_SERVER + "/login-jwt";
// 會員在登入狀態時進入會員中心的首頁取得會員資料表格
export const USER = API_SERVER + "/user";







