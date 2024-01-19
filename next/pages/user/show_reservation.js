import React, { useEffect } from 'react'
import styles from '@/styles/user.module.css'
import Head from 'next/head'
import AuthContext from "@/context/auth-context";
import { useState,useContext } from "react";
import { Layout } from '@/component/ride-layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { USER_RESERVATION } from '@/component/ride-const';

export default function UserShowReservation() {
  const { parkAuth, logout } = useContext(AuthContext);
  const router = useRouter();
  const Alert = withReactContent(Swal) ;
  const [data, setData] = useState({
    show_name:"",
    show_day:"",
    start:"",
    finish:"",
    seat_number:"",
  });
  const getListData = async () => {

    // const usp = new URLSearchParams(router.query)
    
    let page = +router.query.page || 1

    if (page < 1) page = 1;
    
      try {
      const r = await fetch(USER_RESERVATION + '?'+ `user_id=${parkAuth.id}`);
      const d = await r.json();

      setData(d);
      // console.log(d)
    } catch (ex) {
      console.log(ex)
    }
    };
    useEffect(()=>{
      getListData()
    },[])

    useEffect(()=>{
      getListData();
    },[data]);

  return (
    <>
      <Layout>
        <div style={{padding:30}} className={styles.flex_center}>
          <div className={styles.left_section}>
            <div className={styles.user_info}>
              <img className={styles.img} src='/images/user/profile.png'/>
              <p>{parkAuth.nickname}</p>
              <p>{parkAuth.email}</p>
            </div>
            <div className={styles.column}>
              <Link href='/user'>
                <button className={styles.button}>會員資料</button>
              </Link>
              <button className={styles.button}>會員訂單</button>
              <button className={styles.button}>優惠券</button>
              <button className={styles.button}>我的收藏</button>
              <button className={styles.button} onClick={()=>{
                if(parkAuth.email){
                  router.push(`/user/edit/${parkAuth.id}`)
                }else{
                  Alert.fire({ 
                      didOpen: () => { 
                          Alert.fire({
                            titleText:'您尚未登入',
                            text:'前往登入',
                          }),
                          Alert.fire({
                            titleText:'您尚未登入',
                            text:'前往登入',
                            willClose:()=>{
                              router.push('/login');
                            }
                          })
                        }
                      })
                }

              }}>修改資料</button>
              <button className={styles.selected_button}>表演預約</button>
              <button className={styles.button} onClick={(e) => {
                    e.preventDefault();
                    logout();
                    Alert.fire({ 
                      didOpen: () => { 
                          Alert.fire({
                            titleText:'登出成功',
                            text:'前往首頁',
                          }),
                          Alert.fire({
                            titleText:'登出成功',
                            text:'前往首頁',
                            willClose:()=>{
                              router.push('/');
                            }
                          })
                        }
                      })
                  }}>登出</button>
            </div>

          </div>
          <div className={styles.info_section}>
            <h2 className={styles.title}>表演預約</h2>
            {/* <table className={styles.table}> 
            <tbody>

              <tr> 
                <th className={styles.th}>演出節目</th> 
                <th className={styles.th}>演出日期</th>
                <th className={styles.th}>演出地點</th>
                <th className={styles.th}>演出時段</th>
                <th className={styles.th}>預約座位</th>
              </tr> 
              <tr> 
                <td className={styles.td}>新春光影秀</td> 
                <td className={styles.td}>113/3/5</td> 
                <td className={styles.td}>廣場旁演藝廳</td> 
                <td className={styles.td}>14:00-15:30</td> 
                <td className={styles.td}>D5、D6</td> 
              </tr> 
              <tr> 
                <td className={styles.td}>新春光影秀</td> 
                <td className={styles.td}>113/3/5</td> 
                <td className={styles.td}>廣場旁演藝廳</td> 
                <td className={styles.td}>14:00-15:30</td> 
                <td className={styles.td}>D5、D6</td> 
              </tr> 
            </tbody>
            </table> */}

            <table className={styles.table}> 
            <tbody>
              <tr> 
                <th className={styles.th}>演出節目</th> 
                <th className={styles.th}>演出日期</th>
                <th className={styles.th}>演出時段</th>
                <th className={styles.th}>演出地點</th>
                <th className={styles.th}>預約座位</th>
                <th className={styles.th}>查看表演資訊</th>
              </tr> 
            {data.rows && data.rows.map((i)=>{
              return(
                  <tr key = {i.show_name}>

                    <td className={styles.td}>{i.show_name}</td> 
                    <td className={styles.td}>{i.show_day}</td> 
                    <td className={styles.td}>{i.start}-{i.finish}</td>
                    <td className={styles.td}>廣場旁演藝廳</td>
                    <td className={styles.td}>{i.seat_number}</td>
                    <td className={styles.td}>
                      <button className={styles.show_info_button} onClick = {()=>{
                        router.push(`/show_reservation/${i.show_id}`)
                      }}>
                        點我看表演資訊
                      </button>
                      </td>
                  </tr> 
              )
            })}
              
            </tbody>
            </table>
          </div>
        </div>
        </Layout>
      <Head><title>會員中心</title></Head>
    </>
  )
}
