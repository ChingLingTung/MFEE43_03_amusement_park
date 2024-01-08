import React from 'react'
import styles from '@/styles/restaurant_detail.module.css'
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function RestaurantDetail() {
  return (
    <>
        <h2 className={styles.title}>餐廳名稱</h2>
        <div className={styles.flex_center}>
          <img className={styles.img} src='/../../images/reataurant/teatime/tf1-1.webp'/>
          <div style={{width:600, lineHeight:2}}>
            <p>類型：午茶點心</p>
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
          <img className={styles.mini_img} src='/../../images/reataurant/teatime/tf1-2.webp'/>
          <img className={styles.mini_img} src='/../../images/reataurant/teatime/tf1-3.webp'/>
          <img className={styles.mini_img} src='/../../images/reataurant/teatime/tf1-4.jpg'/>
          <img className={styles.mini_img} src='/../../images/reataurant/teatime/tf1-5.jpg'/>
        </div>
        <h2 className={styles.title}>周邊餐廳</h2>
        <div className={styles.card_flex}>
          <div className={styles.card}>
            <img className={styles.card_img} src='/../../images/tf1-1.webp'/>
            <div style={{padding:5}}>
              <div className={styles.card_title}>餐廳名稱</div>
              <div>餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述</div>
            </div>
          </div>
          <div className={styles.card}>
            <img className={styles.card_img} src='/../../images/tf1-1.webp'/>
            <div style={{padding:5}}>
              <div className={styles.card_title}>餐廳名稱</div>
              <div>餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述</div>
            </div>
          </div>
          <div className={styles.card}>
            <img className={styles.card_img} src='/../../images/tf1-1.webp'/>
            <div style={{padding:5}}>
              <div className={styles.card_title}>餐廳名稱</div>
              <div>餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述</div>
            </div>
          </div>
        </div>
    </>
  )
}
