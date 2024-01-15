import { useContext, useEffect, useState } from "react";
import { Layout } from "@/component/Layout";
import { AB_DETAIL } from "@/component/product-const";
// import ThemeContext from "@/context/ThemeContext";
import Link from "next/link";
import { useRouter } from "next/router";
import IconNav from "@/component/Icon-nav/Icon-nav";
import Detail from "@/component/Detail/Detail";



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
      const r = await fetch(AB_DETAIL + `?page=${page}`);
      const d = await r.json();

      setData(d);
    } catch (ex) {}
  };

  useEffect(() => {
    getListData();
  }, [router.query.page]);

  // useEffect(()=>{
  //   fetch('http://localhost:3002/detail').then(res=>res.json()).then((data)=>{console.log('從api取得資料',data)})
  // },[])

  return (
    <>
      <Layout>
        <IconNav />
        <div className="product-container">
          {data.rows?.length &&
            data.rows.map((v) => <Detail key={v.product_id} data={v} />)}
        </div>
          {/* <Detail /> */}
      </Layout>
    </>
  );
}
