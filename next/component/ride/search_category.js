import React from 'react'
import styles from '@/styles/ride_search.module.css'

export default function SearchCategory() {
  return (
    <>
      <span className={styles.search_flex} style={{width:500}}>
        <span className={styles.button} style={{width:50}}>類型</span>
        <span className={styles.children_button} style={{width:85}}>兒童友善</span>
        <span className={styles.children_button} style={{width:85}}>親子同樂</span>
        <span className={styles.children_button} style={{width:85}}>刺激冒險</span>
      </span>
    </>
  )
}
