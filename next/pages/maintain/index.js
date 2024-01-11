import React from 'react'
import styles from '@/styles/maintain.module.css'
import { FaMagnifyingGlass } from "react-icons/fa6";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import styled from "@emotion/styled"
import { FaScrewdriverWrench } from "react-icons/fa6";
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from '@fullcalendar/multimonth'
import Head from 'next/head';

// import { Calendar } from '@fullcalendar/core'
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";

// const calendarEl = document.getElementById('calendar')
// const calendar = new Calendar(calendarEl, {
//   plugins: [
//     interactionPlugin,
//     dayGridPlugin
//   ],
//   initialView: 'timeGridWeek',
//   editable: true,
//   events: [
//     { title: 'Meeting', start: new Date() }
//   ]
// })

// calendar.render()

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
    font-size: 30px;
  }
  .fc-event{
    background:#ffd2e0;
    border:none
  }
  .fc-event-time .fc-event-title{
    color:#0000;
  }
  .fc-toolbar-title{
    font-size: 30px;
  }
  .fc-daygrid-event-dot{
    border-color: #820041;
  }
  .fc-v-event .fc-event-main{
    color:#820041;
  }


`

export default function Maintain() {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.flex_spacebetween}>
        <div className={styles.flex_center} style={{height:50}}>
          <span className={styles.flex_center}>
            <FaMagnifyingGlass style={{width:30,height:30.66,padding:5,borderRight:'none', position:'absolute',left:25,marginTop:5}}/>
            <input name='ride_name' className={styles.searchbar} type={'text'} placeholder={'請輸入設施名稱'}/>
          </span>
          <button className={styles.button}>返回上一頁</button>
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
            right: 'dayGridMonth,timeGridWeek,multiMonthYear'
          }}
          initialView="dayGridMonth"
          events={[
            {title:'🛠️', date:'2024-03-03'},
            {title:'設施名稱', start:'2024-03-14 09:00', end:'2024-03-14 12:00'}
          ]}
          
        />
        {/* <FullCalendar
          plugins={[
            resourceTimelinePlugin,
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            multiMonthPlugin
          ]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'resourceTimelineWeek,dayGridMonth,timeGridWeek'
          }}
          initialView='dayGridMonth'
          nowIndicator={true}
          editable={true}
          selectable={true}
          selectMirror={true}
          resources={[
            { id: 'a', title: 'Auditorium A' },
            { id: 'b', title: 'Auditorium B', eventColor: 'green' },
            { id: 'c', title: 'Auditorium C', eventColor: 'orange' },
          ]}
          initialEvents={[
            { title: 'nice event', start: new Date(), resourceId: 'a' }
          ]}
        /> */}
        </StyleWrapper>
        
      </div>
      
    </div>
      <Head><title>維護時間</title></Head>
    </>
  )
}
