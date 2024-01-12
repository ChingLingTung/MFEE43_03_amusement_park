import React from 'react'
import styles from '@/styles/ride.module.css'
import { FaMagnifyingGlass } from "react-icons/fa6";
import Image from 'next/image';
import { Layout } from '@/component/layout';
import Head from 'next/head';
import { RIDE_LIST } from '@/component/ride-const';
import { useRouter } from 'next/router';
import { useState,useContext,useEffect } from 'react';
import Link from 'next/link';
import SearchTheme from '@/component/ride/search_theme';
import SearchCategory from '@/component/ride/search_category';
import SearchThillerRating from '@/component/ride/search_thiller_rating';
import SearchSupport from '@/component/ride/search_support';

export default function Ride() {
  const [data, setData] = useState({});
  const [search, setSearch] =useState(false)
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const getListData = async () => {
    const usp = new URLSearchParams(router.query)
    // console.log("router.query:", router.query);
    let page = +router.query.page || 1;
    let keyword = router.query.keyword || ''

    if (page < 1) page = 1;
    try {
      const r = await fetch(RIDE_LIST + `?${usp.toString()}`);
      const d = await r.json();
      // console.log(value)
      setData(d);
    } catch (ex) {
      console.log(ex)
    }
  };
  // const getListData = async () => {
  //   // console.log("router.query:", router.query);
  //   let page = +router.query.page || 1;
  //   // 關鍵字搜尋
  //   let keyword = router.query.keyword || ''
  //   if (page < 1) page = 1;
  //   try {
  //     const r = await fetch(RIDE_LIST + `?${usp.toString()}`);
  //     const d = await r.json();
  //     // console.log(value)
  //     setData(d);
  //   } catch (ex) {
  //     console.log(ex)
  //   }
  // };
  useEffect(() => {
    getListData();
  },[keyword]);

  return (
    <>
    <Layout>
        <h2 className={styles.title}>設施搜尋</h2>
        <div className={styles.flex_center} style={{height:50}}>
          <span className={styles.flex_center}>
            <FaMagnifyingGlass style={{width:30,height:30.66,padding:5,borderRight:'none', position:'absolute',left:8}}/>
            <input name='ride_name' className={styles.searchbar} type={'text'} placeholder={'請輸入設施名稱'}  
            onChange={(e) => {
              setKeyword(e.currentTarget.value);
              router.push(
                          {
                            pathname: '/ride',
                            query: { ...router.query, keyword: e.target.value },
                          },
                          undefined,
                          { scroll: false }
                        )
            }}
            // onChange={(e) => {setKeyword(e.currentTarget.value)
            //   router.push(
            //               {
            //                 pathname: '/ride',
            //                 query: { ...router.query, keyword: e.target.value },
            //               },
            //               undefined,
            //               { scroll: false }
            //             )
            //           }}


              />
          </span>
        </div>
        <div className={styles.flex_center_column}>
          <div className={styles.search_flex} style={{height:50}}>
            <SearchTheme search={search} />
            <SearchCategory search={search} />
          </div>
          <div className={styles.search_flex} style={{height:50}}>
            <SearchThillerRating search={search}/>
            <SearchSupport search={search}/>
          </div>
          <div className={styles.card_flex}>
            {data.rows &&
                  data.rows.map((i) => {
                  return (
                      
                      <div key={i.amusement_ride_id}>
                          <Link href={`/ride/details/${i.amusement_ride_id}`}>
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
            <img className={styles.theme_img} src={'/images/ride/w1.jpg'} style={{width:'100%',height:200,marginTop:100}} alt='' />
          </div>
          <div className={styles.flex_center} style={{marginTop:50,marginBottom:100}}>
            <img src='/images/ride/w1.jpg' width='380px' height='430px' className={styles.slide_card} alt=''/>
          </div>
          <div className={styles.theme_img}>
            <img className={styles.theme_img} src={'/images/ride/i9.jpg'} style={{width:'100%',height:200}} alt='' />
          </div>
          <div className={styles.flex_center}  style={{marginTop:50,marginBottom:100}}>
            <img src='/images/ride/i9.jpg' width='380px' height='430px' className={styles.slide_card} alt=''/>
          </div>
          <div className={styles.theme_img}>
            <img className={styles.theme_img} src={'/images/ride/s1.jpg'} style={{width:'100%',height:200}} alt='' />
          </div>
          <div className={styles.flex_center}  style={{marginTop:50,marginBottom:100}}>
            <img src='/images/ride/s3.jpg' width='380px' height='430px' className={styles.slide_card} alt=''/>
          </div>
          <div className={styles.theme_img}>
            <img className={styles.theme_img} src={'/images/ride/b2.jpg'} style={{width:'100%',height:200}} alt='' />
          </div>
          <div className={styles.flex_center}  style={{marginTop:50,marginBottom:100}}>
            <img src='/images/ride/b4.jpg' width='380px' height='430px' className={styles.slide_card} alt=''/>
          </div>
        </div>
      </Layout>
      <Head><title>設施介紹</title></Head>
    </>
  )
}
