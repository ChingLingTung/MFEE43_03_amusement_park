import { useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";

export default function List() {
  // Toggle the side navigation
  useEffect(() => {
    // fix next issue
    if (typeof window !== "undefined") {
      const sidebarToggle = document.body.querySelector("#sidebarToggle");

      if (sidebarToggle) {
        // 在localStorage中儲存目前sidebar情況
        if (localStorage.getItem("sb|sidebar-toggle") === "true") {
          document.body.classList.toggle("sb-sidenav-toggled");
        }

        sidebarToggle.addEventListener("click", (event) => {
          event.preventDefault();

          document.body.classList.toggle("sb-sidenav-toggled");

          localStorage.setItem(
            "sb|sidebar-toggle",
            document.body.classList.contains("sb-sidenav-toggled")
          );
        });
      }
    }
  }, []);

  return (
    <>
      <main class="shopping-step">
        <div>1. 您的購物車</div>
        <div><FaChevronRight /></div>
        <div>2. 填寫付款資料</div>
        <div><FaChevronRight /></div>
        <div>3. 成立訂單</div>
      </main>
      <main class="order-container">
        <div class="order-title">訂單列表</div>
        <div class="order-nav-head">
          <div class="order-nav-codeT">訂單編號</div>
          <div class="order-nav-titles">
            <div>訂單日期</div>
            <div>金額</div>
            <div>訂單狀態</div>
            <div>訂單明細</div>
          </div>
        </div>

        <div class="order-nav">
          <div class="order-nav-code">OD20240104001</div>
          <div class="order-nav-titles">
            <div>2024/01/04</div>
            <div>$2,000</div>
            <div>未完成</div>
            <div class="order-icon">v</div>
          </div>
        </div>

        <div class="order-nav">
          <div class="order-nav-code">OD20240104002</div>
          <div class="order-nav-titles">
            <div>2024/01/04</div>
            <div>$2,000</div>
            <div>未完成</div>
            <div class="order-icon">v</div>
          </div>
        </div>

        <div class="order-nav">
          <div class="order-nav-code">OD20240104003</div>
          <div class="order-nav-titles">
            <div>2024/01/04</div>
            <div>$2,000</div>
            <div>未完成</div>
            <div class="order-icon">^</div>
          </div>
        </div>

        <div class="order-detail-nav">
          <img
            src="/images/product/list/p1-thumb.webp"
            className="card-img-top"
            alt="..."
          />
          <div class="order-details">
            <div>米奇短袖T-shirt Size: XL 顏色: 白</div>
            <div>數量: 1</div>
            <div>$2,000</div>
          </div>
        </div>

        <div class="order-detail-nav">
          <img
            src="/images/product/list/p1-thumb.webp"
            className="card-img-top"
            alt="..."
          />
          <div class="order-details">
            <div>米奇短袖T-shirt Size: XL 顏色: 白</div>
            <div>數量: 1</div>
            <div>$2,000</div>
          </div>
        </div>

        <div class="order-detail-nav">
          <img
            src="/images/product/list/p1-thumb.webp"
            className="card-img-top"
            alt="..."
          />
          <div class="order-details">
            <div>米奇短袖T-shirt Size: XL 顏色: 白</div>
            <div>數量: 1</div>
            <div>$12,000</div>
          </div>
        </div>

        <div class="payment-details">
          <span>付款方式: 行動支付</span>
          <span>發票類型: 捐贈發票</span>
        </div>

        <div class="payment-address">
          <span>取貨方式: 台北市大安區復興南路一段390號2樓</span>
        </div>
      </main>
    </>
  );
}
