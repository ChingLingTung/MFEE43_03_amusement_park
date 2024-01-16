import React from 'react'
import styles from '@/styles/user.module.css'
import Head from 'next/head'
import AuthContext from "@/context/auth-context";
import { useContext } from "react";
import { USER } from '@/component/ride-const';
import { useState,useEffect } from 'react';

export default function User() {
  const { parkAuth, logout } = useContext(AuthContext);
  const [data, setData] = useState({});
  
  const getListData= async()=>{
// 傳送parkAuth的email,password,token
    try {
      const r = await fetch(USER,
        
        {
          method: "POST",
          body: JSON.stringify({ email, password, token }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      const d = await r.json();
      setData(d);
    } catch (ex) {
      console.log(ex)
    }
  }
  useEffect(() => {
    getListData();
  },[]);
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
              <button className={styles.button}>表演預約</button>
              <button className={styles.button} onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}>登出</button>
            </div>

          </div>
          <div className={styles.info_section}>
            <h2 className={styles.title}>會員資料</h2>
            <table className={styles.table}> 
            <tbody>
            
              <tr> 
                <th className={styles.th}>姓名</th> 
                <td className={styles.td}>{data.user_name}</td>
                <th className={styles.th}>小名</th>
                <td className={styles.td}>{parkAuth.nickname}</td>
              </tr>
              <tr>
                <th className={styles.th}>email</th>
                <td colSpan="3" className={styles.td}>{data.user_email}</td>
              </tr>
              <tr>
                <th className={styles.th}>手機號碼</th>
                <td className={styles.td}></td>
                <th className={styles.th}>生日</th>
                <td className={styles.td}></td>
              </tr> 
              <tr>
                <th className={styles.th}>地址</th>
                <td colSpan="3" className={styles.td}></td>
              </tr>
            </tbody>
            </table>
          </div>
        </div>
        {data.rows && data.rows.map((i)=>{
          return(
            <div key = {i.user_id}>
            <table className={styles.table}> 
            <tbody>
              <tr> 
                <th className={styles.th}>姓名</th> 
                <td className={styles.td}>{i.user_name}</td>
                <th className={styles.th}>小名</th>
                <td className={styles.td}>{i.user_nickname}</td>
              </tr>
              <tr>
                <th className={styles.th}>email</th>
                <td colSpan="3" className={styles.td}>{i.user_email}</td>
              </tr>
              <tr>
                <th className={styles.th}>手機號碼</th>
                <td className={styles.td}></td>
                <th className={styles.th}>生日</th>
                <td className={styles.td}></td>
              </tr> 
              <tr>
                <th className={styles.th}>地址</th>
                <td colSpan="3" className={styles.td}></td>
              </tr>
            </tbody>
            </table>

            </div>
          )
        })}
        
      </div>
      <Head><title>會員中心</title></Head>
    </>
  )
}
