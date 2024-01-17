import React from 'react'
import Link from 'next/link';
import styles from '@/styles/user.module.css'
import Head from 'next/head'
import AuthContext from "@/context/auth-context";
import { useContext } from "react";
import { USER } from '@/component/ride-const';
import { useRouter } from "next/router";
import { useState,useEffect } from 'react';
import { Layout } from '@/component/layout';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content' 


export default function User() {
  const { parkAuth, logout } = useContext(AuthContext);
  const [orderClass, setOrderClass]=useState(styles.button);
  const [ticketClass, setTicketClass]=useState(styles.button);
  const [collectClass, setCollectClass]=useState(styles.button);
  const [editClass, setEditClass]=useState(styles.button);
  const [showClass, setShowClass]=useState(styles.button);
  const [data, setData] = useState({});
  const router = useRouter();
  const Alert = withReactContent(Swal) ;
  const getListData= async()=>{
// 如果parkAuth存在,傳送parkAuth
    
  }
  useEffect(()=>{
    if(parkAuth.email){
      fetch(USER,{
        method: "GET",
        headers: {
          Authorization: "Bearer " + parkAuth.token,
        },
      })
      .then((r) => r.json())
      .then((result) => {
        if (result.success) {
          setData(result.data);
        }
      })
      .catch((ex) => console.log(ex));
    }
  },[parkAuth])

  useEffect(()=>{
    if(!parkAuth.email && !data){
      Alert.fire({ 
  didOpen: () => { 
      Alert.fire({
        titleText:'尚未登入',
        text:'前往登入',
      }),
      Alert.fire({
        titleText:'尚未登入',
        text:'前往登入',
        willClose:()=>{
          router.push('/login');
        }
      })
    }
})
}
  },[])

  return (
    <>
    <Layout>
      {/* <div className={styles.contain}> */}
        <div style={{padding:30}} className={styles.flex_center}>
          <div className={styles.left_section}>
            <div className={styles.user_info}>
              <img className={styles.img} src='/images/user/profile.png'/>
              <p>{parkAuth.nickname}</p>
              <p>{parkAuth.email}</p>
            </div>
            <div className={styles.column}>
              <button className={orderClass} onClick={()=>{
                if (orderClass === styles.button){
                  setOrderClass(styles.selected_button)
                }else{
                  setOrderClass(styles.button)
                }
              }}>會員訂單</button>
              <button className={ticketClass} onClick={()=>{
                if (ticketClass === styles.button){
                  setTicketClass(styles.selected_button)
                }else{
                  setTicketClass(styles.button)
                }
              }}>優惠券</button>
              <button className={collectClass} onClick={()=>{
                if (collectClass === styles.button){
                  setCollectClass(styles.selected_button)
                }else{
                  setCollectClass(styles.button)
                }
              }}>我的收藏</button>
              <button className={editClass} onClick={()=>{
                if (editClass === styles.button){
                  setEditClass(styles.selected_button)
                }else{
                  setEditClass(styles.button)
                }
              }}>修改資料</button>
              <button className={showClass} onClick={()=>{
                if (showClass === styles.button){
                  setShowClass(styles.selected_button)
                }else{
                  setShowClass(styles.button)
                }
              }}>表演預約</button>
              <button className={styles.button} onClick={(e) => {
                    e.preventDefault();
                    logout();
                    Alert.fire({ 
                      didOpen: () => { 
                          Alert.fire({
                            titleText:'登出成功',
                            text:'前往首頁',
                          }),
                          Alert.fire({
                            titleText:'登出成功',
                            text:'前往首頁',
                            willClose:()=>{
                              router.push('/');
                            }
                          })
                        }
                      })
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
                <td className={styles.td}>{data.user_nickname}</td>
              </tr>
              <tr>
                <th className={styles.th}>email</th>
                <td colSpan="3" className={styles.td}>{data.user_email}</td>
              </tr>
              <tr>
                <th className={styles.th}>手機號碼</th>
                <td className={styles.td}>{data.phone}</td>
                <th className={styles.th}>生日</th>
                <td className={styles.td}>{data.birthday}</td>
              </tr> 
              <tr>
                <th className={styles.th}>地址</th>
                <td colSpan="3" className={styles.td}>{data.address}</td>
              </tr>
            </tbody>
            </table>
          </div>
        </div>
      {/* </div> */}
      </Layout>
      <Head><title>會員中心</title></Head>
    </>
  )
}
