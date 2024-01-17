import { useContext, useEffect, useState } from "react";
import { Layout } from "@/component/Layout";
import { AB_LIST } from "@/component/product-const";
// import ThemeContext from "@/contexts/ThemeContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Card from "@/component/Product/Card";
import IconNav from "@/component/Icon-nav/Icon-nav";
import Slider from "@/component/Slider/Slider";

export default function List1() {
  // console.log("window.location.href:", window.location.href);
  const [data, setData] = useState({});
  const router = useRouter();
  // const { theme, setTheme } = useContext(ThemeContext);

  const getListData = async () => {
    console.log("router.query:", router.query);
    let page = +router.query.page || 1;
    if (page < 1) page = 1;
    try {
      const r = await fetch(AB_LIST + `?page=${page}`);
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
        <Slider />
        <IconNav />
        <div className="product-container">
          {data.rows?.length &&
            data.rows.map((v) => <Card key={v.product_id} {...v} />)}
        </div>
      </Layout>
    </>
  );
}
