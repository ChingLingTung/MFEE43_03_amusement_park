import { useContext, useEffect, useState } from "react";
import { Layout } from "@/component/product-layout";
import { AB_LIST } from "@/component/product-const";
// import ThemeContext from "@/context/ThemeContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Card from "@/component/Product/Card";
import IconNav from "@/component/Icon-nav/Icon-nav";
// import Slider from "@/component/Slider/Slider";
import styles from '@/component/Page-select/Page-select.module.css'



export default function List() {
  const [data, setData] = useState({});
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [dataFromCate, setDataFromCate] = useState(0);
  const [dataFromStyle, setDataFromStyle] = useState(0);
  const [dataFromSize, setDataFromSize] = useState(0);
  const [dataFromColor, setDataFromColor] = useState(0);

  const getListData = async () => {
    // const usp = new URLSearchParams(router.query)

    let page = +router.query.page || 1;

    if (page < 1) page = 1;

    try {
      const r = await fetch(
        AB_LIST +
          `?page=${page}` +
          (keyword == "" ? "" : `keyword=${keyword}`) +
          (dataFromStyle === 0 ? "" : "&" + `pdstyle_id=${dataFromStyle}`) +
          (dataFromCate === 0 ? "" : "&" + `pdcate_id=${dataFromCate}`) +
          (dataFromSize === 0 ? "" : "&" + `pdsize_id=${dataFromSize}`) +
          (dataFromColor === 0 ? "" : "&" + `pdcolor_id=${dataFromColor}`)
      );
      const d = await r.json();

      setData(d);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    getListData();
  }, [keyword, dataFromStyle, dataFromCate, dataFromSize, dataFromColor, router.query.page]);

  return (
    <>
      <Layout>
        <IconNav />
        <div className={styles.product_container}>
          {data.rows?.length &&
            data.rows.map((v) => <Card key={v.product_id} data={v} />)}

          <div className={styles.page_nav}>
            {data.success && data.totalPages
              ? Array(7)
                  .fill(1)
                  .map((v, i) => {
                    const p = data.page - 3 + i;
                    if (p < 1 || p > data.totalPages) return null;
                    return (
                      <div
                        key={p}
                        className={
                          p === data.page ? `${styles.page_item} ${styles.active}` : styles.page_item
                        }
                      >
                        <Link className={styles.page_link} href={"?page=" + p}>
                          {p}
                        </Link>
                      </div>
                    );
                  })
              : null}
          </div>
        </div>
      </Layout>
    </>
  );
}