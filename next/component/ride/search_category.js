import React, { useState } from 'react'
import styles from '@/styles/ride_search.module.css'

export default function SearchCategory() {
  const [searchCategory,setSearchCategory]=useState(0)
  return (
    <>
      <span className={styles.search_flex} style={{width:500}}>
        <span className={styles.button} style={{width:50}}>類型</span>
        <span className={styles.children_button} style={{width:85}}
        onClick={()=>{
          if( searchCategory === 0){
            setSearchCategory(1);
          }else{
            setSearchCategory(0);
          }
          console.log(searchCategory);}
          }>兒童友善</span>
        <span className={styles.children_button} style={{width:85}} 
        onClick={()=>{
          if( searchCategory === 0){
            setSearchCategory(2)
          }else{
            setSearchCategory(0)
          }
          console.log(searchCategory);}
          }>親子同樂</span>
        <span className={styles.children_button} style={{width:85}} 
        onClick={()=>{
          if( searchCategory === 0){
            setSearchCategory(3)
          }else{
            setSearchCategory(0)
          }
          console.log(searchCategory);}
          }>刺激冒險</span>
      </span>
    </>
  )
}
