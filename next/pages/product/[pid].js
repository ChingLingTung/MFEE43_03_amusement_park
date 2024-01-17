import React from "react";
import styles from "@/component/Detail/Detail.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
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
  const [mainPicIndex,setMainPicIndex] =useState(0)

  const router = useRouter();
  useEffect(() => {
    const product_id = +router.query.pid|| 1;
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
              const photoArray = data.row.product_pic.split(',')
              data.row.product_pic = photoArray
              setGetData({ ...data.row });
            }
          })
          .catch((ex) => console.log(ex));
      }
    }
  }, [router]);

  return (
    <>
      <Layout key={getData.product_id}>
        <main className={styles.container}>
          <div className={styles.detailContainer}>
            <div className={styles.detailPics}>
              <div className={styles.w450}>
                <img src={`/images/product/list/${getData.product_pic[mainPicIndex]}`} alt="..." />
              </div>

              <div className={styles.w100}>
                <div className={styles.w100_icon}>
                  <FaChevronLeft />
                </div>
                {/* <Image
                  src={"/images/product/list/micky-2.webp"}
                  alt="..."
                  width={100}
                  height={100}
                />
                <Image
                  src={"/images/product/list/micky-2.webp"}
                  alt="..."
                  width={100}
                  height={100}
                /> */}
                {getData.product_pic.map((v,i)=>{
                  return(

                <Image
                  src={`/images/product/list/${v}`}
                  alt="..."
                  width={100}
                  height={100}
                  key={v.product_id}
                  onClick={()=>{setMainPicIndex(i)}}
                />
                  )
                })}
                <div className={styles.w100_icon}>
                  <FaChevronRight />
                </div>
              </div>
            </div>

            <div className={styles.detail_desc}>
              <div className={styles.product_name}>{getData.product_name}</div>
              <div className={styles.desc_flex}>
                <div className={styles.desc_title}>Size</div>
                <div className={styles.size_desc}>
                  <div>
                    <button>XS</button>
                  </div>
                  <div>
                    <button>S</button>
                  </div>
                  <div>
                    <button>M</button>
                  </div>
                  <div>
                    <button>L</button>
                  </div>
                  <div>
                    <button>XL</button>
                  </div>
                </div>
              </div>
              <div className={styles.desc_flex}>
                <div className={styles.desc_title}>Color</div>
                <div className={styles.color_desc}>
                  <div>
                    <button>白</button>
                  </div>
                  <div>
                    <button>黑</button>
                  </div>
                  <div>
                    <button>黃</button>
                  </div>
                </div>
              </div>
              <div className={styles.desc_flex}>
                <div className={styles.desc_title}>Quantity</div>
                <div className={styles.quantity_desc}>
                  <div>
                    <button>-</button>
                  </div>
                  <div>
                    <button>1</button>
                  </div>
                  <div>
                    <button>+</button>
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
                <Link href="/cart/list"><i className="fa-solid fa-cart-shopping icon-cart"></i></Link>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}