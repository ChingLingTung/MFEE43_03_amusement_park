import React from 'react';
import styles from '@/styles/login.module.css';
import Head from "next/head";
import { useContext, useState } from "react";
import { LOGIN } from "@/component/ride-const";
import AuthContext from "@/context/auth-context";
import { useRouter } from "next/router";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setParkAuth} = useContext(AuthContext)
  const router = useRouter();

  const postForm = async (e) => {
    e.preventDefault(); // 不要讓表單以傳統的方式送出

    const r = await fetch(LOGIN, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await r.json();
    console.log(data);
    if(data.success){
      const {id, email, nickname, token} = data;
      // 成功登入時, 寫入 localStorage 做長時間的狀態保存
      localStorage.setItem('auth', JSON.stringify({id, email, nickname, token}));
      setParkAuth({id, email, nickname, token});
      router.push('/');
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>會員登入</h2>
        <div className={styles.formborder}>
          <form>
            <label>Email：<br/>
            <input type='text' id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.input}/>
            </label>
            <br/>
            <label>密碼：<br/>
            <input type='password' id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                      className={styles.input}/>
            </label>
            <div style={{marginBottom:50}}>
              忘記密碼
            </div>
            <button type='submit' className={styles.button}>登入</button>
            <div className={styles.flex}>
              <span>還不是會員？</span>
              <span>前往註冊</span>
            </div>
            <br/>
            <div>---------------或---------------</div>
            <br/>
            <button type='button' className={styles.google_login}><img className={styles.img} src='../images/google_icon.png'/>快速登入</button>
          </form>
        </div>
      </div>
      <Head>
        <title>登入</title>
      </Head>
    </>
  )
}
