import React from 'react'
import styles from '@/styles/ride_detail.module.css'
import { FaRegCalendarDays } from "react-icons/fa6";
import { FaTicketAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image';
import { RIDE_GET_ONE, GET_3_SAME_TYPE_RIDE } from '@/component/ride-const';
import Head from 'next/head';
import { Layout } from '@/component/layout';
import { useState,useEffect } from 'react';

export default function RideDetail() {
  const [getData, setGetData] = useState({
    amusement_ride_id:"",
    amusement_ride_name:"",
    amusement_ride_img:"", 
    amusement_ride_longitude:"", 
    amusement_ride_latitude:"",
    ride_category_id:"", 
    ride_category_name:"", 
    thriller_rating:"", 
    ride_support_name:"", 
    theme_name:"", 
    amusement_ride_description:"",
  });
  const [getTypeData, setGetTypeData] = useState({});
  const router = useRouter();
  useEffect(() => {
    const amusement_ride_id = +router.query.amusement_ride_id;
    console.log({ amusement_ride_id, raw: router.query.amusement_ride_id });
    // 有抓到值時
    if (router.query.amusement_ride_id !== undefined) {
      if (!amusement_ride_id) {
        router.push("/ride"); // amusement_ride_id 是 NaN 就跳到列表頁
      } else {
        // 取得單筆資料
        fetch(RIDE_GET_ONE + "/" + amusement_ride_id)
          .then((r) => r.json())
          .then((data) => {
            if (!data.success) {
              router.push("/ride"); // 沒拿到資料, 跳到列表頁
            } else {
              setGetData({ ...data.row });
            }
          })
          .catch((ex) => console.log(ex));
      }
    }
  }, [router.query.amusement_ride_id]);

const getTypeList = async()=>{
  try {
    const r = await fetch(
      GET_3_SAME_TYPE_RIDE + 
      '?' + `ride_category_id=${getData.ride_category_id}` + '&'
      + `amusement_ride_id=${getData.amusement_ride_id}`);
      const d = await r.json();
      setGetTypeData(d);
  } catch (ex) {
    console.log(ex)
  }
}

useEffect(()=>{
  getTypeList()
},[getData.ride_category_id,getData.amusement_ride_id]);

    return (
        
        <div key={getData.amusement_ride_id}>
          <Layout>
            <h2 className={styles.title}>{getData.amusement_ride_name}</h2>
            <div className={styles.flex_center}>
              <img className={styles.img} src={`/images/ride/${getData.amusement_ride_img}`}/>
              <div style={{width:600, lineHeight:2}}>
                <p>設施簡介：</p>
                <p>{getData.amusement_ride_description}</p>
                <p>刺激程度：{new Array(getData.thriller_rating).fill(<FaStar />)}</p>
                <p>適合：{getData.ride_category_name}</p>
                <p>身高限制：{getData.height_requirement}</p>
                <p>特殊支援：{getData.ride_support_name}</p>
                <p>設備維護狀況：目前開放中，可正常使用。</p>
                {/* <p style={{color:"red"}}>下次維護時間：2024/2/20</p> */}
                <Link href={'/maintain'}>
                  <p style={{color:"red"}}><FaRegCalendarDays />完整維護排程</p>
                </Link>
                {/* <p style={{color:"red"}}>快速通關：本設施為快速通關套票可選擇的設施之一</p>
                <p style={{color:"red"}}><FaTicketAlt />適用的快速通關票券</p> */}
              </div>
            </div>
            <h2 className={styles.title}>類似設施</h2>
            <div className={styles.card_flex}>
              {/* <div className={styles.card}>
                <img className={styles.card_img} src='/../../images/w1.jpg'/>
                <div style={{padding:5}}>
                  <div className={styles.card_title}>設施名稱</div>
                  <div>設施敘述設施敘述設施敘述設施敘述設施敘述設施敘述設施敘述設施敘述設施敘述設施敘述</div>
                </div>
              </div>
              <div className={styles.card}>
                <img className={styles.card_img} src='/../../images/w1.jpg'/>
                <div style={{padding:5}}>
                  <div className={styles.card_title}>設施名稱</div>
                  <div>設施敘述設施敘述設施敘述設施敘述設施敘述設施敘述設施敘述設施敘述設施敘述設施敘述</div>
                </div>
              </div>
              <div className={styles.card}>
                <img className={styles.card_img} src='/../../images/w1.jpg'/>
                <div style={{padding:5}}>
                  <div className={styles.card_title}>設施名稱</div>
                  <div>設施敘述設施敘述設施敘述設施敘述設施敘述設施敘述設施敘述設施敘述設施敘述設施敘述</div>
                </div>
              </div> */}
              {getTypeData.rows && getTypeData.rows.map((i)=>{
                return(
                  <div key= {i.amusement_ride_id} className={styles.card}>
                  <Link href={`/ride/details/${i.amusement_ride_id}`}>
                    <img className={styles.card_img} src={`/images/ride/${i.amusement_ride_img}`}/>
                    <div style={{padding:5}}>
                      <div className={styles.card_title}>{i.amusement_ride_name}</div>
                      <div>{i.amusement_ride_description}</div>
                    </div>
                  </Link>
                  </div>
                )
              })
              }
            </div>
          </Layout>
          <Head><title>設施詳細頁</title></Head>
        </div>
        
      );
    }
