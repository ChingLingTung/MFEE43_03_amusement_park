import { useState } from 'react'
import React from 'react'
import styles from '@/styles/ride_search.module.css'

export default function SearchTheme() {
  const [searchTheme,setSearchTheme]=useState(0)

  return (
    <>
      <span  className={styles.search_flex} style={{width:500}}>
        <span className={styles.button} style={{width:50}}>主題</span>
        <span className={styles.children_button} style={{width:70}} 
        onClick={()=>{
          if( searchTheme === 0){
            setSearchTheme(1)
          }else{
            setSearchTheme(0)
          }
          console.log(searchTheme);}
          }>水世界</span>
        <span className={styles.children_button} style={{width:85}} 
        onClick={()=>{
          if( searchTheme === 0){
            setSearchTheme(2)
          }else{
            setSearchTheme(0)
          }
          console.log(searchTheme);}
          }>冒險之旅</span>
        <span className={styles.children_button} style={{width:85}}
        onClick={()=>{
          if( searchTheme === 0){
            setSearchTheme(3)
          }else{
            setSearchTheme(0)
          }
          console.log(searchTheme);}
          }>慢樂悠遊</span>
        <span className={styles.children_button} style={{width:85}} 
        onClick={()=>{
          if( searchTheme === 0){
            setSearchTheme(4)
          }else{
            setSearchTheme(0)
          }
            console.log(searchTheme);}
          }>樂高天堂</span>
      </span>
    </>
  )
}
