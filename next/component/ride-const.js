export const API_SERVER = "http://localhost:3002";

export const RIDE_LIST = API_SERVER + "/ride/api";

export const RIDE_GET_ONE = API_SERVER + "/ride/api/details";

export const SHOW_LIST = API_SERVER + "/show/api";

export const SHOW_GET_ONE = API_SERVER + "/show/api/details";

export const SHOP_LIST = API_SERVER + "/shop/api";

export const SHOP_GET_ONE = API_SERVER + "/shop/api/details";

export const USER_LIST = API_SERVER + "/register/api/";

export const USER_ADD = API_SERVER + "/register/add";

export const USER_GET_ONE = API_SERVER + "/login/api/";









// export const AB_ADD = API_SERVER + "/address-book/add";  // method: POST

// // 取得某一筆
// // http://localhost:3002/address-book/api/edit/977
// export const AB_GET_ONE = API_SERVER + "/address-book/api/edit";  // method: GET
// // AB_GET_ONE + "/977"

// // 修改某一筆
// // /address-book/edit/:sid
// export const AB_EDIT_ONE = API_SERVER + "/address-book/edit";  // method: PUT


// // 刪除某一筆
// // /address-book/:sid
// export const AB_DEL_ONE = API_SERVER + "/address-book";  // method: DELETE

// ---------- 登入
export const LOGIN = API_SERVER + "/login-jwt"; // method: POST, 欄位 email, password


// --- 會員相關的路由

export const USER = API_SERVER + "/user"; // method: GET, 取得用戶資料
