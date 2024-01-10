import express from "express";
import db from "./../utils/connect-mysql.js";
import upload from "./../utils/upload-imgs.js";
import dayjs from "dayjs";

const router = express.Router();

router.use((req, res, next) => {
  const u = req.url.split("?")[0]; // 只要路徑
  console.log({ u });
  if (req.method === "GET" && u === "/") {
    return next();
  }
  /*
  if (!req.session.admin) {
    return res.redirect("/login");
  } */
  next();
});

const getListData = async (req) => {
  const perPage = 20; // 每頁幾筆
  let page = +req.query.page || 1; // 用戶決定要看第幾頁
  let keyword =
    req.query.keyword && typeof req.query.keyword === "string"
      ? req.query.keyword.trim()
      : "";
  let keyword_ = db.escape(`%${keyword}%`);

  let qs = {}; // 用來把 query string 的設定傳給 template
  // 起始的日期
  let startDate = req.query.startDate ? req.query.startDate.trim() : "";
  const startDateD = dayjs(startDate);
  if (startDateD.isValid()) {
    startDate = startDateD.format("YYYY-MM-DD");
  } else {
    startDate = "";
  }

  // 結束的日期
  let endDate = req.query.endDate ? req.query.endDate.trim() : "";
  const endDateD = dayjs(endDate);
  if (endDateD.isValid()) {
    endDate = endDateD.format("YYYY-MM-DD");
  } else {
    endDate = "";
  }

  let where = ` WHERE 1 `;
  if (keyword) {
    qs.keyword = keyword;
    where += ` AND ( \`pdcate_id \` LIKE ${keyword_} OR \`pdcolor_id\` LIKE ${keyword_} OR \`pdstyle_id\` LIKE ${keyword_} OR \`pdsize_id\` LIKE ${keyword_}) `;
  }
  // if (startDate) {
  //   qs.startDate = startDate;
  //   where += ` AND birthday >= '${startDate}' `;
  // }
  // if (endDate) {
  //   qs.endDate = endDate;
  //   where += ` AND birthday <= '${endDate}' `;
  // }

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
    output.redirect = `?page=1`;
    output.info = `頁碼值小於 1`;
    return output;
  }

  const t_sql = `SELECT COUNT(1) totalRows FROM product_stock ${where}`;
  [[{ totalRows }]] = await db.query(t_sql);
  totalPages = Math.ceil(totalRows / perPage);
  if (totalRows > 0) {
    if (page > totalPages) {
      output.redirect = `?page=${totalPages}`;
      output.info = `頁碼值大於總頁數`;
      return { ...output, totalRows, totalPages };
    }

    const sql = `SELECT * FROM ((((product_stock JOIN product_color ON product_stock.pdcolor_id = product_color.pdcolor_id) JOIN product_category ON product_stock.pdcate_id = product_category.pdcate_id) JOIN product_style ON product_stock.pdstyle_id = product_style.pdstyle_id) JOIN product_list ON product_stock.product_id = product_list.product_id) JOIN product_size ON product_stock.pdsize_id = product_size.pdsize_id ${where} ORDER BY pdstock_id DESC 
    LIMIT ${(page - 1) * perPage}, ${perPage}`;
    [rows] = await db.query(sql);
    output = { ...output, success: true, rows, totalRows, totalPages };
  }

  return output;
};

router.get("/", async (req, res) => {
  res.locals.pageName = "PD-detail";
  res.locals.title = "詳細列表 | " + res.locals.title;
  const output = await getListData(req);
  if (output.redirect) {
    return res.redirect(output.redirect);
  }

  if (!req.session.admin) {
    res.render("detail/list-no-admin", output);
  } else {
    res.render("detail/list", output);
  }
});

router.get("/api", async (req, res) => {
  res.json(await getListData(req));
  /*
  if(res.locals.jwt?.id){
    return res.json(await getListData(req));
  } else {
    return res.json({success: false, error: "沒有授權, 不能取得資料"});
  }
  */
});

// router.get("/add", async (req, res) => {
//   res.render("product/add");
// });
router.post("/add", upload.none(), async (req, res) => {
  const output = {
    success: false,
    postData: req.body, // 除錯用
  };

  const {
    product_id,
    pdcate_id,
    pdsize_id,
    pdcolor_id,
    pdstyle_id,
    pdstock_quantity,
    pd_picture,
  } = req.body;
  const sql =
    "INSERT INTO `product_stock`( `product_id,`, `pdcate_id`, `pdsize_id`,`pdcolor_id`, `pdstyle_id`, `pdstock_quantity`, `pd_picture`) VALUES (?, ?, ?, ?, ?, ?, ?)";

  try {
    const [result] = await db.query(sql, [
      product_id,
      pdcate_id,
      pdsize_id,
      pdcolor_id,
      pdstyle_id,
      pdstock_quantity,
      pd_picture,
    ]);
    output.result = result;
    output.success = !!result.affectedRows;
  } catch (ex) {
    output.exception = ex;
  }

  /*
  const sql = "INSERT INTO `product_stock` SET ?";
  // INSERT INTO `product_stock` SET `product_name`='abc',
  req.body.created_at = new Date();
  const [result] = await db.query(sql, [req.body]);
  */

  // {
  //   "fieldCount": 0,
  //   "affectedRows": 1,  # 影響的列數
  //   "insertId": 1021,   # 取得的 PK
  //   "info": "",
  //   "serverStatus": 2,
  //   "warningStatus": 0,
  //   "changedRows": 0    # 修改時真正有變動的資料筆數
  // }

  res.json(output);
});

router.get("/edit/:pdstock_id", async (req, res) => {
  const pdstock_id = +req.params.pdstock_id;
  res.locals.title = "編輯 | " + res.locals.title;

  const sql = `SELECT * FROM product_stock WHERE pdstock_id=?`;
  const [rows] = await db.query(sql, [pdstock_id]);
  if (!rows.length) {
    return res.redirect(req.baseUrl);
  }
  // const row = rows[0];
  // row.birthday2 = dayjs(row.birthday).format("YYYY-MM-DD");

  res.render("pdstock_id/edit");
});

// 取得單筆的資料
router.get("/api/edit/:pdstock_id", async (req, res) => {
  const pdstock_id = +req.params.pdstock_id;

  const sql = `SELECT * FROM product_stock WHERE pdstock_id=?`;
  const [rows] = await db.query(sql, [pdstock_id]);
  if (!rows.length) {
    return res.json({ success: false });
  }
  const row = rows[0];
  row.price = dayjs(row.price).format("YYYY-MM-DD");

  res.json({ success: true, row });
});

router.put("/edit/:pdstock_id", async (req, res) => {
  const output = {
    success: false,
    postData: req.body,
    result: null,
  };
  // TODO: 表單資料檢查
  req.body.product = req.body.product.trim(); // 去除頭尾空白
  const sql = `UPDATE product_stock SET ? WHERE pdstock_id=?`;
  const [result] = await db.query(sql, [req.body, req.body.pdstock_id]);
  output.result = result;
  output.success = !!result.changedRows;

  res.json(output);
});

router.delete("/:pdstock_id", async (req, res) => {
  const output = {
    success: false,
    result: null,
  };
  const pdstock_id = +req.params.pdstock_id;
  if (!pdstock_id || pdstock_id < 1) {
    return res.json(output);
  }

  const sql = ` DELETE FROM product_stock WHERE pdstock_id=${pdstock_id}`;
  const [result] = await db.query(sql);
  output.result = result;
  output.success = !!result.affectedRows;
  res.json(output);
});
export default router;
