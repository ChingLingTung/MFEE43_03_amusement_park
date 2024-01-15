import React from "react";
import styles from "@/component/Userpay/Userpay.module.css";
import Image from "next/image";
// import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import Paystep from "./Paystep/Paystep"; 

export default function Userpay({
  product_name = "女鞋",
  product_price = 1990,
}) {
  return (
    <>
      <Paystep />

      <main className={styles.form_container}>
        <div className={styles.recipient_information}>
          <div>收件人資料</div>
          <div>
            <input type="radio" /> 同收件人資料{" "}
          </div>
        </div>
      </main>
      <main className={styles.form_container1}>
        <div className={styles.form_dflex}>
          <div className={styles.recipient_descs}>
            <div>
              <span>*</span> 收件人姓名{" "}
            </div>
            <div>
              <input type="text" placeholder="請輸入姓名" />
            </div>
          </div>
          <div className={styles.recipient_descs}>
            <div>
              <span>*</span> 收件人email{" "}
            </div>
            <div>
              <input type="text" placeholder="請輸入email" />
            </div>
          </div>
        </div>
        <div className={styles.form_dflex}>
        <div className={styles.recipient_descs}>
            <div>
              <span>*</span> 收件人手機{" "}
            </div>
            <div>
              <input type="text" placeholder="請輸入手機" />
            </div>
          </div>
          <div className={styles.recipient_descs}>
            <div>
              <span>*</span> 收件人電話{" "}
            </div>
            <div className={styles.ml50}>
              <input type="text" placeholder="請輸入電話" />
            </div>
          </div>
        </div>
        <div className={styles.recipient_descs_address}>
          <div className={styles.recipient_address}>收件人地址</div>
          <div className={styles.recipient_textarea}>
            <textarea
              cols=""
              rols=""
              placeholder="請輸入地址"
              defaultValue={""}
            />
          </div>
        </div>
      </main>
      <main className={styles.form_container}>
        <div className={styles.logistics}>
          <div className={styles.logistics_title}>發票類型</div>
          <div className={styles.logistics_descs}>
            <div>
              <input type="radio" name="bill" /> 雲端發票
            </div>
            <div>
              <input type="radio" name="bill" /> 公司發票
            </div>
            <div>
              <input type="radio" name="bill" className="ml30" /> 發票捐贈
            </div>
          </div>
        </div>
        <div className={styles.logistics}>
          <div className={styles.logistics_title}>付款方式</div>
          <div className={styles.logistics_descs}>
            <div>
              <input type="radio" name="pay" /> 行動支付
            </div>
            <div>
              <input type="radio" name="pay" /> 信用卡支付
            </div>
            <div>
              <input type="radio" name="pay" /> 超商付款
            </div>
          </div>
        </div>
        <div className={styles.logistics}>
          <div className={styles.logistics_title}>取貨方式</div>
          <div className={styles.logistics_descs}>
            <div>
              <input type="radio" name="address" /> 收件地址
            </div>
            <div>
              <input type="radio" name="address" /> 超商取貨
            </div>
          </div>
        </div>
        <div className={styles.logistics}>
          <div className={styles.credit_descs1}>
            <div className={styles.credit_title}>信用卡號</div>
            <div className={styles.credit_desc}>
              <input type="text" placeholder="XXXX" />
              <span>-</span>
              <input type="text" placeholder="XXXX" />
              <span>-</span>
              <input type="text" placeholder="XXXX" />
            </div>
          </div>
          <div className={styles.credit_descs2}>
            <div className={styles.credit_title}>末三碼</div>
            <div className={styles.credit_desc}>
              <input type="text" placeholder={123} />
            </div>
          </div>
          <div className={styles.credit_descs2}>
            <div className={styles.credit_title}>有效日期</div>
            <div className={styles.credit_desc}>
              <input type="text" placeholder="12/3456" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
