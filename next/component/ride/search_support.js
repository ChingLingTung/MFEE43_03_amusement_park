import React from 'react'
import styles from '@/styles/ride_search.module.css'



export default function SearchSupport() {
  return (
    <>
      <span className={styles.search_flex} style={{width:500}}>
        <span className={styles.button} style={{width:85}}>特殊支援</span>
        <span className={styles.children_button} style={{width:100}}>輪椅可搭乘</span>
      </span>
    </>
  )
}
