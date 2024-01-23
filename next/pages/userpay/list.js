import { useState, useEffect, useContext } from "react";
import { Layout } from "@/component/Layout";
import { AB_ORDER_ADD, AB_711, AB_ECPAY } from "@/component/product-const";
import { useRouter } from "next/router";
import Paystep from "@/component/Userpay/Paystep/Paystep";
import styles from "@/component/Userpay/Userpay.module.css";
import Link from "next/link";
import { useShip711StoreOpener } from "@/hooks/use-ship-711-store";
import AuthContext from "@/context/auth-context";
// import AuthContext from "@/context/auth-context";
// import Swal from 'sweetalert2'

export default function OrderADD() {
  // const [data, setdata] = useState({
  //   order_id: "",
  //   recipient_name: "",
  //   recipient_email: "",
  //   recipient_phone: "",
  //   recipient_tel: "",
  //   bill_id: "",
  //   userpay_id: "",
  //   odstatus_id: "",
  //   ibon_id: "",
  //   recipient_address_id: "",
  //   address_detail: "",
  //   bill_detail: "",
  //   order_date: "",
  // });

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [usertel, setUsertel] = useState("");
  const [usertelError, setUsertelError] = useState("");
  const [userphone, setUserphone] = useState("");
  const [userphoneError, setUserphoneError] = useState("");
  const [useraddress, setUseraddress] = useState("");
  const [useraddressError, setUseraddressError] = useState("");
  const [bill, setBill] = useState(false);
  const [billError, setBillError] = useState(false);
  const [pay, setPay] = useState(false);
  const [payError, setPayError] = useState(false);
  const [address, setAddress] = useState("1");
  const [addressError, setAddressError] = useState(false);
  // const { setParkAuth } = useContext(AuthContext);
  const router = useRouter();
  // const Alert = withReactContent(Swal);

  const { store711, openWindow } = useShip711StoreOpener(
    "http://localhost:3002/shipment/711"
  );
  // console.log(store711);

  const authContext = useContext(AuthContext);

  const checkEmail = (email) => {
    const emailRule =
      /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if (!email) {
      setEmailError("email為必填");
    } else if (email !== "" && email.search(emailRule) === -1) {
      setEmailError("email必須符合格式");
    } else {
      setEmailError("");
    }
  };

  const checkUsername = (username) => {
    const nameRule = /^[a-zA-Z0-9\s,.-]+$/;
    if (username === "") {
      setUsernameError(".收件人名稱為必填");
    } else if (username !== "" && username.search(nameRule) === -1) {
      setUsernameError("收件人名稱必須符合格式");
    } else {
      setUsernameError("");
    }
  };

  const checkUserphone = (userphone) => {
    const phoneRule = /^09\d{8}$/;
    if (userphone === "") {
      setUserphoneError(".收件人電話為必填");
    } else if (userphone !== "" && userphone.search(phoneRule) === -1) {
      setUserphoneError("收件人電話必須符合格式");
    } else {
      setUserphoneError("");
    }
  };

  const checkUsertel = (usertel) => {
    const telRule = /^\d{8}$/;
    if (usertel === "") {
      setUsertelError(".收件人電話為必填");
    } else if (usertel !== "" && usertel.search(telRule) === -1) {
      setUsertelError("收件人電話必須符合格式");
    } else {
      setUsertelError("");
    }
  };

  const checkUseraddress = (useraddress) => {
    const addressRule = /^[a-zA-Z0-9\s,.-]+$/;
    if (useraddress === "") {
      setUseraddressError(".收件人地址為必填");
    } else if (useraddress !== "" && useraddress.search(addressRule) === -1) {
      setUseraddressError("收件人地址必須符合格式");
    } else {
      setUseraddressError("");
    }
  };

  const checkBill = (bill) => {
    if (!bill) {
      setBillError("發票選項必填");
    } else if (bill !== "" && bill.search(bill) === -1) {
      setBillError("雲端發票必須符合格式");
    } else {
      setBillError("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // 不要讓表單以傳統的方式送出
    // console.log(e);
    let isPass = true;
    // 檢查格式
    const emailRule =
      /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if (!email) {
      isPass = false;
      setEmailError("email為必填");
    } else if (email !== "" && email.search(emailRule) === -1) {
      isPass = false;
      setEmailError("email必須符合格式");
    } else {
      setEmailError("");
    }

    const nameRule = /^[a-zA-Z0-9\s,.-]+$/;
    if (username === "") {
      isPass = false;
      setUsernameError("收件人名稱為必填");
    } else if (username !== "" && username.search(nameRule) === -1) {
      isPass = false;
      setUsernameError("收件人名稱必須符合格式");
    } else {
      setUsernameError("");
    }

    const phoneRule = /^09\d{8}$/;
    if (userphone === "") {
      isPass = false;
      setUserphoneError(".收件人手機為必填");
    } else if (userphone !== "" && userphone.search(phoneRule) === -1) {
      isPass = false;
      setUserphoneError("收件人手機必須符合格式");
    } else {
      setUserphoneError("");
    }

    const telRule = /^\d{8}$/;
    if (usertel === "") {
      isPass = false;
      setUsertelError(".收件人電話為必填");
    } else if (usertel !== "" && usertel.search(telRule) === -1) {
      isPass = false;
      setUsertelError("收件人電話必須符合格式");
    } else {
      setUsertelError("");
    }

    const addressRule = /^[a-zA-Z0-9\s,.-]+$/;
    if (useraddress === "") {
      isPass = false;
      setUseraddressError(".收件人地址為必填");
    } else if (useraddress !== "" && useraddress.search(addressRule) === -1) {
      isPass = false;
      setUseraddressError("收件人地址必須符合格式");
    } else {
      setUseraddressError("");
    }

    const formElements = e.target.elements;

    console.log(formElements);
    
    try {
      fetch(AB_ECPAY, {
        method: "POST",
      })
        .then((data) => data.json())
        .then(({ data }) => {
          const ele = document.createElement("div");
          ele.innerHTML = data;
          document.body.appendChild(ele);
          // if (
          //   (setEmailError("") &&
          //   setUsernameError("") &&
          //   setUserphoneError("") &&
          //   setUsertelError("") &&
          //   setUseraddressError(""))
          // ) {
            ele.getElementsByTagName("form")[0].submit();
          // }
        });
      // const r = await fetch(AB_ORDER_ADD, {
      //   method: "POST",
      //   headers: {
      //     "content-type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     user_id: authContext?.parkAuth?.id || 1,
      //     recipient_name: username,
      //     recipient_email: email,
      //     recipient_phone: userphone,
      //     recipient_tel: usertel,
      //     bill_id: formElements.bill.value,
      //     userpay_id: formElements.pay.value,
      //     odstatus_id: 1,
      //     ibon_id: null,
      //     recipient_address_id: formElements.address.value,
      //     address_detail: useraddress,
      //     bill_detail: "asdf",
      //   }),
      // });
      // const d = await r.json();

      // 成功後，轉址到訂單列表頁

      // 失敗則留在原頁面
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className={styles.w100}>
      <Layout>
        <Paystep />
        <main className={styles.form_container}>
          <div className={styles.recipient_information}>
            <div className={styles.recipient_information_title1}>
              收件人資料
            </div>
            <div className={styles.recipient_information_title2}>
              <input type="radio" /> 同收件人資料
            </div>
          </div>
        </main>

        <form onSubmit={onSubmit} className={styles.w101}>
          <main className={styles.w80}>
            <div className={styles.form_container1}>
              <div className={styles.recipient_descs}>
                <div className={styles.recipient_descs_title}>
                  <span>*</span> 收件人姓名
                </div>
                <div className={styles.recipient_descs_input}>
                  <input
                    type="text"
                    placeholder="請輸入姓名"
                    onChange={(e) => {
                      checkUsername(e.target.value);
                      setUsername(e.target.value);
                    }}
                  />
                  <p style={{ color: "red", fontSize: 16 }}>{usernameError}</p>
                </div>
              </div>

              <div className={styles.recipient_descs}>
                <div className={styles.recipient_descs_title}>
                  <span>*</span> 收件人Email
                </div>
                <div className={styles.recipient_descs_input}>
                  <input
                    type="text"
                    placeholder="請輸入Email"
                    onChange={(e) => {
                      checkEmail(e.target.value);
                      setEmail(e.target.value);
                    }}
                  />
                  <div style={{ color: "red", fontSize: 16 }}>{emailError}</div>
                </div>
              </div>
            </div>

            <div className={styles.form_container1}>
              <div className={styles.recipient_descs}>
                <div className={styles.recipient_descs_title}>
                  <span>*</span> 收件人手機
                </div>
                <div className={styles.recipient_descs_input}>
                  <input
                    type="text"
                    placeholder="請輸入手機"
                    onChange={(e) => {
                      checkUserphone(e.target.value);
                      setUserphone(e.target.value);
                    }}
                  />
                  <div style={{ color: "red", fontSize: 16 }}>
                    {userphoneError}
                  </div>
                </div>
              </div>

              <div className={styles.recipient_descs}>
                <div className={styles.recipient_descs_title}>
                  <span>*</span> 收件人電話
                </div>
                <div className={styles.recipient_descs_input}>
                  <input
                    type="text"
                    placeholder="請輸入電話"
                    onChange={(e) => {
                      checkUsertel(e.target.value);
                      setUsertel(e.target.value);
                    }}
                  />
                  <div style={{ color: "red", fontSize: 16 }}>
                    {usertelError}
                  </div>
                </div>
              </div>
            </div>
          </main>

          <main className={styles.form_container}>
            <div className={styles.logistics}>
              <div className={styles.logistics_title}>發票類型</div>
              <div className={styles.logistics_descs}>
                <div>
                  <input type="radio" name="bill" value="1" /> 雲端發票
                </div>
                <div>
                  <input type="radio" name="bill" value="2" /> 公司發票
                </div>
                <div className={styles.ml30}>
                  <input type="radio" name="bill" value="1" /> 發票捐贈
                </div>
              </div>
            </div>

            <div className={styles.logistics}>
              <div className={styles.logistics_title}>付款方式</div>
              <div className={styles.logistics_descs}>
                <div>
                  <input type="radio" name="pay" value="1" /> 行動支付
                </div>
                <div>
                  <input type="radio" name="pay" value="2" /> 信用卡支付
                </div>
              </div>
            </div>

            <div className={styles.logistics}>
              <div className={styles.logistics_title}>取貨方式</div>
              <div className={styles.logistics_descs}>
                <div>
                  <input
                    type="radio"
                    name="address"
                    value="1"
                    checked={address === "1"}
                    onClick={() => setAddress("1")}
                  />{" "}
                  宅配地址
                </div>
                <div>
                  <label>
                    {" "}
                    <input
                      type="radio"
                      name="address"
                      value="2"
                      checked={address === "2"}
                      onClick={() => setAddress("2")}
                    />{" "}
                    超商取貨
                  </label>
                </div>
              </div>
            </div>
            {address === "1" ? (
              <div className={styles.recipient_descs_address}>
                <div className={styles.recipient_address}>收件人地址</div>
                <div className={styles.recipient_textarea}>
                  <textarea
                    cols="30"
                    rols="10"
                    placeholder="請輸入地址"
                    onChange={(e) => {
                      checkUseraddress(e.target.value);
                      setUseraddress(e.target.value);
                    }}
                  ></textarea>
                  <div style={{ color: "red", fontSize: 16 }}>
                    {useraddressError}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <button onClick={openWindow}>門市選擇</button>
                <div>
                  {store711.storeaddress} {store711.storename}
                </div>
              </>
            )}

            <div className={styles.total_container}>
              <div className={styles.total_info}>
                <div>總計</div>
                <div>$1800</div>
                <div className={styles.pay_button}>
                  <button className={styles.pay_button_word}>結帳</button>
                </div>
              </div>
            </div>
          </main>
        </form>
      </Layout>
    </div>
  );
}