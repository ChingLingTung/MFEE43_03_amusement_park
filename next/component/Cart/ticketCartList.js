import React from "react";
import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import styles from "@/component/Cart/cart_withing.module.css";

export default function TicketCartList() {
  // const [data, setData] = useState({});
  //變更數量
  const [cartQuantities, setCartQuantities] = useState({});
  const [applyCoupon, setApplyCoupon] = useState(false);
  const handleCouponCheckboxChange = () => {
    setApplyCoupon(!applyCoupon);
  };

  const [cartLS, setCartLS] = useState([]);
  useEffect(() => {
    const ticketCartData = window.localStorage.getItem("ticketCartData");
    const items = ticketCartData ? JSON.parse(ticketCartData) : [];
    setCartLS(items);

    // 初始化購物車數量
    const quantities = {};
    items.forEach((item) => {
      quantities[item.sid] = item.user_buy_qty;
    });
    setCartQuantities(quantities);
  }, []);

  const decrementQuantity = (productId) => {
    if (cartQuantities[productId] > 1) {
      setCartQuantities({
        ...cartQuantities,
        [productId]: cartQuantities[productId] - 1,
      });
    }
  };

  const incrementQuantity = (productId) => {
    setCartQuantities({
      ...cartQuantities,
      [productId]: cartQuantities[productId] + 1,
    });
  };

  const removeItem = (productId) => {
    // 從cartLS裡移除item
    const updatedCart = cartLS.filter((item) => item.sid !== productId);
    setCartLS(updatedCart);

    // 從cartQuantities裡移除數量
    const { [productId]: removedQuantity, ...updatedQuantities } =
      cartQuantities;
    setCartQuantities(updatedQuantities);
    window.localStorage.setItem("ticketCartData", JSON.stringify(updatedCart));
  };

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
            票券種類
          </div>
          <div className={styles.p_name}>票券名稱</div>
          <div className={styles.p_price}>單價</div>
          <div className={styles.p_amount}>數量</div>
          <div className={styles.p_totalPrice}>總計</div>
          <div className={styles.p_del}>刪除</div>
        </div>

        {cartLS.map((v, i) => {
          return (
            <div key={v.sid}>
              <div className={styles.productIn}>
                <div className={styles.p_pic}>
                  <input
                    type="checkbox"
                    className={styles.checkbox1}
                    style={{ marginRight: "50px" }}
                  />
                  {v.tc1_name}
                </div>
                <div className={styles.p_name}>{v.tc2_name}</div>
                <div className={styles.p_price}>{v.tc_amount}</div>
                <div className={styles.p_amount}>
                  <div>
                    <button onClick={() => decrementQuantity(v.sid)}>
                      -
                    </button>
                  </div>
                  <div>
                    <button>{cartQuantities[v.sid]}</button>
                  </div>
                  <div>
                    <button onClick={() => incrementQuantity(v.sid)}>
                      +
                    </button>
                  </div>
                </div>
                <div className={styles.p_totalPrice}>
                  {v.product_price * cartQuantities[v.sid]}
                </div>
                <div className={styles.p_del}>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      removeItem(v.sid);
                    }}
                  >
                    刪除
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div>
          <div className={styles.totalDes}>
            <div className={styles.total}>總計</div>
            {cartLS.map((v, i) => {
              const productTotalPrice =
                v.product_price * cartQuantities[v.sid];
              return (
                <div key={v.sid}>
                  <div className={styles.productTotalPrice}>
                    {applyCoupon ? productTotalPrice - 100 : productTotalPrice}
                  </div>
                </div>
              );
            })}

            <button className={styles.btn_checkout}>
              <a href="../order/list">去買單</a>
            </button>
          </div>
        </div>
      </container>
    </>
  );
}