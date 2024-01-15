import React from "react";
import Image from "next/image";
// import Link from "next/link";;
import { Layout } from "@/component/Layout";
// import Order from "@/component/Order/Order";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Paystep from "@/component/Userpay/Paystep/Paystep";
import styles from '@/component/Order/Order.module.css'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { AB_ORDER } from "@/component/product-const";

export default function List() {
  // console.log("window.location.href:", window.location.href);
  const [data, setData] = useState({});
  const router = useRouter();
  // const { theme, setTheme } = useContext(ThemeContext);

  const getListData = async () => {
    console.log("router.query:", router.query);
    let page = +router.query.page || 1;
    if (page < 1) page = 1;
    try {
      const r = await fetch(AB_ORDER + `?page=${page}`);
      const d = await r.json();

      setData(d);
    } catch (ex) {}
  };

  useEffect(() => {
    getListData();
  }, [router.query.page]);

  return (
    <>
      <pre>{JSON.stringify(data,null,4)}</pre>
      <Layout>
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

        <div className={styles.payment_details}>
          <span>付款方式: 行動支付</span>
          <span>發票類型: 捐贈發票</span>
        </div>

        <div className={styles.payment_address}>
          <span>取貨方式: 台北市大安區復興南路一段390號2樓</span>
        </div>
      </main>
      </Layout>
    </>
  );
}
