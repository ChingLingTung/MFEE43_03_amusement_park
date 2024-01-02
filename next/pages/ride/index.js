import React from 'react'
import styles from '@/styles/ride.module.css'
import { IoSearchOutline } from "react-icons/io5";
import Image from 'next/image';

export default function Ride() {
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>設施搜尋</h2>
        <br/>
        <div className={styles.flex_center}>
          <span className={styles.button} style={{width:50}}>主題</span>
          <span className={styles.button} style={{width:50}}>類型</span>
          <span className={styles.button} style={{width:80}}>刺激程度</span>
          <span className={styles.button} style={{width:95}}>輪椅可搭乘</span>
          <span type={'input'} className={styles.searchbar} placeholder={'請輸入設施名稱'}><IoSearchOutline style={{width:25}}/></span>
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
      <div className={styles.container}>
        <div className={styles.theme_img}>
          {/* <Image className={styles.theme_img} src={'/../../images/w1.jpg'} resizeMode={'cover'} style={{width:'100%',height:200}} /> */}
        </div>
        <div className={styles.flex_center}>
          <img src='/../../images/w1.jpg' width='380px' height='430px' className={styles.slide_card}/>
          <img src='/../../images/w1.jpg' width='380px' height='430px' className={styles.slide_card}/>
          <img src='/../../images/w1.jpg' width='380px' height='430px' className={styles.slide_card}/>
        </div>
      </div>
        {/* https://stackoverflow.com/questions/45187785/react-native-how-to-make-image-width-100-percent-and-vertical-top */}
    </>
  )
}
