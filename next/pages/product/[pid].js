import React from "react";
import styles from "@/component/Detail/Detail.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AB_LIST } from "@/component/product-const";
import { Layout } from "@/component/Layout";

export default function Detail() {
  const [getData, setGetData] = useState({
    product_id: "",
    product_name: "",
    product_pic: [],
    product_size: "",
    product_color: "",
    stock_quantity: "",
    product_description: "",
  });
  const [mainPicIndex, setMainPicIndex] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(1);

  const router = useRouter();
  useEffect(() => {
    const product_id = +router.query.pid || 1;
    console.log({ product_id, raw: router.query.pid });
    // 有抓到值時
    if (router.query.pid !== undefined) {
      if (!product_id) {
        router.push("/product/list"); // product_id 是 NaN 就跳到列表頁
      } else {
        // 取得單筆資料
        fetch(AB_LIST + "/" + product_id)
          .then((r) => r.json())
          .then((data) => {
            if (!data.success) {
              router.push("/product/list"); // 沒拿到資料, 跳到列表頁
            } else {
              const photoArray = data.row.product_pic.split(",");
              data.row.product_pic = photoArray;
              setGetData({ ...data.row });
            }
          })
          .catch((ex) => console.log(ex));
      }
    }
  }, [router]);

  const decrementQuantity = () => {
    if (cartQuantity > 1) {
      setCartQuantity(cartQuantity - 1);
    }
  };

  const incrementQuantity = () => {
    setCartQuantity(cartQuantity + 1);
  };

  const setNewLocalS = (selectProduct) => {
    //判斷購物車是否有資料 =>如果有 :
    if (localStorage.getItem("cartData")) {
      // 判斷這個商品有沒有被加進購物車
      let nowCart = JSON.parse(localStorage.getItem("cartData"));
      // 找有沒有在購物車裡
      let result = nowCart.find((d) => {
        if (d.product_id === selectProduct.product_id) {
          return true;
        }
        return false;
      });
      if (result) {
        // 如果有相同商品 => 更新數量
        nowCart.map((v) => {
          if (v.product_id === selectProduct.product_id) {
            v.user_buy_qty += selectProduct.user_buy_qty;
            v.subTotalPrice +=
              selectProduct.user_buy_qty * selectProduct.product_price;
          }
        });
        localStorage.setItem("cartData", JSON.stringify(nowCart));
      } else {
        // 如果沒有相同商品 => 將就的購物車+選擇的這個商品
        const newSelect = [...nowCart, selectProduct];
        localStorage.setItem("cartData", JSON.stringify(newSelect));
      }
      alert(`成功加入${cartQuantity}筆進購物車！`);
    } else {
      // 購物車沒東西 => 將選擇商品加進去
      const array = [selectProduct];
      localStorage.setItem("cartData", JSON.stringify(array));

      alert(`成功加入${cartQuantity}筆進購物車！`);
    }
  };
  return (
    <>
      <Layout key={getData.product_id}>
        <main className={styles.container}>
          <div className={styles.detailContainer}>
            <div className={styles.detailPics}>
              <div className={styles.w450}>
                <img
                  src={`/images/product/list/${getData.product_pic[mainPicIndex]}`}
                  alt="..."
                />
              </div>

              <div className={styles.w100}>
                {getData.product_pic.map((v, i) => {
                  return (
                    <Image
                      src={`/images/product/list/${v}`}
                      alt="..."
                      width={100}
                      height={100}
                      key={v.product_id}
                      onClick={() => {
                        setMainPicIndex(i);
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <div className={styles.detail_desc}>
              <div className={styles.product_name}>{getData.product_name}</div>
              <div className={styles.product_desc}>
                {getData.product_description}
              </div>
              <div className={styles.desc_flex2}>
                <div className={styles.desc_flex3}>
                  <div className={styles.desc_title}>Size</div>
                  <div className={styles.size_desc}>{getData.pdsize_name}</div>
                </div>
                <div className={styles.desc_flex3}>
                  <div className={styles.desc_title}>Color</div>
                  <div className={styles.color_desc}>
                    {getData.pdcolor_name}
                  </div>
                </div>
              </div>

              <div className={styles.desc_flex}>
                <div className={styles.desc_title}>Quantity</div>
                <div className={styles.quantity_desc}>
                  <div>
                    <button onClick={decrementQuantity}>-</button>
                  </div>
                  <div>
                    <button>{cartQuantity}</button>
                  </div>
                  <div>
                    <button onClick={incrementQuantity}>+</button>
                  </div>
                </div>
              </div>
              <div className={styles.desc_flex}>
                <div className={styles.desc_title}>Price</div>
                <div className={styles.price_desc}>
                  <div>${getData.product_price}</div>
                </div>
              </div>
              <div className={styles.icon_flex}>
                <i className="fa-regular fa-heart icon-heart"></i>
                <i
                  className="fa-solid fa-cart-shopping icon-cart"
                  onClick={() => {
                    const firstProductPic = getData.product_pic[0];
                    // 先抓取商品資料、使用者選的數量
                    // 把這些資料加進localstorage
                    setNewLocalS({
                      product_pic: firstProductPic,
                      product_id: getData.product_id,
                      product_name: getData.product_name,
                      product_price: getData.product_price,
                      subTotalPrice: getData.product_price * cartQuantity,
                      user_buy_qty: cartQuantity,
                    });
                  }}
                ></i>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
