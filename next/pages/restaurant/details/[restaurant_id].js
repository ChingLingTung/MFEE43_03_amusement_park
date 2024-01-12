import React from 'react'
import styles from '@/styles/restaurant_detail.module.css'
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head';
import { SHOP_GET_ONE } from '@/component/ride-const';
import { useState,useEffect } from 'react';
import { Layout } from '@/component/layout';

export default function RestaurantDetail() {
  const [getData, setGetData] = useState({
    shop_id:"",
    shop_name:"",
    shop_name2:"",
    shop_type_name:"",
    shop_type_name2:"",
    shop_img:"", 
    shop_img1:"", 
    shop_img2:"", 
    shop_img3:"", 
    shop_img4:"", 
  });
  const router = useRouter();
  useEffect(() => {
    const shop_id = +router.query.shop_id;
    console.log({shop_id, raw: router.query.shop_id });
    // 有抓到值時
    if (router.query.shop_id !== undefined) {
      if (!shop_id) {
        router.push("/shop"); //shop_id 是 NaN 就跳到列表頁
      } else {
        // 取得單筆資料
        fetch(SHOP_GET_ONE + "/" + shop_id)
          .then((r) => r.json())
          .then((data) => {
            if (!data.success) {
              router.push("/shop"); // 沒拿到資料, 跳到列表頁
            } else {
              setGetData({ ...data.row });
            }
          })
          .catch((ex) => console.log(ex));
      }
    }
  },[router.query.shop_id]);
  return (

      <div key={getData.shop_id}>
        <Layout>
          <h2 className={styles.title}>{getData.shop_name}</h2>
          <div className={styles.flex_center}>
          <img className={styles.img} src={`/images/restaurant/${getData.shop_type_name2}/${getData.shop_name2}/food/${getData.shop_img}`}/>
            <div style={{width:600, lineHeight:2}}>
              <p>類型：{getData.shop_type_name}</p>
              <p><FaUtensils /> 菜單</p>
              <p><FaRegClock /> 星期一：11：00~19：00 <FaAngleDown /></p>
              <p><FaPhoneAlt /> 02-1234567</p>
              <div className={styles.space_between}>
                <span><FaRegCheckCircle /> 有座位</span>
                <span><FaRegCheckCircle /> 可外帶</span>
              </div>
            </div>
          </div>
          <div className={styles.food_img}>
            <img className={styles.mini_img} src={`/images/restaurant/${getData.shop_type_name2}/${getData.shop_name2}/food/${getData.shop_img1}`}/>
            <img className={styles.mini_img} src={`/images/restaurant/${getData.shop_type_name2}/${getData.shop_name2}/food/${getData.shop_img2}`}/>
            <img className={styles.mini_img} src={`/images/restaurant/${getData.shop_type_name2}/${getData.shop_name2}/food/${getData.shop_img3}`}/>
            <img className={styles.mini_img} src={`/images/restaurant/${getData.shop_type_name2}/${getData.shop_name2}/food/${getData.shop_img4}`}/>
          </div>
          <h2 className={styles.title}>周邊餐廳</h2>
          <div className={styles.card_flex}>
            <div className={styles.card}>
              <img className={styles.card_img} src='/images/restaurant/teatime/street_churros/food/street_churros_food1.webp'/>
              <div style={{padding:5}}>
                <div className={styles.card_title}>餐廳名稱</div>
                <div>餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述</div>
            </div>
          </div>
          <div className={styles.card}>
            <img className={styles.card_img} src='/images/restaurant/teatime/street_churros/food/street_churros_food1.webp'/>
            <div style={{padding:5}}>
              <div className={styles.card_title}>餐廳名稱</div>
              <div>餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述</div>
            </div>
          </div>
          <div className={styles.card}>
            <img className={styles.card_img} src='/images/restaurant/teatime/street_churros/food/street_churros_food1.webp'/>
            <div style={{padding:5}}>
              <div className={styles.card_title}>餐廳名稱</div>
              <div>餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述</div>
            </div>
          </div>
          </div>
        </Layout>
      <Head><title>餐廳資訊</title></Head>
      </div>

  )
}
