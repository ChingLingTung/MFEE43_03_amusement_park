import React from "react";
import styles from "@/components/product/Card.module.css";
// import Link from "next/link";

export default function Card({product_name='女鞋', product_price=1990}) {
  return (
    <>
      <div className={styles["w-262"]}>
        <img src="/images/product/list/p1-thumb.webp" classname="" alt="..." />
        <div>
          <p className={styles["card-text"]}>{product_name}</p>
          <span className={styles["price-text"]}>$ {product_price}</span>
        </div>
      </div>
    </>
  );
}

