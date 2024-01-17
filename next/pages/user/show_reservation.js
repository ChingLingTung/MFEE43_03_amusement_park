import React from 'react'
import styles from '@/styles/user.module.css'
import Head from 'next/head'
import AuthContext from "@/context/auth-context";
import { useContext } from "react";

export default function User() {
  const { parkAuth, logout } = useContext(AuthContext);
  
  return (
    <>
      <div className={styles.container}>
        <div style={{padding:300}} className={styles.flex_center}>
          <div className={styles.left_section}>
            <div className={styles.user_info}>
              <img className={styles.img} src='/images/user/profile.png'/>
              <p>{parkAuth.nickname}</p>
              <p>{parkAuth.email}</p>
            </div>
            <div className={styles.column}>
              <button className={styles.button}>會員訂單</button>
              <button className={styles.button}>優惠券</button>
              <button className={styles.button}>我的收藏</button>
              <button className={styles.button}>修改資料</button>
              <button className={styles.selected_button}>表演預約</button>
              <button className={styles.button} onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}>登出</button>
            </div>

          </div>
          <div className={styles.info_section}>
            <h2 className={styles.title}>表演預約</h2>
            <table className={styles.table}> 
            <tbody>

              <tr> 
                <th className={styles.th}>演出節目</th> 
                <th className={styles.th}>演出日期</th>
                <th className={styles.th}>演出地點</th>
                <th className={styles.th}>演出時段</th>
                <th className={styles.th}>預約座位</th>
              </tr> 
              <tr> 
                <td className={styles.td}>新春光影秀</td> 
                <td className={styles.td}>113/3/5</td> 
                <td className={styles.td}>廣場旁演藝廳</td> 
                <td className={styles.td}>14:00-15:30</td> 
                <td className={styles.td}>D5、D6</td> 
              </tr> 
            </tbody>
            </table>
          </div>
        </div>
      </div>
      <Head><title>會員中心</title></Head>
    </>
  )
}
