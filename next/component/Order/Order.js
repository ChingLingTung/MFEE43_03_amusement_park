import React from "react";
import styles from "@/component/Order/Order.module.css";
import Image from "next/image";
// import Link from "next/link";
import Paystep from "../Userpay/Paystep/Paystep";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";


export default function Order({ product_name = "女鞋", product_price = 1990 }) {
  return (
    <>
      <Paystep />
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
          <div className={styles.order_nav_code}>OD20240104001</div>
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
      </main>
    </>
  );
}
