import "dotenv/config";
import express from "express";
import session from "express-session";
import dayjs from "dayjs";
import cors from "cors";
import mysql_session from "express-mysql-session";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import lodash from "lodash";
import bodyParser from "body-parser";
import loginRouter from "./routes/login.js"
import rideRouter from "./routes/ride.js";
import showRouter from "./routes/show.js"
import shopRouter from "./routes/restaurant.js"
import db from "./utils/connect-mysql.js";
import maintainRouter from './routes/maintain.js'
import registerRouter from "./routes/register.js"
import getProfileRouter from "./routes/get_profile.js"



// import multer from "multer";
// const upload = multer({ dest: "tmp_uploads/" });

// const bodyParser = require('body-parser');
// const _ = require('lodash');

const app = express();

app.set("view engine", "ejs");

// top-level middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload({
  createParentPath: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

//讓uploads目錄公開
// https://expressjs.com/zh-tw/starter/static-files.html
//app.use(express.static('uploads'));
// 如果想要改網址路徑用下面的
// 您可以透過 /static 路徑字首，來載入 uploads 目錄中的檔案。
app.use('/uploads', express.static('uploads'));

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
    }catch(ex){}
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

// app.get(/^\/m\/09\d{2}-?\d{3}-?\d{3}$/i, (req, res) => {
//   let u = req.url.slice(3).split("?")[0];
//   u = u.split("-").join("");

//   res.send({ u });
// });

app.use("/ride", rideRouter);
app.use("/show", showRouter);
app.use("/shop", shopRouter);
app.use("/maintenance", maintainRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/getProfile", getProfileRouter);
app.get("/try-sess", (req, res) => {
  req.session.n = req.session.n || 0;
  req.session.n++;
  res.json(req.session);
});

app.get("/login", async (req, res) => {
  res.render("login");
});
app.get("/register", async (req, res) => {
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
  res.redirect('/');
});

app.get("/try-jw1", async(req,res)=>{
  // jwt 加密(.env的設定中再加一項)
  const token = jwt.sign({id:1, account: "DrinkAllDay@iSpan.com"},process.env.JWT_SECRET);
  res.json({token});
});
app.get("/try-jw2", async(req,res)=>{
  // 解密
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImFjY291bnQiOiJzaGluIiwiaWF0IjoxNzAzNTYxMDU2fQ.ZgaJZX1cNMH-GG99dQJRz-pJGqquf9LTBmgsSw7iPHE";
  const payload = jwt.verify(token,process.env.JWT_SECRET);
  res.json({payload});
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
