import React from "react";
import styles from "@/component/product/Card.module.css";
import Icon from "./Icon/Icon";
// import Link from "next/link";

export default function Card({product_name='女鞋', product_price=1990}) {
  return (
    <>
      <div className={styles["w-262"]}>
        <img src="/images/product/list/p1-thumb.webp" classname="" alt="..." />
        <div>
          <p className={styles["card-text"]}>{product_name}</p>
          <span className={styles["price-text"]}>$ {product_price}</span>
          <Icon />
        </div>
      </div>
    </>
  );
}


