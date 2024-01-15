import { useState, useEffect } from "react";
import { Layout } from "@/component/Layout";
import Order from "@/component/Order/Order";
import OrderDetail from "@/component/Order-detail/Order-detail";
import { AB_ORDER, AB_USERPAY } from "@/component/product-const";
import { useRouter } from "next/router";

export default function List() {
  const [orderData, setOrderData] = useState({});
  const [userPayData, setUserPayData] = useState({});
  const router = useRouter();

  const getListData = async (apiUrl, setDataCallback) => {
    let page = +router.query.page || 1;
    if (page < 1) page = 1;

    try {
      const r = await fetch(`${apiUrl}?page=${page}`);
      const d = await r.json();

      setDataCallback(d);
    } catch (ex) {}
  };

  useEffect(() => {
    const fetchOrderData = getListData(AB_ORDER, setOrderData);
    const fetchUserPayData = getListData(AB_USERPAY, setUserPayData);

    // 使用 Promise.all 同時發起兩個請求
    Promise.all([fetchOrderData, fetchUserPayData]).then(() => {
      // 在這裡可以執行其他需要等待兩個請求都完成後才執行的操作
    });
  }, [router.query.page]);

  return (
    <>
      <pre>{JSON.stringify(orderData, null, 4)}</pre>
      <pre>{JSON.stringify(userPayData, null, 4)}</pre>
      <Layout>
        <Order />
        <OrderDetail />
      </Layout>
    </>
  );
}
