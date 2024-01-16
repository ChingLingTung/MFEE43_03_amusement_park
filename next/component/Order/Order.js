import React from "react";
import styles from "@/component/Order/Order.module.css";
import Image from "next/image";
// import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export default function Order({
  order_id = "0",
  order_date = "2024/01/01",
}) {
  return (
    <>
      <main className={styles.order_container}>
        <div className={styles.order_title}>訂單列表</div>
        <div className={styles.order_nav_head}>
          <div className={styles.order_nav_codeT}>訂單編號</div>
          <div className={styles.order_nav_titles}>
            <div>訂單日期</div>
            <div>金額</div>
            <div>訂單狀態</div>
            <div>訂單明細</div>
          </div>
        </div>

        <div className={styles.order_nav}>
          <div className={styles.order_nav_code}>{order_id}</div>
          <div className={styles.order_nav_titles}>
            <div>{order_date}</div>
            <div>$2,000</div>
            <div>未完成</div>
            <div>
              <IoIosArrowDown className={styles.order_icon} />
            </div>
          </div>
        </div>

        <div className={styles.order_nav}>
          <div className={styles.order_nav_code}>OD20240104002</div>
          <div className={styles.order_nav_titles}>
            <div>2024/01/04</div>
            <div>$2,000</div>
            <div>未完成</div>
            <div>
              <IoIosArrowDown className={styles.order_icon} />
            </div>
          </div>
        </div>

        <div className={styles.order_nav}>
          <div className={styles.order_nav_code}>OD20240104003</div>
          <div className={styles.order_nav_titles}>
            <div>2024/01/04</div>
            <div>$2,000</div>
            <div>未完成</div>
            <div>
              <IoIosArrowUp className={styles.order_icon} />
            </div>
          </div>
        </div>

        <div className={styles.order_detail_nav}>
          <img src="/images/product/list/micky-1.webp" alt="..." />
          <div className={styles.order_details}>
            <div>米奇短袖T-shirt Size: XL 顏色: 白</div>
            <div>數量: 1</div>
            <div>$2,000</div>
          </div>
        </div>

        <div className={styles.order_detail_nav}>
          <img src="/images/product/list/micky-1.webp" alt="..." />
          <div className={styles.order_details}>
            <div>米奇短袖T-shirt Size: XL 顏色: 白</div>
            <div>數量: 1</div>
            <div>$2,000</div>
          </div>
        </div>

        <div className={styles.order_detail_nav}>
          <img src="/images/product/list/micky-1.webp" alt="..." />
          <div className={styles.order_details}>
            <div>米奇短袖T-shirt Size: XL 顏色: 白</div>
            <div>數量: 1</div>
            <div>$12,000</div>
          </div>
        </div>

        <div className={styles.payment_details}>
          <span>付款方式: 行動支付</span>
          <span>發票類型: 捐贈發票</span>
          <span>取貨方式: 宅配地址</span>
        </div>

        <div className={styles.payment_address}>
          <span>取貨地址: 台北市大安區信義路三段178號1樓 鑫復門市</span>
        </div>
      </main>
    </>
  );
}
