import { useContext, useEffect, useState } from "react";
import { Layout } from "@/component/Layout";
import { AB_USERPAY } from "@/component/product-const";
// import ThemeContext from "@/context/ThemeContext";
import Link from "next/link";
import { useRouter } from "next/router";
import IconNav from "@/component/Icon-nav/Icon-nav";
import Userpay from "@/component/Userpay/Userpay";

export default function List() {
  // console.log("window.location.href:", window.location.href);
  const [data, setData] = useState({});
  const router = useRouter();
  // const { theme, setTheme } = useContext(ThemeContext);

  const getListData = async () => {
    console.log("router.query:", router.query);
    let page = +router.query.page || 1;
    if (page < 1) page = 1;
    try {
      const r = await fetch(AB_USERPAY + `?page=${page}`);
      const d = await r.json();

      setData(d);
    } catch (ex) {}
  };

  useEffect(() => {
    getListData();
  }, [router.query.page]);

  return (
    <>
      <Layout>
        <IconNav />
        {/* <div className="product-container">
          {data.rows?.length &&
            data.rows.map((v) => <Userpay key={v.product_id} {...v} />)}
        </div> */}
        <div className="userpay-container">
          <Userpay />
        </div>
      </Layout>
    </>
  );
}
