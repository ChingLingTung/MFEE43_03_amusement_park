import "dotenv/config";
import express from "express";
import db from "../utils/connect-mysql.js";
import upload from "./../utils/upload-imgs.js";
import dayjs from "dayjs";

const router = express.Router();

// router.get("/", async (req, res) => {
//   const sql = "SELECT * FROM amusement_ride ORDER BY amusement_ride_id DESC";
//   const [rows] = await db.query(sql);
//   res.json(rows);
// });

// router.get("/", async (req, res) => {
//   const perPage = 20; // 每頁固定20筆資料
//   // +轉換成數字，若無法轉換變成NAN則設定為1(使用者意外使用了不存在的頁數直接跳轉到第一頁)
//   let page = +req.query.page || 1;;
//   let totalRows;
//   let totalPages;
//   let rows = [];

//   // 如果頁數小於一(不存在)，用重新導向方法redirect()頁面跳轉回第一頁
//   // 放在上面先判斷頁數本身有沒有可能存在，有存在才進行下一步
//   // 不存在直接return即結束不執行下面的程式


//   const total_sql = "SELECT COUNT(1) totalRows FROM amusement_ride";
//   // 用括號們將totalRows解構得到純數字
//   [[{ totalRows }]] = await db.query(total_sql);
//   // 將資料總筆數除以一頁的資料筆數後以Math.ceil()小數直接進位成整數
//   totalPages = Math.ceil(totalRows / perPage);
//   // 如果資料總筆數大於零(可能存在)
//   if(totalRows > 0){
//     // 如果頁數大於總頁數直接重新導向到上次的最後一頁
//     if (page > totalPages) {
//       return res.redirect(`?page=${totalPages}`);
//     }
//     const sql = `SELECT * FROM amusement_ride ORDER BY amusement_ride_id DESC 
//     LIMIT ${(page - 1) * perPage}, ${perPage}`;
//     // 這裡的rows是上面的全域變數
//     [rows] = await db.query(sql);
//   }
//     return {
//     page,
//     totalRows,
//     totalPages,
//     rows,
//     };
//   });
//   res.render('rides/ride_list', {

//   });

// 設定要在近其他頁面前要先登入，沒登入會跳轉到登入頁面
// router.use((req, res, next) => {
//   const u = req.url.split("?")[0]; // 用split擷取路徑
//   console.log({ u });
//   if (req.method === "GET" && u === "/") {
//     return next();
//   }
//   // 如果session裡沒有登入的資訊
//   if (!req.session.admin) {
//     // 跳轉到登入頁面
//     return res.redirect("/login");
//   }
//   next();
// });

const getListData = async (req) => {
  const perPage = 20; // 每頁幾筆
  // 用戶決定要看第幾頁
  let page = +req.query.page || 1;
  // 關鍵字模糊搜尋(SQL語法%任意字元包變數)
  let keyword = req.query.keyword? req.query.keyword.trim(): "";
  let keyword_ = db.escape(`%{keyword}%`);
  
  let qs = {};  // 用來把 query string 的設定傳給 template

  // 日期的搜尋(在某個日期後的搜尋)
  // 設定開始日期startDate用於搜尋某日期以後的資料
  let startDate = req.query.startDate ? req.query.startDate.trim() : "";
  // 先把資料轉換成dayjs格式
  const startDateD =dayjs(startDate);
  // 如果符合資料格式再轉成YYYY-MM-DD的呈現形式，不符合格式則設定空字串
  if (startDateD.isValid()) {
    startDate = startDateD.format("YYYY-MM-DD");
  } else {
    startDate = "";
  }

  // 日期的搜尋(在某個日期前的搜尋)
  let endDate = req.query.endDate ? req.query.endDate.trim() : "";
  const endDateD = dayjs(endDate);
  if (endDateD.isValid()) {
    endDate = endDateD.format("YYYY-MM-DD");
  } else {
    endDate = "";
  }

  // 設定綜合的where子句
  let where = `WHERE 1`;
  // 關鍵字搜尋只有一欄的情況下要用符合任一的or
  if(keyword){
    where += ` AND (\`name\` LIKE ${keyword_} OR \`mobile\` LIKE ${keyword_} ) `;
  }
  if (startDate) {
    where += ` AND birthday >= '${startDate}' `;
  }
  if (endDate) {
    where += ` AND birthday <= '${endDate}' `;
  }

  let totalRows = 0;
  let totalPages = 0;
  let rows = [];

  let output = {
    success: false,
    page,
    perPage,
    rows,
    totalRows,
    totalPages,

    redirect: "",
    info: "",
  };

  if (page < 1) {
    // 如果頁數小於一，頁面轉向到第一頁
    output.redirect = `?page=1`;
    output.info = `頁碼值小於 1`;
    return output;
  }
const t_sql = "SELECT COUNT(1) totalRows FROM amusement_ride";
  [[{ totalRows }]] = await db.query(t_sql);
  totalPages = Math.ceil(totalRows / perPage);
  if (totalRows > 0) {
    if (page > totalPages) {
      output.redirect = `?page=${totalPages}`;
      output.info = `頁碼值大於總頁數`;
      return {...output, totalRows, totalPages};
    }

    const sql = `SELECT * FROM amusement_ride ORDER BY amusement_ride_id DESC 
    LIMIT ${(page - 1) * perPage}, ${perPage}`;
    [rows] = await db.query(sql);
    output = { ...output, success: true, rows, totalRows, totalPages };
  }

  return output;
}


