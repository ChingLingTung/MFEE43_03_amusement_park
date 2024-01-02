import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/show.module.css'
import { FaChevronRight } from "react-icons/fa6";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>表演節目</h2>
        <div className={styles.flex_center}>
          <div className={styles.card} style={{marginRight:10}}>
            <div>
              <Image className={styles.img} src={'/../images/newyear.jpg'} width={500} height={350}/>
            </div>
            <div className={styles.column} style={{width:500,height:250,padding:5}}>
              <h3>節目名稱</h3>
              <div className={styles.flex_spacebetween} style={{height:25}}>
                <p>日期</p>
                <button type='button' className={styles.button}>看更多<FaChevronRight style={{height:15,width:15}}/></button>
              </div>
            </div>
          </div>
          <div className={styles.column} style={{width:630,height:600,marginLeft:10}}>
            
            <div className={styles.mini_card}>
              <div>
                <Image className={styles.mini_img} src={'/../images/newyear.jpg'} width={250} height={130}/>
              </div>
              <div style={{width:380,height:130}} className={styles.column}>
                <h4 style={{paddingLeft:5}}>節目名稱</h4>
                <div className={styles.flex_spacebetween} style={{width:380,height:25,paddingLeft:5}}>
                  <p>日期</p>
                  <button type='button' className={styles.button}>看更多<FaChevronRight style={{height:15,width:15}}/></button>
                </div>
              </div>
            </div>
            <div className={styles.mini_card}>
              <div>
                <Image className={styles.mini_img} src={'/../images/newyear.jpg'} width={250} height={130}/>
              </div>
              <div style={{width:380,height:130}} className={styles.column}>
                <h4 style={{paddingLeft:5}}>節目名稱</h4>
                <div className={styles.flex_spacebetween} style={{width:380,height:25,paddingLeft:5}}>
                  <p>日期</p>
                  <button type='button' className={styles.button}>看更多<FaChevronRight style={{height:15,width:15}}/></button>
                </div>
              </div>
            </div>
            <div className={styles.mini_card}>
              <div>
                <Image className={styles.mini_img} src={'/../images/newyear.jpg'} width={250} height={130}/>
              </div>
              <div style={{width:380,height:130}} className={styles.column}>
                <h4 style={{paddingLeft:5}}>節目名稱</h4>
                <div className={styles.flex_spacebetween} style={{width:380,height:25,paddingLeft:5}}>
                  <p>日期</p>
                  <button type='button' className={styles.button}>看更多<FaChevronRight style={{height:15,width:15}}/></button>
                </div>
              </div>
            </div>
            <div className={styles.mini_card}>
              <div>
                <Image className={styles.mini_img} src={'/../images/newyear.jpg'} width={250} height={130}/>
              </div>
              <div style={{width:380,height:130}} className={styles.column}>
                <h4 style={{paddingLeft:5}}>節目名稱</h4>
                <div className={styles.flex_spacebetween} style={{width:380,height:25,paddingLeft:5}}>
                  <p>日期</p>
                  <button type='button' className={styles.button}>看更多<FaChevronRight style={{height:15,width:15}}/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
