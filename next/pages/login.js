import React from 'react';
import styles from '@/styles/login.module.css';

export default function Login() {
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>會員登入</h2>
        <div className={styles.formborder}>
          <form>
            <label>Email：<br/>
            <input type='email' className={styles.input}/>
            </label>
            <br/>
            <label>密碼：<br/>
            <input type='password' className={styles.input}/>
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
    </>
  )
}
