import React from 'react'
import styles from '@/styles/maintain.module.css'
import { FaMagnifyingGlass } from "react-icons/fa6";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import styled from "@emotion/styled"
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
  }
  .fc-today-button .fc-button .fc-button-primary {
    background: #ffd2e0;
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
      <div style={{width:1200,height:1000,padding:200,paddingTop:30}}>
        <StyleWrapper>
          <FullCalendar
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
        />
        </StyleWrapper>
        
      </div>
    </div>
      
    </>
  )
}
