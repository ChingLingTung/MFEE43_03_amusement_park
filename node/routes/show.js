import "dotenv/config";
import express from "express";
import db from "../utils/connect-mysql.js";
import upload from "./../utils/upload-imgs.js";
import dayjs from "dayjs";

const router = express.Router();

router.get("/", async (req, res) => {
  const sql = "SELECT * FROM show ORDER BY show_id";
  const [rows] = await db.query(sql);
  res.json(rows);
});



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
  // const sql = "SELECT * FROM show ORDER BY show_id";
  // const [rows] = await db.query(sql);
  // if (!rows.length) {
  //   return res.json({success: false});
  // }
  // const row = rows[0];
  // res.json({success: true, row});
  }

  router.get("/", async (req, res) => {
    const output = await getListData(req);
    res.locals.pageName = "show_list";
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
export default router;
