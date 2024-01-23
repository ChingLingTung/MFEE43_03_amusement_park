import CartList from "@/component/Cart/cartList";
import styles from "@/component/Cart/cart_withing.module.css";
import Navbar from "@/component/navbar";
import Footer from "@/component/Footer/Footer";

import Link from "next/link";

import { useCart } from "@/hooks/useCart";

export default function Cart() {
  return (
    <>
      <Navbar />
      <div className={styles["container"]}>
        {/* <Link href="/Product/list">到 商品頁面</Link>
        <h3>購物車</h3> */}
        <div className={styles["cart"]}>
          <CartList />
        </div>
      </div>
      <Footer />
    </>
  );
}
