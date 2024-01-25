import React from "react";
import Image from "next/image";
// import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import styles from "@/component/Userpay/Paystep/ticketPaystep.module.css";
import Link from "next/link";

export default function TicketPayStep() {
  return (
    <>
      <div className={styles.shopping_step}>
        <Link href={"/cart/ticketCart"}>
          <div>
            <i class="fa-solid fa-ticket">票券選購</i>
          </div>
        </Link>
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
