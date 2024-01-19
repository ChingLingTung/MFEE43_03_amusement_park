import React from 'react'
import styles from '@/styles/maintain.module.css'
import { FaMagnifyingGlass } from "react-icons/fa6";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import styled from "@emotion/styled"
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from '@fullcalendar/multimonth'
import Head from 'next/head';
import { MAINTAIN_GET_LIST } from '@/component/ride-const'; 
import { useEffect, useState } from 'react';
import { Layout } from '@/component/layout';


export const StyleWrapper = styled.div`
  .fc th {
    background: #de839e;
    color:#fff;
  }
  .fc td {
    background: #fff;
  }
  .fc-button {
    background: #de839e;
    border-color:#ffdfe8;
    font-size: 25px;
  }
  .fc-today-button .fc-button .fc-button-primary {
    background: #ffd2e0;

  }
  .fc-event{
    background:#ffd2e0;
    border:none
  }
  .fc-event-time .fc-event-title{
    color:#0000;
  }
  .fc-toolbar-title{

  }
  .fc-daygrid-event-dot{
    border-color: #820041;
  }
  .fc-v-event .fc-event-main{
    color:#820041;
  }
`
export default function Maintain() {
  // const [data, setData] = useState({});
  const [events, setEvents] = useState([]);
  function handleClick() {
    window.history.go(-1);
  }
  // let event = []; // 空list
    // ajax 從資料庫獲取資料
    // async function post_api() {
    //     const url = 'api/Selectionperiod';
    //     const response = await fetch(url, {
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         method: "POST",
    //         body: JSON.stringify(obj),
    //     })
    //     const res = await response.json();
    //     // ajax 結果新增到 event
    //     res.map(value => {
    //         // console.log(value);
    //         event.push({
    //             title: value['class_name'],
    //             start: value['class_day']
    //         })
    //     })
    // }
useEffect(()=>{
  getListData();
  console.log(events)
  
},[])

  const getListData = async () => {
    // const usp = new URLSearchParams(router.query)
    // let page = +router.query.page || 1

    // if (page < 1) page = 1;
      try {
      const r = await fetch(MAINTAIN_GET_LIST);
      const d = await r.json();
      // setData(d);
      // return d.rows.map(value => {
      //           // console.log(value);
      //           ({
      //               title: value.amusement_ride_name,
      //               start: value.maintenance_begin,
      //               end:value.maintenance_end
      //           })
      //       })
      // d.rows.forEach((row) => {
      //   event.push({
      //     title:row.amusement_ride_name,
      //     start:row.maintenance_begin,
      //     end:row.maintenance_end
      //   })
      //   console.log(event)
      //   setEvent(event);
      // })
      // return event;

    //   const eventData =( await d.rows.forEach((row) => {
    //       events.push({
    //         title:row.amusement_ride_name,
    //         start:row.maintenance_begin,
    //         end:row.maintenance_end
    //       })
    //   }))
    //   const newEventData= [...events, ...eventData]
    //   console.log(eventData)
    //   console.log(newEventData)
    //   setEvents(newEventData);
    // } catch (ex) {
    //   console.log(ex)
    // }
    let newEvents = [...events]
    await (d.rows.forEach((row) => {
      events.push({
      title:row.amusement_ride_name,
      start:row.maintenance_begin,
      end:row.maintenance_end
    })
  }))
    console.log(newEvents)
    setEvents(newEvents);
  } catch (ex) {
    console.log(ex)
  }
    };


  return (
    <>
    <Layout>
    <div className={styles.container}>
      <div className={styles.flex_spacebetween}>
        <div className={styles.flex_center} style={{height:50}}>
          <span className={styles.flex_center}>
            <FaMagnifyingGlass style={{width:30,height:30.66,padding:5,borderRight:'none', position:'absolute',left:25,marginTop:5}}/>
            <input name='ride_name' className={styles.searchbar} type={'text'} placeholder={'請輸入設施名稱'}/>
          </span>
          <button className={styles.button} onClick={handleClick}>返回上一頁</button>
        </div>
      </div>
        
      <h2 className={styles.title}>維護時間</h2>
      <div style={{width:1400,height:1200,padding:200,paddingTop:30}}>
        <StyleWrapper>
          <FullCalendar
          plugins={[ 
            dayGridPlugin,
            multiMonthPlugin,
            timeGridPlugin
            ]}
            headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,multiMonthYear',
          }}
          initialView="dayGridMonth"
          events = {events}
          // events={[
            // {data.rows && data.rows.map((i)=>{
            //   <div key= {i.maintenance_id}>
            //     {'title':{i.amusement_ride_name},'start':{i.maintenance_begin},'end':{i.maintenance_end}}
            //   </div>
            // })}
          // ]}
          // events={[
          //   // {title:'🛠️', date:'2024-03-03'},
          //   {title:'八彩天梯', start:'2024-01-11 09:00', end:'2024-01-11 12:00'},
          //   {title:'急流漩渦', start:'2024-01-09 09:00', end:'2024-01-09 12:00'},
          //   {title:'漂流探秘', start:'2024-01-05 09:00', end:'2024-01-05 12:00'},
          //   {title:'湧浪灣', start:'2024-01-14 13:00', end:'2024-01-14 16:00'},
          //   {title:'深谷飛瀑', start:'2024-01-19 09:00', end:'2024-01-19 12:00'},
          //   {title:'神秘迷沖', start:'2024-01-24 09:00', end:'2024-01-24 12:00'},
          //   {title:'沖天瀑布', start:'2024-01-17 09:00', end:'2024-01-17 12:00'},
          //   {title:'激流旅程', start:'2024-02-14 14:00', end:'2024-02-14 17:00'},
          //   {title:'旋風雙子梯/急轉雙子梯', start:'2024-02-04 14:00', end:'2024-02-04 17:00'},
          //   {title:'時速飛車', start:'2024-02-11 14:00', end:'2024-02-11 17:00'},
          //   {title:'沖天搖擺船', start:'2024-02-17 14:00', end:'2024-02-17 17:00'},
          //   {title:'飛天鞦韆', start:'2024-02-27 14:00', end:'2024-02-27 17:00'},
          //   {title:'急速快車', start:'2024-02-22 14:00', end:'2024-02-22 17:00'},
          //   {title:'翻天覆地', start:'2024-02-26 14:00', end:'2024-02-26 17:00'},
          //   {title:'狂野龍捲風', start:'2024-03-05 09:00', end:'2024-03-05 12:00'},
          //   {title:'升空奇遇', start:'2024-03-09 09:00', end:'2024-03-09 12:00'},
          //   {title:'橫衝直撞', start:'2024-03-19 09:00', end:'2024-03-19 12:00'},
          //   {title:'還迴水世界', start:'2024-03-13 09:00', end:'2024-03-13 12:00'},
          //   {title:'摩天巨輪', start:'2024-03-23 09:00', end:'2024-03-23 12:00'},
          //   {title:'海洋列車', start:'2024-03-25 09:00', end:'2024-03-25 12:00'},
          //   {title:'登山纜車', start:'2024-04-02 09:00', end:'2024-04-02 12:00'},
          //   {title:'迷你天地', start:'2024-04-07 09:00', end:'2024-04-07 12:00'},
          //   {title:'古堡歷險', start:'2024-04-11 14:00', end:'2024-04-11 17:00'},
          //   {title:'樂高4D動感體驗', start:'2024-04-18 14:00', end:'2024-04-18 17:00'},
          //   {title:'小小建築師', start:'2024-04-25 14:00', end:'2024-04-25 17:00'},
          //   {title:'魔法轉盤', start:'2024-05-13 14:00', end:'2024-05-13 17:00'},
          //   {title:'賽車小能手', start:'2024-05-06 14:00', end:'2024-05-06 17:00'},
          //   {title:'超速旋風', start:'2024-06-17 14:00', end:'2024-06-17 17:00'},
          //   {title:'八彩天梯', start:'2024-11-28 09:00', end:'2024-11-28 17:00'},
          //   {title:'急流漩渦', start:'2024-09-13 09:00', end:'2024-09-13 17:00'},
          //   {title:'漂流探秘', start:'2024-09-17 09:00', end:'2024-09-17 17:00'},
          //   {title:'湧浪灣', start:'2024-10-14 09:00', end:'2024-10-14 17:00'},
          //   {title:'深谷飛瀑', start:'2024-10-22 09:00', end:'2024-10-22 17:00'},
          //   {title:'神秘迷沖', start:'2024-10-29 09:00', end:'2024-10-29 17:00'},
          //   {title:'沖天瀑布', start:'2024-11-02 09:00', end:'2024-11-02 17:00'},
          //   {title:'激流旅程', start:'2024-11-13 09:00', end:'2024-11-13 17:00'},
          //   {title:'旋風雙子梯/急轉雙子梯', start:'2024-11-22 09:00', end:'2024-11-22 17:00'},
          //   {title:'時速飛車', start:'2024-11-17 09:00', end:'2024-11-17 17:00'},
          //   {title:'沖天搖擺船', start:'2024-12-03 09:00', end:'2024-12-03 17:00'},
          //   {title:'飛天鞦韆', start:'2024-12-09 09:00', end:'2024-12-09 17:00'},
          //   {title:'急速快車', start:'2024-12-15 09:00', end:'2024-12-15 17:00'},
          //   {title:'翻天覆地', start:'2024-12-19 09:00', end:'2024-12-19 17:00'},
          //   {title:'狂野龍捲風', start:'2024-12-24 09:00', end:'2024-12-24 17:00'},
          //   {title:'橫衝直撞', start:'2024-07-19 09:00', end:'2024-07-19 17:00'},
          //   {title:'升空奇遇', start:'2024-07-11 09:00', end:'2024-07-11 17:00'},
          //   {title:'還迴水世界', start:'2024-08-13 09:00', end:'2024-08-13 17:00'},
          //   {title:'摩天巨輪', start:'2024-08-23 09:00', end:'2024-08-23 17:00'},
          //   {title:'海洋列車', start:'2024-04-24 09:00', end:'2024-04-24 17:00'},
          //   {title:'登山纜車', start:'2024-05-22 09:00', end:'2024-05-22 17:00'},
          //   {title:'迷你天地', start:'2024-05-03 09:00', end:'2024-05-03 17:00'},
          //   {title:'古堡歷險', start:'2024-06-11 09:00', end:'2024-06-11 17:00'},
          //   {title:'樂高4D動感體驗', start:'2024-06-28 09:00', end:'2024-06-28 17:00'},
          //   {title:'小小建築師', start:'2024-09-02 09:00', end:'2024-09-02 17:00'},
          //   {title:'魔法轉盤', start:'2024-09-27 09:00', end:'2024-09-27 17:00'},
          //   {title:'賽車小能手', start:'2024-06-25 09:00', end:'2024-06-25 17:00'},
          //   {title:'超速旋風', start:'2024-10-01 09:00', end:'2024-10-01 17:00'},
          // ]}
          
        />
        
        </StyleWrapper>

      </div>
      {/* <div>
        {data.rows &&
            data.rows.map((i)=>{
              return (
                <div key={i.maintenance_id}>
                  <p>{i.amusement_ride_name}</p>
                  <p>{i.maintenance_begin}</p>
                  <p>{i.maintenance_end}</p>
                </div>
              )
            })
          }
      </div> */}
      
    </div>
    </Layout>
      <Head><title>維護時間</title></Head>
    </>
  )
}
