import React from 'react';
import styles from '@/styles/register.module.css';
import Head from 'next/head';

export default function Login() {
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>會員註冊</h2>
        <div className={styles.formborder}>
          <form>
            <div className={styles.flex}>
              <div className={styles.column}>
                <div className={styles.padding30}>
                  <img className={styles.img} src='../images/profile.png'/>
                </div>
                <p className={styles.flex}>
                <img className={styles.icon} src='../images/Upload.png'/>
                上傳大頭照
                </p>
                <p className={styles.flex}>
                  <img className={styles.icon} src='../images/Edit.png'/>
                  <label>
                    <input className={styles.nickname} placeholder='小名'/>
                  </label>
                </p>
              </div>
              <div>
                <label htmlFor="text"><span className={styles.red}>*</span>會員姓名：<br/>
                  <input type='text' className={styles.input} placeholder='請輸入真實姓名'/>
                </label>
                <br/>
                <label htmlFor="email"><span className={styles.red}>*</span>帳號：<br/>
                  <input type='email' className={styles.input} placeholder='請輸入email'/>
                </label>
                <br/>
                <label htmlFor="password"><span className={styles.red}>*</span>密碼：<br/>
                  <input type='password' className={styles.input} placeholder='請輸入密碼'/>
                </label>
                <br/>
                <label htmlFor="password"><span className={styles.red}>*</span>再次確認密碼：<br/>
                  <input type='password' className={styles.input} placeholder='請輸入一樣的密碼'/>
                </label>
                <br/>
                <label htmlFor="password">手機號碼：<br/>
                  <input type='password' className={styles.input} placeholder='請輸入手機號碼'/>
                </label>
                <br/>
                <label htmlFor="password">生日：<br/>
                  <input type='password' className={styles.input} placeholder='請輸入出生年月日YYYY/MM/DD'/>
                </label>
                <br/>
              </div>
            </div>
            <div className={styles.flex}><button type='submit' className={styles.button}>註冊</button></div>
          </form>
        </div>
      </div>
      <Head><title>註冊</title></Head>
    </>
  )
}
