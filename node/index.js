import "dotenv/config";
import express from "express";
import session from "express-session";
import dayjs from "dayjs";
import moment from "moment-timezone";
import cors from "cors";
import mysql_session from "express-mysql-session";
import bcrypt from "bcryptjs";

import  jwt  from "jsonwebtoken";
import loginRouter from "./routes/login.js"
import rideRouter from "./routes/ride.js";
import showRouter from "./routes/show.js"
import db from "./utils/connect-mysql.js";
import upload from "./utils/upload-imgs.js";
import sales from "./data/sales.json" assert { type: "json" };
import admin2Router from "./routes/admin2.js";
import productListRouter from "./routes/product.js";
import detailRouter from "./routes/detail.js";
import cartRouter from "./routes/cart.js";
import ticketRouter from "./routes/ticket.js";

// import multer from "multer";
// const upload = multer({ dest: "tmp_uploads/" });
import orderRouter from './routes/order.js'
import userpayRouter from './routes/userpay.js'

// import multer from "multer";
// const upload = multer({ dest: "tmp_uploads/" });


const app = express();

app.set("view engine", "ejs");

// top-level middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const MysqlStore = mysql_session(session);
const sessionStore = new MysqlStore({}, db);
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    store: sessionStore,
    secret: "kdgdf9485498KIUGLKIU45490",
  })
);

// 自訂頂層 middleware
app.use((req, res, next) => {
  res.locals.title = "小景頁的網站";
  res.locals.pageName = "";

  res.locals.toDateString = (d) => dayjs(d).format("YYYY-MM-DD");
  res.locals.toDateTimeString = (d) => dayjs(d).format("YYYY-MM-DD HH:mm:ss");

  res.locals.session = req.session;  // 讓 templates 可以取用 session
  const auth = req.get("Authorization");
  // 處理token，將Authorization的值去掉Bearer 只取單純的token值
  if(auth && auth.indexOf("Bearer ")===0){
    const token = auth.slice(7);
    // 避免因為token錯誤報錯，用try catch包起來但不對錯誤的token做任何處理
    try{
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // console.log({payload});

      // 將token的登入狀態傳遞下去供其他需要驗證登入的網頁使用
      res.locals.jwt = payload;
    } catch (ex) {}
  }
  // 測試用
  // res.locals.jwt = { id: 1, email: "DrinkAllDay@iSpan.com" };
  next();
});
// 定義路由
// 首頁在最上面
app.get("/", (req, res) => {
  res.locals.title = "首頁 | " + res.locals.title;

  res.render("home", { name: process.env.DB_NAME });
});
app.get("/json-sales", (req, res) => {
  res.locals.title = "JSON資料 | " + res.locals.title;
  res.locals.pageName = "json-sales";

  res.render("json-sales", { sales });
});

app.get(/^\/m\/09\d{2}-?\d{3}-?\d{3}$/i, (req, res) => {
  let u = req.url.slice(3).split("?")[0];
  u = u.split("-").join("");

  res.send({ u });
});
app.use("/ride", rideRouter);
app.use("/admins", admin2Router);
app.use("/product", productListRouter);
app.use("/cart", cartRouter);
app.use("/ticket", ticketRouter);
app.use("/detail", detailRouter);
app.use("/order", orderRouter);
app.use("/userpay", userpayRouter);
app.use("/show", showRouter);
app.get("/try-sess", (req, res) => {
  req.session.n = req.session.n || 0;
  req.session.n++;
  res.json(req.session);
});

app.get("/try-moment", (req, res) => {
  const fm = "YYYY-MM-DD HH:mm:ss";
  const m1 = moment();
  const m2 = moment("12-10-11");
  const m3 = moment("12-10-11", "DD-MM-YY");
  const d1 = dayjs();
  const d2 = dayjs("2023-11-15");
  const a1 = new Date();
  const a2 = new Date("2023-11-15");

  res.json({
    m1: m1.format(fm),
    m2: m2.format(fm),
    m3: m3.format(fm),
    m1a: m1.tz("Europe/Berlin").format(fm),
    d1: d1.format(fm),
    d2: d2.format(fm),
    a1,
    a2,
  });
});

app.get("/try-db", async (req, res) => {
  const [results, fields] = await db.query(
    `SELECT * FROM \`categories\` LIMIT 5`
  );
  res.json(results);
});

app.get("/login", async (req, res) => {
  res.render("login");
});
app.post("/login-jwt", async (req, res) => {
  const output = {
    success: false,
    code: 0,
    postData: req.body,
  };
  if (!req.body.user_account || !req.body.user_password) {
    // 資料不足
    output.code = 410;
    return res.json(output);
  }
  const sql = "SELECT * FROM user WHERE user_account=?";
  const [rows] = await db.query(sql, [req.body.email]);

  if (!rows.length) {
    // 帳號是錯的
    output.code = 400;
    return res.json(output);
  }
  const row = rows[0];
  const pass = await bcrypt.compare(req.body.user_password, row.user_password);
  if (!pass) {
    // 密碼是錯的
    output.code = 420;
    return res.json(output);
  }

  output.code = 200;
  output.success = true;
  // 設定 session
  req.session.admin = {
    id: row.id,
    email: row.user_account,
    nickname: row.user_nickname,
  };
  output.user = req.session.admin;
  res.json(output);
});
app.get("/logout", async (req, res) => {
  delete req.session.admin;
  res.redirect("/");
});
// 設定靜態內容的資料夾
app.use(express.static("public"));
app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));
app.use("/jquery", express.static("node_modules/jquery/dist"));

// *************** 404 page *** 所有的路由都要放在此之前
app.use((req, res) => {
  res.status(404).send(`<h1>404 Not Found</h1>`);
});

const port = process.env.WEB_PORT || 3001;

app.listen(port, () => {
  console.log(`express server: ${port}`);
});



