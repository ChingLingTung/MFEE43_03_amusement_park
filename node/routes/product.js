import "dotenv/config";
import express from "express";
import db from "../utils/connect-mysql.js";
import upload from "./../utils/upload-imgs.js";
import dayjs from "dayjs";

const router = express.Router();

// router.get("/", async (req, res) => {
//   const sql = "SELECT * FROM product_list ORDER BY product_id";
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
//     const sql = `SELECT * FROM amusement_ride ORDER BY product_id DESC
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
router.use((req, res, next) => {
  const u = req.url.split("?")[0]; // 用split擷取路徑
  console.log({ u });
  if (req.method === "GET" && u === "/") {
    return next();
  }
  //   // 如果session裡沒有登入的資訊
  //   if (!req.session.admin) {
  //     // 跳轉到登入頁面
  //     return res.redirect("/login");
  //   }
  next();
});

const getListData = async (req) => {
  const perPage = 20; // 每頁幾筆
  // 用戶決定要看第幾頁
  let page = +req.query.page || 1;
  // 關鍵字模糊搜尋(SQL語法%任意字元包變數)
  let keyword =
    req.query.keyword && typeof req.query.keyword === "string"
      ? req.query.keyword.trim()
      : "";
  let keyword_ = db.escape(`%${keyword}%`);

  let qs = {}; // 用來把 query string 的設定傳給 template
  let pdcate_id = req.query.pdcate_id ? req.query.pdcate_id : "";
  let pdstyle_id = req.query.pdstyle_id ? req.query.pdstyle_id : "";
  let pdsize_id = req.query.pdsize_id ? req.query.pdsize_id : "";
  let pdcolor_id = req.query.pdcolor_id ? req.query.pdcolor_id : "";
  // 設定綜合的where子句
  let where = `WHERE 1 `;
  // 關鍵字搜尋只有一欄的情況下要用符合任一的or
  if (keyword) {
    qs.keyword = keyword;
    where += ` AND (\`product_name\` LIKE ${keyword_}) `;
  }
  if (pdcate_id !== 0 && pdcate_id !== "") {
    qs.pdcate_id = pdcate_id;
    where += ` AND pdcate_id = '${pdcate_id}' `;
  }
  if (pdstyle_id !== 0 && pdstyle_id !== "") {
    qs.pdstyle_id = pdstyle_id;
    where += ` AND pdstyle_id = '${pdstyle_id}' `;
  }
  if (pdsize_id !== 0 && pdsize_id !== "") {
    qs.pdsize_id = pdsize_id;
    where += ` AND pdsize_id = '${pdsize_id}' `;
  }
  if (pdcolor_id !== 0 && pdcolor_id !== "") {
    qs.pdcolor_id = pdcolor_id;
    where += ` AND pdcolor_id = '${pdcolor_id}' `;
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
    qs,
    redirect: "",
    info: "",
  };

  if (page < 1) {
    // 如果頁數小於一，頁面轉向到第一頁
    output.redirect = `?page=1`;
    output.info = `頁碼值小於 1`;
    return output;
  }


  const t_sql = `SELECT COUNT(1) totalRows FROM (((((((product_list JOIN product_color ON product_list.pdcolor_id = product_color.pdcolor_id) JOIN product_category ON product_list.pdcate_id = product_category.pdcate_id) JOIN product_style ON product_list.pdstyle_id = product_style.pdstyle_id) JOIN product_size ON product_list.pdsize_id = product_size.pdsize_id) JOIN pdasize_list ON product_list.product_id = pdasize_list.product_id) JOIN pdacolor_list ON product_list.product_id = pdacolor_list.product_id) JOIN pdastyle_list ON product_list.product_id = pdastyle_list.product_id) JOIN pdacate_list ON product_list.product_id = pdacate_list.product_id ${where}`;
  [[{ totalRows }]] = await db.query(t_sql);
  totalPages = Math.ceil(totalRows / perPage);
  if (totalRows > 0) {
    if (page > totalPages) {
      output.redirect = `?page=${totalPages}`;
      output.info = `頁碼值大於總頁數`;
      return { ...output, totalRows, totalPages };
    }

    const sql = `SELECT * FROM (((((((product_list JOIN product_color ON product_list.pdcolor_id = product_color.pdcolor_id) JOIN product_category ON product_list.pdcate_id = product_category.pdcate_id) JOIN product_style ON product_list.pdstyle_id = product_style.pdstyle_id) JOIN product_size ON product_list.pdsize_id = product_size.pdsize_id) JOIN pdasize_list ON product_list.product_id = pdasize_list.product_id) JOIN pdacolor_list ON product_list.product_id = pdacolor_list.product_id) JOIN pdastyle_list ON product_list.product_id = pdastyle_list.product_id) JOIN pdacate_list ON product_list.product_id = pdacate_list.product_id ${where} ORDER BY product_list.product_id 
    LIMIT ${(page - 1) * perPage}, ${perPage}`;
    [rows] = await db.query(sql);
    output = { ...output, success: true, rows, totalRows, totalPages };
  }

  return output;
};

// router.get("/", async (req, res) => {
//   const output = await getListData(req);
//   res.locals.pageName = "ride_list";
//   res.locals.title = "列表|" + res.locals.title;
//   if(output.redirect){
//     return res.redirect(output.redirect);
//   }
//   // 限制權限，如果沒登入無法使用編輯和刪除的功能(另外弄一個檔案拿掉)
//   if (!req.session.admin) {
//     res.render("rides/no_login_ride_list", output);
//   } else {
//     // res.render("rides/list", output);
//     res.render('rides/ride_list', output);
//   }
// });

router.get("/api", async (req, res) => {
  res.json(await getListData(req));
});

// 取得單筆的資料
router.get("/api/:product_id", async (req, res) => {
  const product_id = +req.params.product_id;

  const sql = `SELECT * FROM (((((((product_list JOIN product_color ON product_list.pdcolor_id = product_color.pdcolor_id) JOIN product_category ON product_list.pdcate_id = product_category.pdcate_id) JOIN product_style ON product_list.pdstyle_id = product_style.pdstyle_id) JOIN product_size ON product_list.pdsize_id = product_size.pdsize_id) JOIN pdasize_list ON product_list.product_id = pdasize_list.product_id) JOIN pdacolor_list ON product_list.product_id = pdacolor_list.product_id) JOIN pdastyle_list ON product_list.product_id = pdastyle_list.product_id) JOIN pdacate_list ON product_list.product_id = pdacate_list.product_id WHERE product_list.product_id=?`;
  const [rows] = await db.query(sql, [product_id]);
  if (!rows.length) {
    return res.json({ success: false });
  }
  const row = rows[0];
  // row.birthday = dayjs(row.birthday).format("YYYY-MM-DD");

  res.json({ success: true, row });
});

export default router;
