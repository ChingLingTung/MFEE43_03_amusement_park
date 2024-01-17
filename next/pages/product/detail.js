import { useContext, useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { AB_DETAIL } from "@/component/product-const";
// import ThemeContext from "@/contexts/ThemeContext";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Detail() {
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

  return (
    <>
      <main className="container">
        <div className="detail-pics">
          <div className="w-450">
            <img
              src="/images/product/list/p1-thumb.webp"
              classNameName="card-img-top"
              alt="..."
            />
          </div>

          <div className="w-100">
            <i className="fa-solid fa-arrow-left"></i>
            <img
              src="/images/product/list/p1-thumb.webp"
              classNameName="card-img-top"
              alt="..."
            />
            <img
              src="/images/product/list/p1-thumb.webp"
              classNameName="card-img-top"
              alt="..."
            />
            <img
              src="/images/product/list/p1-thumb.webp"
              classNameName="card-img-top"
              alt="..."
            />
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>

        <div className="detail-desc">
          <div className="product-name">米奇短袖T-shirt</div>
          <div className="desc-flex">
            <div className="desc-title">Size</div>
            <div className="size-desc">
              <div>XS</div>
              <div>S</div>
              <div>M</div>
              <div>L</div>
              <div>XL</div>
            </div>
          </div>
          <div className="desc-flex">
            <div className="desc-title">Color</div>
            <div className="color-desc">
              <div>白</div>
              <div>黑</div>
              <div>黃</div>
            </div>
          </div>
          <div className="desc-flex">
            <div className="desc-title">Quantity</div>
            <div className="quantity-desc">
              <div>-</div>
              <div>1</div>
              <div>+</div>
            </div>
          </div>
          <div className="desc-flex">
            <div className="desc-title">Price</div>
            <div className="price-desc">
              <div>$2,000</div>
            </div>
          </div>
          <div className="icon-flex">
            <i className="fa-regular fa-heart icon-heart"></i>
            <i className="fa-solid fa-cart-shopping icon-cart"></i>
          </div>
        </div>
      </main>
    </>
  );
}
