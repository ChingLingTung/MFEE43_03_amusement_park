import "dotenv/config";
import express from "express";
import db from "../utils/connect-mysql.js";
import upload from "./../utils/upload-imgs.js";
import dayjs from "dayjs";

const router = express.Router();

// 取得該使用者的表演預約資料
const getListData = async (req) => {
  
  const perPage = 20; // 每頁幾筆

  let page = +req.query.page || 1;

  let qs = {};  // 用來把 query string 的設定傳給 template

  // 設定綜合的where子句
  let where = `WHERE 1 `;
  let user_id = req.query.user_id? req.query.user_id : '';
  let show_id = req.query.show_id? req.query.show_id : '';

  if (user_id !==0 && user_id !== '') {
    qs.user_id = user_id;
    where += ` AND user_id = '${user_id}' `;
  };
  if (show_id) {
    qs.show_id = show_id;
    where += ` AND show.show_id = '${show_id}' `;
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
      row.seat_number = JSON.parse(row.seat_number);
  })
    output = { ...output, success: true, rows, totalRows, totalPages };
  }
  return output;
  }

  router.get("/api", async (req, res) => {
    res.json( await getListData(req) );
  });

  // 預約表演新增預約資料
  router.post("/add/api", upload.none(), async (req, res) => {

    const output = {
      success: false,
      error:'',
      postData: req.body,
    };
    
    let { user_id, show_id, selected_seat } = req.body;
    if(!user_id){
      output.error='使用者未登入'
      return output
    }
    if(!show_id){
      output.error='未取得預約的表演項目'
      return output
    }
    if(selected_seat===""){
      output.error='使用者未選取任何座位'
      return output
    }
    // if(user_id && show_id && selectedSeat !=[]){
    //   qs.user_id = user_id;
    //   qs.show_id = show_id;
    //   qs.selectedSeat = selectedSeat;
    // }

    const sql =
      "INSERT INTO \`show_reservation\`(`user_id`, `show_id`, `seat_number` ) VALUES (?, ?, ? )";
  
    try {
      const [result] = await db.query(sql, [
        user_id,
        show_id,
        JSON.stringify(selected_seat)
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

  // 預約表演更改預約資料
  router.post("/edit/api", upload.none(), async (req, res) => {

    const output = {
      success: false,
      error:'',
      postData: req.body,
    };
    
    let { user_id, show_id, selected_seat } = req.body;
    if(!user_id){
      output.error='使用者未登入'
      return output
    }
    if(!show_id){
      output.error='未取得預約的表演項目'
      return output
    }
    if(selected_seat===""){
      output.error='使用者未選取任何座位'
      return output
    }


    // if(user_id && show_id && selectedSeat !=[]){
    //   qs.user_id = user_id;
    //   qs.show_id = show_id;
    //   qs.selectedSeat = selectedSeat;
    // }

    const sql =
      "UPDATE \`show_reservation\` SET seat_number = ? WHERE `user_id`=? AND show_id = ?";
  
    try {
      const [result] = await db.query(sql, [
        JSON.stringify(selected_seat),
        user_id,
        show_id
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

  // 刪除某筆表演預約資料
  router.delete("/delete/:show_reserve_id", async (req, res) => {
    const output = {
      success: false,
      result: null,
    };
    const show_reserve_id = +req.params.show_reserve_id;
    if (!show_reserve_id || show_reserve_id < 1) {
      return res.json(output);
    }
  
    const sql = ` DELETE FROM \`show_reservation\` WHERE show_reserve_id=${show_reserve_id}`;
    const [result] = await db.query(sql);
    output.result = result;
    output.success = !!result.affectedRows;
    res.json(output);
  });
  export default router;