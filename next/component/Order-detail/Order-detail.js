import React from "react";
import styles from "@/component/Order-detail/Order-detail.module.css";
import Image from "next/image";
// import Link from "next/link";

export default function Order({ product_name = "女鞋", product_price = 1990 }) {

  return (
    <>
      <main className={styles.order_container}>
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
