import React from 'react'
import styles from '@/styles/ride.module.css'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import Image from 'next/image';
import { Layout } from '@/component/layout';
import Head from 'next/head';
import { RIDE_LIST } from '@/component/ride-const';
import { useRouter } from 'next/router';
import { useState,useContext,useEffect } from 'react';
import Link from 'next/link';

export default function Ride() {
  const [data, setData] = useState({});
  const router = useRouter();
  // const [keyword, setKeyword] = useState("");
  const [value, setValue] = useState("");
  const [classValue, setClassValue]=useState("ride_children_button__ZA1aw")
  const [option, setOption] = useState("");
  const getListData = async () => {
    console.log("router.query:", router.query);
    let page = +router.query.page || 1;

    if (page < 1) page = 1;
    try {
      const r = await fetch(RIDE_LIST + `?page=${page}`);
      const d = await r.json();
      console.log(value)
      setData(d);
    } catch (ex) {}
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

//   const getListData = async () => {
//     const usp = new URLSearchParams(router.query)

//     //console.log('router.query:', router.query)
//     let page = +router.query.page || 1

//     // 關鍵字搜尋
//     let keyword = router.query.keyword || ''



//     if (page < 1) page = 1
//     try {
//       const r = await fetch(BLOG_LIST + `?${usp.toString()}`)
//       const d = await r.json()
//       console.log(d)
//       setData(d)
//     } catch (ex) {
//       console.log(ex)
//     }
//   }

// return (
//     <>
// <input
//                       type="search"
//                       className={styles['bg-search']}
//                       id="bg-search"
//                       placeholder="請輸入搜尋關鍵字"
//                       name="keyword"
//                       onChange={(e) => {
//                         // setKeyword(e.currentTarget.value)

//                         router.push(
//                           {
//                             pathname: '/blog',
//                             query: { ...router.query, keyword: e.target.value },
//                           },
//                           undefined,
//                           { scroll: false }
//                         )
//                       }}
//                     />

// <>
// }
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
            <input name='ride_name' className={styles.searchbar} type={'text'} placeholder={'請輸入設施名稱'} 
            value={value} 
            onChange={(e) => {setValue(e.target.value);console.log(e.target.value)}}
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
            <span  className={styles.search_flex} style={{width:500}}>
              <span className={styles.button} style={{width:50}}>主題</span>
              <span className={classValue} id='theme_1' style={{width:70}} value={option} 
              onClick={() => {
                const elements=document.getElementsByClassName("ride_selected_children_button__GjYPq");
                if(option==="")
                {
                  setOption("theme_1");
                  console.log(option)}
                else{
                  setOption("");
                  console.log(option);
                };
                if(classValue === 'ride_children_button__ZA1aw'){
                  elements.classValue="ride_children_button__ZA1aw";
                  setClassValue("ride_selected_children_button__GjYPq");
                  console.log(classValue);
                  }else{
                    setClassValue("ride_children_button__ZA1aw");
                    console.log(classValue)
                  }
                }}>水世界</span>
              <span className={classValue} id='theme_2' style={{width:85}} value={option} onClick={() => {
                if(option==="")
                {setOption('theme_2');
                console.log(option)}
                else{
                  setOption("");
                  console.log(option);
                };
                const elements=document.getElementsByClassName(styles.selected_children_button);
                if(classValue === 'ride_children_button__ZA1aw'){
                  elements.classValue="ride_children_button__ZA1aw";
                  setClassValue("ride_selected_children_button__GjYPq");
                  console.log(classValue);
                  }else{
                    setClassValue("ride_children_button__ZA1aw");
                    console.log(classValue)
                  }
                }}>冒險之旅</span>
              <span className={styles.children_button} style={{width:85}} onClick={() => {
                if(option==="")
                {setOption('theme_3');
                console.log(option)}
                else{
                  setOption("");
                  console.log(option);
                };
                }}>慢樂悠遊</span>
                <span className={styles.children_button} style={{width:85}} onClick={() => {
                if(option==="")
                {setOption('theme_4');
                console.log(option)}
                else{
                  setOption("");
                  console.log(option);
                };
                }}>樂高天堂</span>
            </span>
            <span  className={styles.search_flex} style={{width:500}}>
              <span className={styles.button} style={{width:50}}>類型</span>
              <span className={styles.children_button} style={{width:85}} onClick={() => {
                if(option==="")
                {setOption('category_1');
                console.log(option)}
                else{
                  setOption("");
                  console.log(option);
                };
                }}>兒童友善</span>
              <span className={styles.children_button} style={{width:85}} onClick={() => {
                if(option==="")
                {setOption('category_2');
                console.log(option)}
                else{
                  setOption("");
                  console.log(option);
                };
                }}>親子同樂</span>
              <span className={styles.children_button} style={{width:85}} onClick={() => {
                if(option==="")
                {setOption('category_3');
                console.log(option)}
                else{
                  setOption("");
                  console.log(option);
                };
                }}>刺激冒險</span>
            </span>
          </div>
          <div className={styles.search_flex} style={{height:50}}>
            <span  className={styles.search_flex} style={{width:500}}>
              <span className={styles.button} style={{width:85}}>刺激程度</span>
              <span className={styles.children_button} style={{width:35}} onClick={() => {
                if(option==="")
                {setOption('thillerRating_1');
                console.log(option)}
                else{
                  setOption("");
                  console.log(option);
                };
                }}><FaStar /></span>
              <span className={styles.children_button} style={{width:50}} onClick={() => {
                if(option==="")
                {setOption('thillerRating_2');
                console.log(option)}
                else{
                  setOption("");
                  console.log(option);
                };
                }}><FaStar /><FaStar /></span>
              <span className={styles.children_button} style={{width:65}} onClick={() => {
                if(option==="")
                {setOption('thillerRating_3');
                console.log(option)}
                else{
                  setOption("");
                  console.log(option);
                };
                }}><FaStar /><FaStar /><FaStar /></span>
              <span className={styles.children_button} style={{width:80}} onClick={() => {
                if(option==="")
                {setOption('thillerRating_4');
                console.log(option)}
                else{
                  setOption("");
                  console.log(option);
                };
                }}><FaStar /><FaStar /><FaStar /><FaStar /></span>
              <span className={styles.children_button} style={{width:95}} onClick={() => {
                if(option==="")
                {setOption('thillerRating_5');
                console.log(option)}
                else{
                  setOption("");
                  console.log(option);
                };
                }}><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span>
            </span>
            <span  className={styles.search_flex} style={{width:500}}>
              <span className={styles.button} style={{width:85}}>特殊支援</span>
              <span className={styles.children_button} style={{width:100}} onClick={() => {
                if(option==="")
                {setOption('support_2');
                console.log(option)}
                else{
                  setOption("");
                  console.log(option);
                };
                }}>輪椅可搭乘</span>
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
