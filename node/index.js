// import "dotenv/config";
import express from "express";
import session from "express-session";
import dayjs from "dayjs";
import cors from "cors";
import mysql_session from "express-mysql-session";
import bcrypt from "bcryptjs";

// import multer from "multer";
// const upload = multer({ dest: "tmp_uploads/" });
import db from "./utils/connect-mysql.js";

const app = express();

// app.set("view engine", "ejs");

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
  res.locals.title = "網站名稱";
  res.locals.pageName = "";

  res.locals.toDateString = (d) => dayjs(d).format("YYYY-MM-DD");
  res.locals.toDateTimeString = (d) => dayjs(d).format("YYYY-MM-DD HH:mm:ss");

  res.locals.session = req.session;  // 讓 templates 可以取用 session
  next();
});
// 定義路由
// 首頁在最上面
// app.get("/", (req, res) => {
//   res.locals.title = "首頁 | " + res.locals.title;

//   res.render("home", { name: process.env.DB_NAME });
// });

app.get(/^\/m\/09\d{2}-?\d{3}-?\d{3}$/i, (req, res) => {
  let u = req.url.slice(3).split("?")[0];
  u = u.split("-").join("");

  res.send({ u });
});

app.get("/try-sess", (req, res) => {
  req.session.n = req.session.n || 0;
  req.session.n++;
  res.json(req.session);
});

app.get("/login", async (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  const output = {
    success: false,
    code: 0,
    postData: req.body,
  };
  if (!req.body.email || !req.body.password) {
    // 資料不足
    output.code = 410;
    return res.json(output);
  }
  const sql = "SELECT * FROM members WHERE email=?";
  const [rows] = await db.query(sql, [req.body.email]);

  if (!rows.length) {
    // 帳號是錯的
    output.code = 400;
    return res.json(output);
  }
  const row = rows[0];
  const pass = await bcrypt.compare(req.body.password, row.password);
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
    email: row.email,
    nickname: row.nickname,
  };
  output.member = req.session.admin;
  res.json(output);
});
app.get("/logout", async (req, res) => {
  delete req.session.admin;
  res.redirect('/');
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
