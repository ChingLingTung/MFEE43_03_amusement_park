import React from "react";
import styles from "@/component/product/Card.module.css";
import Icon from "./Icon/Icon";
import Link from "next/link";

export default function Card({ data }) {
  return (
    <>
    {/* <pre>{JSON.stringify(data,null,4)}</pre> */}
      <div className={styles["w-262"]}>
        <Link href={`/product/${data.product_id}`}>
          <img
            src="/images/product/list/p1-thumb.webp"
            classname=""
            alt="..."
          />
          <p className={styles["card-text"]}>{data.product_name}</p>
          <span className={styles["price-text"]}>$ {data.product_price}</span>
          <Icon />
        </Link>
      </div>
    </>
  );
}