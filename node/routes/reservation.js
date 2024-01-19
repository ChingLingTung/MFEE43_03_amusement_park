import "dotenv/config";
import express from "express";
import db from "../utils/connect-mysql.js";
import upload from "./../utils/upload-imgs.js";
import dayjs from "dayjs";

const router = express.Router();

const getListData = async (req) => {

  const perPage = 20; // 每頁幾筆
  // 用戶決定要看第幾頁
  let page = +req.query.page || 1;
  // 關鍵字模糊搜尋(SQL語法%任意字元包變數)
  // let keyword = (req.query.keyword && typeof req.query.keyword ==='string' ) ? req.query.keyword.trim() : "";
  // let keyword_ = db.escape(`%${keyword}%`);
  
  let qs = {};  // 用來把 query string 的設定傳給 template

  // 設定綜合的where子句
  let where = `WHERE 1 `;
  let user_id = req.query.user_id? req.query.user_id : '';

  if (user_id !==0 && user_id !== '') {
    qs.user_id = user_id;
    where += ` AND user_id = '${user_id}' `;
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
  const t_sql = `SELECT COUNT(1) totalRows FROM \`show_reservation\` JOIN \`show\` on \`show_reservation\`.\`show_id\` = \`show\`.\`show_id\` ${where} ORDER BY \`show\`.start `;
  [[{ totalRows }]] = await db.query(t_sql);
  totalPages = Math.ceil(totalRows / perPage);
  if (totalRows > 0) {
    if (page > totalPages) {
      output.redirect = `?page=${totalPages}`;
      output.info = `頁碼值大於總頁數`;
      return {...output, totalRows, totalPages};
    }

    const sql = `SELECT * FROM \`show_reservation\` JOIN \`show\` on \`show_reservation\`.\`show_id\` = \`show\`.\`show_id\` ${where} ORDER BY \`show\`.start LIMIT ${(page - 1) * perPage}, ${perPage}`;
    [rows] = await db.query(sql,[user_id]);
    rows.forEach((row) => {
      row.show_day = dayjs(row.show_day).format("YYYY/MM/DD");
      row.start = dayjs(row.start).format("HH:mm");
      row.finish = dayjs(row.finish).format("HH:mm");
  })
    output = { ...output, success: true, rows, totalRows, totalPages };
  }
  return output;
  }

  router.get("/api", async (req, res) => {
    res.json( await getListData(req) );
  });

  // TODO:預約表演新增表格
  router.get("/add", async (req, res) => {
    res.render("user/add");
  });
  
  // router.post('/add', check('email').isEmail(), authController)
  router.post("/add", upload.none(), async (req, res) => {
    const output = {
      success: false,
      error:'',
      postData: req.body, // 除錯用
    };
    let { user_name, user_email, user_password, avatar, birthday, phone,  address, user_nickname, rePassword } = req.body;
    const hash = await bcrypt.hash(user_password, 8);
    
    if(user_name===""||user_name.trim().length == 0){
      output.error='姓名為必填'
    }
    const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if(user_email===""||user_email.search(emailRule)===-1){
      output.error='email須符合格式'
    }
    
    if(user_nickname===""){
      user_nickname=user_name
    }
    if(!avatar){
      avatar="/images/user/profile.png";
    }
    if(address===""){
      address=" ";
    }
    if(birthday===""){
      birthday=null;
    }
  
    const phoneRule = /^09\d{8}$/;
      if(phone!==""&& phone.search(phoneRule)===-1){
        output.error='手機號碼須符合格式'
      }
      
    const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/;
      if(user_password===""){
        output.error='密碼為必填'
      }
      if(user_password!==""&& user_password.search(passwordRule)===-1){
        output.error='密碼須符合格式'
  
      }
      if(rePassword!==user_password){
        output.error='兩次輸入的密碼不同'
      }
      // if(!output.success){
      //   return
      // }
    const sql =
      "INSERT INTO `user`(`user_name`, `user_email`, `user_password`, `avatar`, `birthday`, `phone`, `address`, `user_nickname` ) VALUES (?, ?, ?, ?, ?, ?, ?, ? )";
  
    try {
      const [result] = await db.query(sql, [
        user_name,
        user_email,
        hash,
        avatar,
        birthday,
        phone,
        address,
        user_nickname,
      ]);
      output.result = result;
      output.success = !!result.affectedRows;
    } catch (ex) {
      output.exception = ex;
    }
  
    /*
    const sql = "INSERT INTO `user` SET ?";
    // INSERT INTO `user` SET `name`='abc',
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
  export default router;