import React from 'react'
import styles from '@/styles/ride.module.css'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import Image from 'next/image';

export default function Ride() {
  return (
    <>
      
      <div className={styles.container}>
        <h2 className={styles.title}>設施搜尋</h2>
        <br/>
        <div className={styles.flex_center} style={{height:50}}>
          <span className={styles.flex_center}>
            <FaMagnifyingGlass style={{width:30,height:30.66,padding:5,borderRight:'none', position:'absolute',left:8}}/>
            <input name='ride_name' className={styles.searchbar} type={'text'} placeholder={'請輸入設施名稱'}/>
          </span>
        </div>
        <div className={styles.flex_center_column}>
            <div className={styles.search_flex} style={{height:50}}>
            <span className={styles.button} style={{width:50}}>主題</span>
            <span className={styles.children_button} style={{width:70}}>水世界</span>
            <span className={styles.children_button} style={{width:85}}>冒險之旅</span>
            <span className={styles.children_button} style={{width:85}}>慢樂悠遊</span>
          </div>
          <div className={styles.search_flex} style={{height:50}}>
            <span className={styles.button} style={{width:50}}>類型</span>
            <span className={styles.children_button} style={{width:85}}>兒童友善</span>
            <span className={styles.children_button} style={{width:85}}>親子同樂</span>
            <span className={styles.children_button} style={{width:85}}>刺激冒險</span>
          </div>
          <div className={styles.search_flex} style={{height:50}}>
            <span className={styles.button} style={{width:85}}>刺激程度</span>
            <span className={styles.children_button} style={{width:35}}><FaStar /></span>
            <span className={styles.children_button} style={{width:50}}><FaStar /><FaStar /></span>
            <span className={styles.children_button} style={{width:65}}><FaStar /><FaStar /><FaStar /></span>
            <span className={styles.children_button} style={{width:80}}><FaStar /><FaStar /><FaStar /><FaStar /></span>
            <span className={styles.children_button} style={{width:95}}><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span>
          </div>
          <div className={styles.search_flex} style={{height:50}}>
            <span className={styles.button} style={{width:85}}>特殊支援</span>
            <span className={styles.children_button} style={{width:100}}>輪椅可搭乘</span>
          </div>
          <div className={styles.card_flex}>
            <div>
              <Image className={styles.img} src={'/../../images/w1.jpg'} width={250} height={150} style={{marginLeft:10,marginRight:10}}/>
            </div>
            <div>
              <Image className={styles.img} src={'/../../images/w1.jpg'} width={250} height={150} style={{marginLeft:10,marginRight:10}}/>
            </div>
            <div>
              <Image className={styles.img} src={'/../../images/w1.jpg'} width={250} height={150} style={{marginLeft:10,marginRight:10}}/>
            </div>
            <div>
              <Image className={styles.img} src={'/../../images/w1.jpg'} width={250} height={150} style={{marginLeft:10,marginRight:10}}/>
            </div>
            <div>
              <Image className={styles.img} src={'/../../images/w1.jpg'} width={250} height={150} style={{marginLeft:10,marginRight:10}}/>
            </div>
            <div>
              <Image className={styles.img} src={'/../../images/w1.jpg'} width={250} height={150} style={{marginLeft:10,marginRight:10}}/>
            </div>
            <div>
              <Image className={styles.img} src={'/../../images/w1.jpg'} width={250} height={150} style={{marginLeft:10,marginRight:10}}/>
            </div>
          </div>
        </div>
          
      </div>
      <div className={styles.container}>
        <div className={styles.theme_img}>
          <img className={styles.theme_img} src={'/../../images/w1.jpg'} style={{width:'100%',height:200}} />
        </div>
        <div className={styles.flex_center}>
          <img src='/../../images/w1.jpg' width='380px' height='430px' className={styles.slide_card}/>
          <img src='/../../images/w1.jpg' width='380px' height='430px' className={styles.slide_card}/>
          <img src='/../../images/w1.jpg' width='380px' height='430px' className={styles.slide_card}/>
        </div>
      </div>
    </>
  )
}
