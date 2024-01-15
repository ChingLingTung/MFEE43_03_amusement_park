import React from "react";
import styles from "@/component/Detail/Detail.module.css";
import Image from "next/image";
// import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AB_DETAIL } from "@/component/product-const";

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
      const r = await fetch(AB_DETAIL + `?page=${page}`);
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
      <main className={styles.container}>
        {data.rows?.length &&
          data.rows.map((v) => (
            <div className={styles.detailContainer} key={v.product_id} data={v}>
              <div className={styles.detailPics}>
                <div className={styles.w450}>
                  <img src={"/images/product/list/micky-2.webp"} alt="..." />
                </div>

                <div className={styles.w100}>
                  <div className={styles.w100_icon}>
                    <FaChevronLeft />
                  </div>
                  <Image
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
                  />
                  <Image
                    src={"/images/product/list/micky-2.webp"}
                    alt="..."
                    width={100}
                    height={100}
                  />
                  <div className={styles.w100_icon}>
                    <FaChevronRight />
                  </div>
                </div>
              </div>

              <div className={styles.detail_desc}>
                <div className={styles.product_name}>{data.product_name}</div>
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
                    <div>$2000</div>
                  </div>
                </div>
                <div className={styles.icon_flex}>
                  <i className="fa-regular fa-heart icon-heart"></i>
                  <i className="fa-solid fa-cart-shopping icon-cart"></i>
                </div>
              </div>
            </div>
          ))}
      </main>
    </>
  );
}
