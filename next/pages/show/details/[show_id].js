import React from 'react'
import styles from '@/styles/show_detail.module.css'
import Head from 'next/head';
import {SHOW_GET_ONE} from '@/component/ride-const'
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import { Cursor } from 'react-custom-cursors';
import "react-custom-cursors/dist/index.css";


export default function ShowDetail() {
  const seat = [
    ["","","","A1","A2","","A3","A4","A5","","A6","A7","","",""],
    ["","","B1","B2","B3","","B4","B5","B6","","B7","B8","B9","",""],
    ["","C1","C2","C3","C4","","C5","C6","C7","","C8","C9","C10","C11",""],
    ["D1","D2","D3","D4","D5","","D6","D7","D8","","D9","D10","D11","D12","D13"],
    ["E1","E2","E3","E4","E5","","E6","E7","E8","","E9","E10","E11","E12","E13"],
    ["F1","F2","F3","F4","F5","","F6","F7","F8","","F9","F10","F11","F12","F13"],
    ["G1","G2","G3","G4","G5","","G6","G7","G8","","G9","G10","G11","G12","G13"],
    ["H1","H2","H3","H4","H5","","H6","H7","H8","","H9","H10","H11","H12","H13"],
    ["I1","I2","I3","I4","I5","I6","I7","I8","I9","I10","I11","I12","I13","I14","I15"],
  ];
  const [getData, setGetData] = useState({
    show_id:"",
    show_name:"",
    show_pic:"", 
    show_info:"", 
    show_info2:"", 
    show_group:"", 
    show_day:"", 
  });
  const [toggle,setToggle]=useState(false)
  const handleToggle=()=>{
    setToggle(true)
  }
  const router = useRouter();
  useEffect(() => {
    const show_id = +router.query.show_id;
    console.log({show_id, raw: router.query.show_id });
    // 有抓到值時
    if (router.query.show_id !== undefined) {
      if (!show_id) {
        router.push("/show"); //show_id 是 NaN 就跳到列表頁
      } else {
        // 取得單筆資料
        fetch(SHOW_GET_ONE + "/" + show_id)
          .then((r) => r.json())
          .then((data) => {
            if (!data.success) {
              router.push("/show"); // 沒拿到資料, 跳到列表頁
            } else {
              setGetData({ ...data.row });
            }
          })
          .catch((ex) => console.log(ex));
      }
    }
  }, [router.query.show_id]);
  return (
    <>
    <div key={getData.show_id}>
      <div className={styles.container}>
        <div style={{width:1200}}>
          <img className={styles.img} width='100%' height={300} src={`/images/show/${getData.show_pic}`} />
          <div className={styles.space_between}>
            <h2 className={styles.title}>{getData.show_name}</h2>
            <Link href={'/show'}>
              <button className={styles.button} style={{width:150}}>返回列表頁</button>
            </Link>
            
          </div>
          
          <h3 style={{marginBottom:20}}>表演資訊</h3>
          <div style={{lineHeight:2}}>
            <p>演出團隊：{getData.show_group}</p>
            <p>演出日期：{getData.show_day}</p>
            <p>演出時間：{getData.start} 至 {getData.finish}</p>
            <p>演出地點：樂高天堂主題館旁的演藝廳</p>
            <p>表演簡介：</p>
          </div>
          <p style={{marginTop:7}}>{getData.show_info}{getData.show_info2}</p>
          {!toggle? (
            <>
              <button className={styles.button} onClick={handleToggle}>預約</button>
            </>
          )
          :
          (
            <>
              <div style={{marginLeft:105,marginTop:50}} className={styles.seat_center}>
              <div>
                {seat.map((row, i) => (
                  <div key={i}>
                    {row.map((cell, j) => (
                      <span className={cell? styles.seat : styles.not_seat} key={j} style={cell? {} : {opacity:0}} value={cell} onClick={()=>console.log("這是編號："+cell)}>{cell? cell : "0"}</span>
                    ))}
                  </div>
                ))}
              </div>
              </div>
              <button style={{width:1200}} className={styles.button}>預約</button>
              <p>您預約的表演為{getData.show_group}帶來的{getData.show_name}</p>
              <p>演出時間：{getData.show_day}的{getData.start} 至 {getData.finish}</p>
              <p>預約座位：</p>
            </>
          )}
            <Head><title>表演詳細資訊</title></Head>
          </div>
        </div>  
      </div>
    </>
  )
}