router.get("/", async (req, res) => {
  const output = await getListData(req);
  res.locals.pageName = "ride_list";
  res.locals.title = "列表|" + res.locals.title;
  // if(output.redirect){
  //   return res.redirect(output.redirect);
  // }
  // // 限制權限，如果沒登入無法使用編輯和刪除的功能(另外弄一個檔案拿掉)
  // if (!req.session.admin) {
  //   res.render("rides/no_login_ride_list", output);
  // } else {
  //   // res.render("rides/list", output);
  //   res.render('rides/ride_list', output);
  // }
  
});

router.get("/api", async (req, res) => {
  res.json( await getListData(req) );
});

router.get("/ride_add", async (req, res) => {
  res.locals.pageName = "ride_add";
  res.render("rides/ride_add");
});
router.post("/ride_add", upload.none(), async (req, res) => {
  const output = {
    success: false,
    postData: req.body, // 除錯用
  };

  const {amusement_ride_name, amusement_ride_img, amusement_ride_longitude, amusement_ride_latitude, ride_category_id, thriller_rating, created_at, ride_support_id, theme_id, amusement_ride_description } = req.body;

  const sql = "INSERT INTO `amusement_ride`(`amusement_ride_name`, `amusement_ride_img`, `amusement_ride_longitude`, `amusement_ride_latitude`, `ride_category_id`, `thriller_rating`, `created_at`, `ride_support_id`, `theme_id`, `amusement_ride_description`) VALUES (?, ?, ?, ?, ?, ?, NOW(),?, ?, ?)";

  try{
    const [result] = await db.query(sql, [
      amusement_ride_name, 
      amusement_ride_img, 
      amusement_ride_longitude, 
      amusement_ride_latitude,
      ride_category_id, 
      thriller_rating, 
      created_at, 
      ride_support_id, 
      theme_id, 
      amusement_ride_description
    ]);
    output.result = result;
    // 用布林值判斷資料是否有被修改(affectedRows是被影響的資料筆數，!!將值轉換成布林值供判斷)
    output.success = !! result.affectedRows;
  } catch (ex) {
    output.exception = ex;
  }
  

  /*必須一個欄位對應一個欄位，欄位多或少都會報錯
  const sql = "INSERT INTO `amusement_ride` SET ?";
  req.body.created_at = new Date();
  const [result] = await db.query(sql, [req.body]);
  */

  /*{
    "fieldCount": 0,
    "affectedRows": 1,  # 影響的列數(筆數)
    "insertId": 1021,   # 取得的 PK (流水號ID)
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0    # 修改時真正有變動的資料筆數
    }*/
  res.json(output);
});

// 設定編輯功能
router.get("/ride_edit/:amusement_ride_id", async (req, res) => {
  res.locals.pageName = "ride_edit";
  const amusement_ride_id = +req.params.amusement_ride_id;
  res.locals.title = "編輯 | " + res.locals.title;
  const sql = ` SELECT * FROM amusement_ride WHERE amusement_ride_id=?`;
  const [rows] = await db.query(sql, [amusement_ride_id]);
  if (!rows.length) {
    return res.redirect(req.baseUrl);
  }
  const row = rows[0];

  res.render("rides/ride_edit", row);
});

router.put("/ride_edit/:amusement_ride_id", async (req, res) => {
  const output = {
    success: false,
    postData: req.body,
    result: null,
  };
  // 用trim()將內容去除頭尾的空白，解決textarea不更動內容就會自動增加空白的問題(textarea會呈現空白的效果導致程式碼換行)
  // 表單檢查
  req.body.amusement_ride_description = req.body.amusement_ride_description.trim();
  const sql = `UPDATE amusement_ride SET ? WHERE amusement_ride_id=?`;
  const [result] = await db.query(sql, [req.body, req.body.amusement_ride_id]);
  output.result = result;
  // changedRows布林值判斷資料是否有更新
  output.success = !!result.changedRows;

  res.json(output);
});



// 設定刪除功能
router.delete("/:amusement_ride_id", async (req, res) => {
  const output = {
    success: false,
    result: null,
  };

  // +轉換成字串
  // 如果amusement_ride_id不存在或小於一直接離開並以JSON檔回傳錯誤訊息output
  const amusement_ride_id = +req.params.amusement_ride_id;
  if (!amusement_ride_id || amusement_ride_id < 1) {
    return res.json(output);
  }

  // 如果amusement_ride_id存在且大於等於1才執行
  const sql = ` DELETE FROM amusement_ride WHERE amusement_ride_id=${amusement_ride_id}`;
  const [result] = await db.query(sql);
  output.result = result;
  output.success = !! result.affectedRows;
  res.json(output);
});


export default router;
