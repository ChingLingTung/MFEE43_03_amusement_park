import React from 'react'
import styles from '@/components/Footer/Footer.module.css'

export default function Footer() {
  return (
    <>
      <div className={styles['footer-container']}>
        <div className={styles['footer-title']}>Contact us</div>
        <div className={styles['footer-desc']}>
          <div className={styles['footer-flex']}>
            <div className={styles['footer-desc-title']}>提供服務</div>
            <div className={styles['footer-desc-descs']}>導覽地圖</div>
            <div className={styles['footer-desc-descs']}>周邊美食</div>
            <div className={styles['footer-desc-descs']}>販賣商品</div>
          </div>
          <div className={styles['footer-flex']}>
            <div className={styles['footer-desc-title']}>常見問題</div>
            <div className={styles['footer-desc-descs']}>票券購買</div>
            <div className={styles['footer-desc-descs']}>客製商品</div>
            <div className={styles['footer-desc-descs']}>設施維護</div>
          </div>
          <div className={styles['footer-flex']}>
            <div className={styles['footer-desc-title']}>聯絡我們</div>
            <div className={styles['footer-desc-descs']}>聯繫客服</div>
            <div className={styles['footer-desc-descs']}>合作申請</div>
            <div className={styles['footer-desc-descs']}>人員招募</div>
          </div>
        </div>
      </div>
    </>
  )
}
