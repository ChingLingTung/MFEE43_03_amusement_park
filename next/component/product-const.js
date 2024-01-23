export const API_SERVER = "http://localhost:3002";

export const AB_LIST = API_SERVER + "/product/api";

export const AB_ORDER_ADD = API_SERVER + "/order/add";

export const AB_ORDER = API_SERVER + "/order/api";

export const AB_711 = API_SERVER + "/shipment/711";

export const AB_ECPAY = API_SERVER + "/payment/payment";

export const AB_ORDER_DETAILS = API_SERVER + "/order/details";

export const AB_ORDER_DETAILS2 = API_SERVER + "/order/details2";

export const AB_ADD = API_SERVER + "//add";  // method: POST

// 取得某一筆
// http://localhost:3002/product/api/edit/977
export const AB_GET_ONE = API_SERVER + "/product/api/edit";  // method: GET
// AB_GET_ONE + "/977"

// 修改某一筆
// /product/edit/:sid
export const AB_EDIT_ONE = API_SERVER + "/product/edit";  // method: PUT


// 刪除某一筆
// /product/:sid
export const AB_DEL_ONE = API_SERVER + "/product";  // method: DELETE