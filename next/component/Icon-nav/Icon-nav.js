import React from "react";
import styles from "@/component/Icon-nav/Icon-nav.module.css";
// import Link from "next/link";

export default function Card({ product_name = "女鞋", product_price = 1990 }) {
  return (
    <>
      <div className={styles.icon_nav}>
        <img src="\images\icon-button\iconshirt.png" classname="" alt="..." />
        <img src="\images\icon-button\iconshirt.png" classname="" alt="..." />
        <img src="\images\icon-button\iconshirt.png" classname="" alt="..." />
        <img src="\images\icon-button\iconshirt.png" classname="" alt="..." />
        <img src="\images\icon-button\iconshirt.png" classname="" alt="..." />
      </div>
    </>
  );
}
