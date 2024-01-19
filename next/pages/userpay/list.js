import { useState, useEffect, useContext } from "react";
import { Layout } from "@/component/Layout";
import { AB_ORDER_ADD } from "@/component/product-const";
import { useRouter } from "next/router";
import Paystep from "@/component/Userpay/Paystep/Paystep";
import styles from "@/component/Userpay/Userpay.module.css";
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
  // const { setParkAuth } = useContext(AuthContext);
  const router = useRouter();
  // const Alert = withReactContent(Swal);

  const checkEmail = () => {
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
  const checkUsername = () => {
    const nameRule = /^[a-zA-Z0-9\s,.-]+$/;
    if (username === "") {
      setUsernameError(".收件人名稱為必填");
    } else if (username !== "" && username.search(nameRule) === -1) {
      setUsernameError("收件人名稱必須符合格式");
    } else {
      setUsernameError("");
    }
  };

  const checkUserphone = () => {
    const phoneRule = /^09\d{8}$/;
    if (userphone === "") {
      setUserphoneError(".收件人電話為必填");
    } else if (userphone !== "" && userphone.search(phoneRule) === -1) {
      setUserphoneError("收件人電話必須符合格式");
    } else {
      setUserphoneError("");
    }
  };

  const checkUsertel = () => {
    const telRule = /^\d{8}$/;
    if (usertel === "") {
      setUsertelError(".收件人電話為必填");
    } else if (usertel !== "" && usertel.search(telRule) === -1) {
      setUsertelError("收件人電話必須符合格式");
    } else {
      setUsertelError("");
    }
  };

  const checkUseraddress = () => {
    const addressRule = /^[a-zA-Z0-9\s,.-]+$/;
    if (useraddress === "") {
      setUseraddressError(".收件人地址為必填");
    } else if (useraddress !== "" && useraddress.search(addressRule) === -1) {
      setUseraddressError("收件人地址必須符合格式");
    } else {
      setUseraddressError("");
    }
  };


  const onSubmit = async (e) => {
    e.preventDefault(); // 不要讓表單以傳統的方式送出

    // 檢查格式
    const emailRule =
      /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if (!email) {
      setEmailError("email為必填");
    } else if (email !== "" && email.search(emailRule) === -1) {
      setEmailError("email必須符合格式");
    } else {
      setEmailError("");
      return;
    }

    const nameRule = /^[a-zA-Z0-9\s,.-]+$/;
    if (username === "") {
      setUsernameError(".收件人名稱為必填");
    } else if (username !== "" && username.search(nameRule) === -1) {
      setUsernameError("收件人名稱必須符合格式");
    } else {
      setUsernameError("");
      return;
    }

    const phoneRule = /^09\d{8}$/;
    if (userphone === "") {
      setUserphoneError(".收件人手機為必填");
    } else if (userphone !== "" && userphone.search(phoneRule) === -1) {
      setUserphoneError("收件人手機必須符合格式");
    } else {
      setUserphoneError("");
      return;
    }

    const telRule = /^\d{8}$/;
    if (usertel === "") {
      setUsertelError(".收件人電話為必填");
    } else if (usertel !== "" && usertel.search(telRule) === -1) {
      setUsertelError("收件人電話必須符合格式");
    } else {
      setUsertelError("");
      return;
    }

    const addressRule = /^[a-zA-Z0-9\s,.-]+$/;
    if (useraddress === "") {
      setUseraddressError(".收件人地址為必填");
    } else if (useraddress !== "" && useraddress.search(addressRule) === -1) {
      setUseraddressError("收件人地址必須符合格式");
    } else {
      setUseraddressError("");
      return;
    }
  };
  

  useEffect(() => {
    checkEmail();
    checkUsername();
    checkUserphone();
    checkUsertel();
    checkUseraddress();
  }, [email, username, userphone, usertel, useraddress]);

  

  // const r = await fetch(AB_ORDER_ADD, {
  //   method: "POST",
  //   body: JSON.stringify({
  //     user_id,
  //     recipient_name,
  //     recipient_email,
  //     recipient_phone,
  //     recipient_tel,
  //     bill_id,
  //     userpay_id,
  //     odstatus_id,
  //     ibon_id,
  //     recipient_address_id,
  //     address_detail,
  //     bill_detail,
  //     order_date,
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // const data = await r.json();
  // console.log(data);
  // if (!data.success) {
  //   Alert.fire({
  //     didOpen: () => {
  //       Alert.fire({
  //         titleText: "付款成功",
  //         text: "前往首頁",
  //       }),
  //         Alert.fire({
  //           titleText: "付款失敗",
  //           text: data.error,
  //         });
  //     },
  //   });
  // }

  //   if (data.success) {
  //     const {
  //       user_id,
  //       recipient_name,
  //       recipient_email,
  //       recipient_phone,
  //       recipient_tel,
  //       bill_id,
  //       userpay_id,
  //       odstatus_id,
  //       ibon_id,
  //       recipient_address_id,
  //       address_detail,
  //       bill_detail,
  //       order_date,
  //     } = data;
  //     // 成功登入時, 寫入 localStorage 做長時間的狀態保存
  //     localStorage.setItem(
  //       "park_auth",
  //       JSON.stringify({ id, email, nickname, token })
  //     );
  //     setParkAuth({ id, email, nickname, token });
  //     Alert.fire({
  //       didOpen: () => {
  //         Alert.fire({
  //           titleText: "登入成功",
  //           text: "前往首頁",
  //         }),
  //           Alert.fire({
  //             titleText: "登入成功",
  //             text: "前往首頁",
  //             willClose: () => {
  //               router.push("/");
  //             },
  //           });
  //       },
  //     });
  //   }
  // };

  return (
    <div className={styles.w100}>
      <Layout >
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

        <main className={styles.w100}>
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
                    setUsername(e.target.value);
                  }}
                />
                <p style={{ color: "red", fontSize: 16 }}>
                  {usernameError}
                </p>
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
                    setEmail(e.target.value);
                  }}
                />
                <div style={{ color: "red", fontSize: 16 }}>
                  {emailError}
                </div>
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
                    setUsertel(e.target.value);
                  }}
                />
                <div style={{ color: "red", fontSize: 16 }}>
                  {usertelError}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.recipient_descs_address}>
            <div className={styles.recipient_address}>收件人地址</div>
            <div className={styles.recipient_textarea}>
              <textarea
                cols="30"
                rols="10"
                placeholder="請輸入地址"
                onChange={(e) => {
                  setUseraddress(e.target.value);
                }}
              ></textarea>
                              <div style={{ color: "red", fontSize: 16 }}>
                  {useraddressError}
                </div>
            </div>
          </div>
        </main>

        <main className={styles.form_container}>
          <div className={styles.logistics}>
            <div className={styles.logistics_title}>發票類型</div>
            <div className={styles.logistics_descs}>
              <div>
                <input type="radio" name="bill" /> 雲端發票
              </div>
              <div>
                <input type="radio" name="bill" /> 公司發票
              </div>
              <div className={styles.ml30}>
                <input type="radio" name="bill" /> 發票捐贈
              </div>
            </div>
          </div>

          <div className={styles.logistics}>
            <div className={styles.logistics_title}>付款方式</div>
            <div className={styles.logistics_descs}>
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

          <div className={styles.logistics}>
            <div className={styles.logistics_title}>取貨方式</div>
            <div className={styles.logistics_descs}>
              <div>
                <input type="radio" name="address" /> 收件地址
              </div>
              <div>
                <input type="radio" name="address" /> 超商取貨
              </div>
            </div>
          </div>

          <div className={styles.total_container}>
            <div className={styles.total_info}>
              <div>總計</div>
              <div>$1800</div>
              <div className={styles.pay_button}>
                <button className={styles.pay_button_word} onCl={onSubmit}>
                  結帳
                </button>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
}
