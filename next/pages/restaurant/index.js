import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/restaurant.module.css'
import { FaChevronRight } from "react-icons/fa6";
import { Layout } from '@/component/layout';
import { SHOP_LIST } from '@/component/ride-const';
import { useRouter } from 'next/router';
import { useState,useContext,useEffect } from 'react';
import Link from 'next/link';

export default function Shop() {
  const [data, setData] = useState({});
  const router = useRouter();
  const getListData = async () => {
    
    try {
      const r = await fetch(SHOP_LIST);
      const d = await r.json();
      setData(d);
    } catch (ex) {
      console.log(ex)
    }
  };
  useEffect(() => {
    getListData();
  },[]);
  return (
    <>
      <Layout>
        <div className={styles.container}>
          <h2 className={styles.title}>餐廳列表</h2>
          <div className={styles.card_flex}>
          {data.rows &&
            data.rows.map((i)=>{
              return (
                <div key={i.shop_id}>
                  <Link href={`/restaurant/details/${i.shop_id}`}>
                    <div className={styles.card}>
                      <img className={styles.card_img} src={`/images/restaurant/${i.shop_type_name2}/${i.shop_name2}/food/${i.shop_img}`}/>
                      <div style={{padding:10}}>
                        <div className={styles.space_between}>
                          <div className={styles.card_title}>{i.shop_name}</div>
                          <div className={styles.tag} style={{backgroundColor:i.tag_color}}>{i.shop_type_name}</div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })
          }

          </div>
        </div>
      </Layout>
      <Head><title>餐廳列表</title></Head>
    </>
  )
}