import React, { useState } from 'react'
import styles from '@/styles/ride_search.module.css'



export default function SearchSupport() {
  const [searchSupport,setSearchSupport]=useState(0)

  return (
    <>
      <span className={styles.search_flex} style={{width:500}}>
        <span className={styles.button} style={{width:85}}>特殊支援</span>
        <span className={styles.children_button} style={{width:100}} 
        onClick={()=>{
          if( searchSupport === 0){
            setSearchSupport(1)
          }else{
            setSearchSupport(0)
          }
            console.log(searchSupport);}
          }>輪椅可搭乘</span>
      </span>
    </>
  )
}
