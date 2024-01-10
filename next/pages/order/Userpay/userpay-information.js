import { useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import styles from "./userpay.module.css";

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
        <div>
          <FaChevronRight />
        </div>
        <div>2. 填寫付款資料</div>
        <div>
          <FaChevronRight />
        </div>
        <div>3. 成立訂單</div>
      </main>

      <main class="container">
        <div class="recipient-information">
          <div>收件人資料</div>
          <div>
            <input type="radio" /> 同收件人資料{" "}
          </div>
        </div>
      </main>

      <main class="form-container">
        <div>
          <div class="recipient-descs">
            <div>
              收件人姓名 <span style="color: red;">*</span>
            </div>
            <div>
              <input type="text" placeholder="請輸入姓名" />
            </div>
          </div>
          <div class="recipient-descs">
            <div>
              <span style="color: red;">*</span> 收件人email{" "}
            </div>
            <div>
              <input type="text" placeholder="請輸入email" />
            </div>
          </div>
        </div>
        <div class="recipient-descs">
          <div>
            收件人手機 <span style="color: red;">*</span>
          </div>
          <div>
            <input type="text" placeholder="請輸入手機" />
          </div>
        </div>
        <div class="recipient-descs">
          <div>
            收件人電話 <span style="color: red;">*</span>
          </div>
          <div>
            <input type="text" placeholder="請輸入電話" />
          </div>
        </div>
        <div class="recipient-descs">
          <div>收件人地址</div>
          <div>
            <input type="text" placeholder="請輸入地址" />
          </div>
        </div>
      </main>

      <main class="form-container">
        <div class="logistics">
          <div class="logistics-title">發票類型</div>
          <div class="logistics-descs">
            <div>
              <input type="radio" name="bill" /> 雲端發票
            </div>
            <div>
              <input type="radio" name="bill" /> 公司發票
            </div>
            <div>
              <input type="radio" name="bill" style="margin-left: 30px;" />{" "}
              發票捐贈
            </div>
          </div>
        </div>

        <div class="logistics">
          <div class="logistics-title">付款方式</div>
          <div class="logistics-descs">
            <div>
              <input type="radio" name="pay" /> 行動支付
            </div>
            <div>
              <input type="radio" name="pay" /> 信用卡支付
            </div>
            <div>
              <input type="radio" name="pay" /> 超商付款
            </div>
          </div>
        </div>

        <div class="logistics">
          <div class="logistics-title">取貨方式</div>
          <div class="logistics-descs">
            <div>
              <input type="radio" name="address" /> 收件地址
            </div>
            <div>
              <input type="radio" name="address" /> 超商取貨
            </div>
          </div>
        </div>

        <div class="logistics">
          <div class="credit-descs1">
            <div class="credit-title">信用卡號</div>
            <div class="credit-desc">
              <input type="text" placeholder="XXXX" />
              <span>-</span>
              <input type="text" placeholder="XXXX" />
              <span>-</span>
              <input type="text" placeholder="XXXX" />
            </div>
          </div>
          <div class="credit-descs2">
            <div class="credit-title">末三碼</div>
            <div class="credit-desc">
              <input type="text" placeholder="123" />
            </div>
          </div>
          <div class="credit-descs2">
            <div class="credit-title">有效日期</div>
            <div class="credit-desc">
              <input type="text" placeholder="12/3456" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
