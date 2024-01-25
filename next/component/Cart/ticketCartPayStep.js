import React from "react";
import Image from "next/image";
// import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import styles from "@/component/Cart/cartPayStep.module.css";

export default function TicketCartPayStep() {
  return (
    <>
      <div className={styles.shopping_step}>
        <div>
          <i class="fa-solid fa-ticket">票券選購</i>
        </div>
        <div>
          <FaChevronRight />
        </div>
        <div>填寫付款資料</div>
        <div>
          <FaChevronRight />
        </div>
        <div>成立訂單</div>
      </div>
    </>
  );
}
