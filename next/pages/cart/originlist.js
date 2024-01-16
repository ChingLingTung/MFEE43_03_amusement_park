import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { CART_LIST } from "@/components/cartConst";
import { FaChevronRight } from "react-icons/fa";

import styles from "@/styles/cart_withing.module.css";

export default function CartList() {
  const [data, setData] = useState({});
  const router = useRouter();
  const getListData = async () => {
    let page = +router.query.page || 1;
    if (page < 1) page = 1;
    try {
      const r = await fetch(CART_LIST);
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
      <div className={styles.pageChange}>
        <div>1.購物車</div>
        <div>
          <FaChevronRight />
        </div>
        <div>2.填寫付款資料</div>
        <div>
          <FaChevronRight />
        </div>
        <div>3.成立訂單</div>
      </div>
      <container className={styles.cartContainer}>
        <div className={styles.title}>購物車</div>

        <div className={styles.productDes}>
          <div>
            <input
              type="checkbox"
              className={styles.checkbox1}
              style={{ marginRight: "50px" }}
            />
            商品照片
          </div>
          <div className={styles.p_name}>商品名稱</div>
          <div className={styles.p_price}>單價</div>
          <div className={styles.p_amount}>數量</div>
          <div className={styles.p_totalPrice}>總計</div>
          <div className={styles.p_del}>刪除</div>
        </div>
        {data.rows &&
          data.rows.map((v, i) => {
            return (
              <div key={v.product_id}>
                <div className={styles.productIn}>
                  <div className={styles.p_pic}>
                    <input
                      type="checkbox"
                      className={styles.checkbox1}
                      style={{ marginRight: "50px" }}
                    />
                    <img src={v.product_pic} />
                  </div>
                  <div className={styles.p_name}>{v.product_name}</div>
                  <div className={styles.p_price}>{v.product_price}</div>
                  <div className={styles.p_amount}>
                    <button
                      onClick={() => {
                        increment(items, v.product_id);
                      }}
                    >
                      +
                    </button>
                    <span>{v.qty}</span>
                    <button
                      onClick={() => {
                        if (v.qty === 1) {
                          // 移除商品數量要為0的
                          remove(items, v.product_id);
                          // alert('至少要買一樣商品')
                          return; // 跳出函式，接下來的程式不執行
                        }

                        decrement(items, v.product_id);
                      }}
                    >
                      -
                    </button>
                  </div>
                  <div className={styles.p_totalPrice}>0</div>
                  <div className={styles.p_del}>
                    <button
                      onClick={() => {
                        remove(items, v.product_id);
                      }}
                    >
                      移除
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        <div>
          <div className={styles.title}>優惠券</div>

          <div className={styles.couponDes}>
            <div className={styles.c_name}>
              <input
                type="checkbox"
                className={styles.checkbox1}
                style={{ marginRight: "50px" }}
              />
              優惠券名稱
            </div>
            <div className={styles.c_price}>金額</div>
            <div className={styles.c_desc}>描述</div>
            <div className={styles.titleTotalPrice}>總計</div>
          </div>
          <div className={styles.coupon}>
            <div className={styles.c_name}>
              <input
                type="checkbox"
                className={styles.checkbox1}
                style={{ marginRight: "50px" }}
              />
              {/* {i.ibon_name} */}ibon_name
            </div>
            <div className={styles.c_price}>$100</div>
            <div className={styles.c_desc}>消費$1000以上可使用</div>
            <div className={styles.totalPrice}>-$100</div>
          </div>

          <div className={styles.totalDes}>
            <div className={styles.total}>總計</div>
            <div className={styles.totalPrice}>$1800</div>
            <div className={styles.btn_checkout}>去買單</div>
          </div>
        </div>
      </container>
    </>
  );
}
