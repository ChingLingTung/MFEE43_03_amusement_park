import React from 'react'
import styles from '@/styles/ride_detail.module.css'
import { AiOutlineSchedule } from "react-icons/ai";
import { FaTicketAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function RideDetail() {
  return (
    <>
        <h2 className={styles.title}>設施名稱</h2>
        <div className={styles.flex_center}>
          <img className={styles.img} src='/../../images/w1.jpg'/>
          <div style={{width:600, lineHeight:2}}>
            <p>設施簡介：</p>
            <p>設施簡介設施簡介設施簡介設施簡介設施簡介設施簡介設施簡介設施簡介設施簡介設施簡介設施簡介設施簡介設施簡介設施簡介設施簡介設施簡介設施簡介設施簡介設施簡介設施簡介設施簡介設施簡介</p>
            <p>刺激程度：<FaStar /><FaStar /><FaStar /></p>
            <p>適合：親子同樂</p>
            <p>身高限制：140cm</p>
            <p>特殊支援：無</p>
            <p>設備維護狀況：目前開放中，可正常使用。</p>
            <p>下次維護時間：2024/2/20</p>
            <p><AiOutlineSchedule/>完整維護排程</p>
            <p>快速通關：本設施為快速通關套票可選擇的設施之一</p>
            <p><FaTicketAlt />適用的快速通關票券</p>
          </div>
        </div>
        <h2 className={styles.title}>周邊設施</h2>
        <div className={styles.card_flex}>
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
          </div>
          <div className={styles.card}>
            <img className={styles.card_img} src='/../../images/w1.jpg'/>
            <div style={{padding:5}}>
              <div className={styles.card_title}>設施名稱</div>
              <div>設施敘述設施敘述設施敘述設施敘述設施敘述設施敘述設施敘述設施敘述設施敘述設施敘述</div>
            </div>
          </div>
        </div>
    </>
  )
}
