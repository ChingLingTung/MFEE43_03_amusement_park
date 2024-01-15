import React, { useEffect } from "react";
import styles from "@/component/Detail/Detail.module.css";
import Image from "next/image";
// import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

export default function Detail({
  product_name = "女鞋",
  product_price = 1990,
}) {
  return (
    <>
      <main className={styles.container}>
        <div className={styles.detailContainer}>
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
            <div className={styles.product_name}>米奇短袖T-shirt</div>
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
                <div>$2,000</div>
              </div>
            </div>
            <div className={styles.icon_flex}>
              <i className="fa-regular fa-heart icon-heart"></i>
              <i className="fa-solid fa-cart-shopping icon-cart"></i>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
