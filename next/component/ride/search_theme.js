import React from 'react'
import styles from '@/styles/ride_search.module.css'

export default function SearchTheme() {
  return (
    <>
      <span  className={styles.search_flex} style={{width:500}}>
        <span className={styles.button} style={{width:50}}>主題</span>
        <span className={styles.children_button} style={{width:70}} >水世界</span>
        <span className={styles.children_button} style={{width:85}}>冒險之旅</span>
        <span className={styles.children_button} style={{width:85}}>慢樂悠遊</span>
        <span className={styles.children_button} style={{width:85}}>樂高天堂</span>
      </span>
    </>
  )
}
