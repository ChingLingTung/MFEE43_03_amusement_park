import express from "express";
import createCheckMac from "../utils/checkmac.js";

const router = express.Router();

// 存取`.env`設定檔案使用
import "dotenv/config.js";

const ecpay_credit_api =
  "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5";

// 註: 本路由與資料庫無關，單純轉向使用

// POST
router.post("/payment", function (req, res, next) {
  console.log('payment')
  const baseParam = {
    MerchantID: "3002607",
    MerchantTradeNo: "test334567890123",
    MerchantTradeDate: "2023/01/21 15:30:13",
    PaymentType: "aio",
    TotalAmount: 8787,
    TradeDesc: "aasdf",
    ItemName: "asdf",
    ReturnURL: "https://google.com",
    ChoosePayment: "Credit",
    EncryptType: 1,
  };

  const html = `
  <form action=${ecpay_credit_api} method="POST" name="payment" style="display: none;">
    <input name="MerchantID" value="${baseParam.MerchantID}"/>
    <input name="MerchantTradeNo" value="${baseParam.MerchantTradeNo}" />
    <input name="MerchantTradeDate" value="${baseParam.MerchantTradeDate}" />
    <input name="PaymentType" value="${baseParam.PaymentType}" />
    <input name="TotalAmount" value="${baseParam.TotalAmount}" />
    <input name="TradeDesc" value="${baseParam.TradeDesc}" />
    <input name="ItemName" value="${baseParam.ItemName}" />
    <input name="ReturnURL" value="${baseParam.ReturnURL}" />
    <input name="ChoosePayment" value="${baseParam.ChoosePayment}" />
    <input name="EncryptType" value="${baseParam.EncryptType}" />
    <input name="CheckMacValue" value="${createCheckMac(baseParam)}" />
    <button type="submit">Submit</button>
  </form>
`;

  res.json({
    data: html,
  });
  // //console.log(req.body)
  // res.redirect(callback_url + '?' + new URLSearchParams(req.body).toString())
});

// 測試路由用
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'shipment route is OK' })
// })

export default router;
