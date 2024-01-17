import CartList from "@/component/Cart/cartList";
import styles from "@/component/Cart/cart_withing.module.css";

import Link from "next/link";

import { useCart } from "@/hooks/useCart";

export default function Cart() {
  const { items, increment, decrement, remove, calTotalItems, calTotalPrice } =
    useCart();

  return (
    <>
      <div className={styles["container"]}>
        <Link href="/Product/list">到 商品頁面</Link>
        <h3>購物車</h3>
        <div className={styles["cart"]}>
          <CartList
            items={items}
            increment={increment}
            decrement={decrement}
            remove={remove}
          />
        </div>
        <hr />
        <div>
          總數量: {calTotalItems()} / 總金額: {calTotalPrice()}
        </div>
      </div>
    </>
  );
}
