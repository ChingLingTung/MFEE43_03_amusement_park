import React from "react";
import styles from '@/component/Product/Icon/Icon.module.css'
import { FaRegHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";

export default function Icon() {
  return (
    <>
      <div className={styles["icon-button"]}>
        <FaRegHeart size={24} />
        <IoCart size={24} />
      </div>
    </>
  );
}
