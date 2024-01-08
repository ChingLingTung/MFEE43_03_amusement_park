import React from 'react'
import styles from '@/styles/ride.module.css'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import Image from 'next/image';
import { Layout } from '@/component/layout';
import Head from 'next/head';
import { RIDE_LIST } from '@/component/my-const';
import ThemeContext from '@/context/theme-context';
import { useRouter } from 'next/router';
import { useState,useContext,useEffect } from 'react';
import Link from 'next/link';

export default function Ride() {
  const [data, setData] = useState({});
  const router = useRouter();
  const {theme, setTheme} = useContext(ThemeContext);

  const getListData = async () => {
    console.log("router.query:", router.query);
    let page = +router.query.page || 1;
    if (page < 1) page = 1;
    try {
      const r = await fetch(RIDE_LIST + `?page=${page}`);
      const d = await r.json();

      setData(d);
    } catch (ex) {}
  };

  useEffect(() => {
    getListData();
  }, [router.query.page]);

  return (
    <>
    <Layout>
        <h2 className={styles.title}>設施搜尋</h2>
        <div className={styles.flex_center} style={{height:50}}>
          <span className={styles.flex_center}>
            <FaMagnifyingGlass style={{width:30,height:30.66,padding:5,borderRight:'none', position:'absolute',left:8}}/>
            <input name='ride_name' className={styles.searchbar} type={'text'} placeholder={'請輸入設施名稱'}/>
          </span>
        </div>
        <div className={styles.flex_center_column}>
          <div className={styles.search_flex} style={{height:50}}>
            <span  className={styles.search_flex} style={{width:500}}>
              <span className={styles.button} style={{width:50}}>主題</span>
              <span className={styles.children_button} style={{width:70}}>水世界</span>
              <span className={styles.children_button} style={{width:85}}>冒險之旅</span>
              <span className={styles.children_button} style={{width:85}}>慢樂悠遊</span>
            </span>
            <span  className={styles.search_flex} style={{width:500}}>
              <span className={styles.button} style={{width:50}}>類型</span>
              <span className={styles.children_button} style={{width:85}}>兒童友善</span>
              <span className={styles.children_button} style={{width:85}}>親子同樂</span>
              <span className={styles.children_button} style={{width:85}}>刺激冒險</span>
            </span>
          </div>
          <div className={styles.search_flex} style={{height:50}}>
            <span  className={styles.search_flex} style={{width:500}}>
              <span className={styles.button} style={{width:85}}>刺激程度</span>
              <span className={styles.children_button} style={{width:35}}><FaStar /></span>
              <span className={styles.children_button} style={{width:50}}><FaStar /><FaStar /></span>
              <span className={styles.children_button} style={{width:65}}><FaStar /><FaStar /><FaStar /></span>
              <span className={styles.children_button} style={{width:80}}><FaStar /><FaStar /><FaStar /><FaStar /></span>
              <span className={styles.children_button} style={{width:95}}><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span>
            </span>
            <span  className={styles.search_flex} style={{width:500}}>
              <span className={styles.button} style={{width:85}}>特殊支援</span>
              <span className={styles.children_button} style={{width:100}}>輪椅可搭乘</span>
            </span>
          </div>
          <div className={styles.card_flex}>
            {data.rows &&
                  data.rows.map((i) => {
                  return (
                      
                      <div key={i.amusement_ride_id}>
                          <Link href={'#'}>
                            <div  className={styles.card}>
                              <Image className={styles.card_img} src={`/images/ride/${i.amusement_ride_img}`} alt={i.amusement_ride_img} width={150} height={150}/>
                              <span className={styles.card_title}>{i.amusement_ride_name}</span>
                            </div>
                          </Link>
                      </div>
                      
                    );
                  })} 
          </div>
          <div className={styles.theme_img}>
            <img className={styles.theme_img} src={'/images/ride/w1.jpg'} style={{width:'100%',height:200}} alt='' />
          </div>
          <div className={styles.flex_center}>
            <img src='/images/ride/w1.jpg' width='380px' height='430px' className={styles.slide_card} alt=''/>
          </div>
        </div>
      </Layout>
      <Head><title>設施介紹</title></Head>
    </>
  )
}
