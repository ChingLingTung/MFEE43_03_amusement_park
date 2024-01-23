import CartList from "@/component/Cart/cartList";
import styles from "@/component/Cart/cart_withing.module.css";
import { Layout } from "@/component/ride-layout";

export default function Cart() {
  return (
    <>
      <Layout>
        <div className={styles["container"]}>
          {/* <Link href="/Product/list">到 商品頁面</Link>
        <h3>購物車</h3> */}
          <div className={styles["cart"]}>
            <CartList />
          </div>
        </div>
      </Layout>
    </>
  );
}
