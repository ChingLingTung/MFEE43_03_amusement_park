import CartList from "@/component/Cart/ticketCartList";
import styles from "@/component/Cart/cart_withing.module.css";
import { Layout } from "@/component/ride-layout";

export default function Cart() {
  return (
    <>
      <Layout>
        <div className={styles["container"]}>
          <div className={styles["cart"]}>
            <CartList />
          </div>
        </div>
      </Layout>
    </>
  );
}
