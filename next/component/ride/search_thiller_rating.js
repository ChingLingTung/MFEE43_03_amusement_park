import React from 'react'
import styles from '@/styles/ride_search.module.css'
import { FaStar } from "react-icons/fa6";


export default function SearchThillerRating() {
  return (
    <>
      <span className={styles.search_flex} style={{width:500}}>
        <span className={styles.button} style={{width:85}}>刺激程度</span>
        <span className={styles.children_button} style={{width:35}}><FaStar /></span>
        <span className={styles.children_button} style={{width:50}}><FaStar /><FaStar /></span>
        <span className={styles.children_button} style={{width:65}}><FaStar /><FaStar /><FaStar /></span>
        <span className={styles.children_button} style={{width:80}}><FaStar /><FaStar /><FaStar /><FaStar /></span>
        <span className={styles.children_button} style={{width:95}}><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span>
      </span>
    </>
  )
}
