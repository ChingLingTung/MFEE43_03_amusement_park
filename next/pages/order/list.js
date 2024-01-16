import { useState, useEffect } from "react";
import { Layout } from "@/component/Layout";
import Order from "@/component/Order/Order";
import { AB_ORDER } from "@/component/product-const";
import { useRouter } from "next/router";
import Paystep from "@/component/Userpay/Paystep/Paystep";
import styles from "@/component/Order/Order.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export default function List() {
  const [data, setData] = useState({});
  const router = useRouter();

  const getListData = async () => {
    let page = +router.query.page || 1;

    if (page < 1) page = 1;

    try {
      const r = await fetch(AB_ORDER);
      const d = await r.json();
      // console.log(value)
      setData(d);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    getListData();
  }, []);

  return (
    <>
      <pre>{JSON.stringify(data, null, 4)}</pre>
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

          {data.rows?.length &&
            data.rows.map((v) => (
              <div className={styles.order_navs} key={v.order_id} data={v}>
                <div className={styles.order_nav}>
                  <div className={styles.order_nav_code}>{v.order_id}</div>
                  <div className={styles.order_nav_titles}>
                    <div>{v.order_date}</div>
                    <div>{v.order_amount}</div>
                    <div>未完成</div>
                    <div>
                      <IoIosArrowUp className={styles.order_icon} />
                    </div>
                  </div>
                </div>

                <div className={styles.order_detail_nav}>
                  <img src="/images/product/list/micky-1.webp" alt="..." />
                  <div className={styles.order_details}>
                    <div>{v.product_name}</div>
                    <div>{v.order_quantity}</div>
                    <div>{v.product_price}</div>
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
              </div>
            ))}
        </main>
      </Layout>
    </>
  );
}
