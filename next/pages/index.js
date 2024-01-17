import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/index.module.css'
import { FaChevronRight } from "react-icons/fa6";
import { Layout } from '@/component/Layout';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Layout>
      <div className={styles.container}>
        <h2 className={styles.title}>最新消息</h2>
        <div className={styles.flex_center}>
          <div className={styles.card} style={{marginRight:10}}>
            <div>
              <Image className={styles.img} src={'/../images/newyear.jpg'} width={500} height={350}/>
            </div>
            <div className={styles.column} style={{width:500,height:250,padding:5}}>
              <h3>標題</h3>
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
                <h4 style={{paddingLeft:5}}>標題</h4>
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
                <h4 style={{paddingLeft:5}}>標題</h4>
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
                <h4 style={{paddingLeft:5}}>標題</h4>
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
                <h4 style={{paddingLeft:5}}>標題</h4>
                <div className={styles.flex_spacebetween} style={{width:380,height:25,paddingLeft:5}}>
                  <p>日期</p>
                  <button type='button' className={styles.button}>看更多<FaChevronRight style={{height:15,width:15}}/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.flex_spacebetween} style={{marginTop:200}}>
        <div className={styles.flex_center} style={{width:800}}>
          <div>
            <h2 style={{textAlign:'center',lineHeight:5}}>水世界</h2>
            <p>從適合一家大小的悠閒設施到刺激的設施一應俱全！</p>
          </div>
        </div>
        <div>
        <Image className={styles.theme_img} src={'/images/ride/w2.jpg'} width={1000} height={600}/>
        </div>
      </div>
      <div className={styles.flex_spacebetween} style={{marginTop:200}}>
        <div>
        <Image className={styles.theme_img2} src={'/images/ride/i8.jpg'} width={1000} height={600}/>
        </div>
        <div className={styles.flex_center} style={{width:800}}>
          <div>
            <h2 style={{textAlign:'center',lineHeight:5}}>冒險之旅</h2>
            <p>從適合一家大小的悠閒設施到刺激的設施一應俱全！</p>
          </div>
        </div>
      </div>
      <div className={styles.flex_spacebetween} style={{marginTop:200}}>
        <div className={styles.flex_center} style={{width:800}}>
          <div>
            <h2 style={{textAlign:'center',lineHeight:5}}>慢樂悠遊</h2>
            <p>從適合一家大小的悠閒設施到刺激的設施一應俱全！</p>
          </div>
        </div>
        <div>
        <Image className={styles.theme_img} src={'/images/ride/s2.jpg'} width={1000} height={600}/>
        </div>
      </div>
      <div className={styles.flex_spacebetween} style={{marginTop:200}}>
        <div>
        <Image className={styles.theme_img2} src={'/images/ride/b1.jpg'} width={1000} height={600}/>
        </div>
        <div className={styles.flex_center} style={{width:800}}>
          <div>
            <h2 style={{textAlign:'center',lineHeight:5}}>樂高天堂</h2>
            <p>從適合一家大小的悠閒設施到刺激的設施一應俱全！</p>
          </div>
        </div>
      </div>
      </Layout>
      <Head><title>首頁</title></Head>
    </>
  )
}
