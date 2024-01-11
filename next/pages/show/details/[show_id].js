import React from 'react'
import styles from '@/styles/show_detail.module.css'

export default function ShowDetail() {
  const seat = [
    ["","","","A1","A2","","A3","A4","A5","","A6","A7","","",""],
    ["","","B1","B2","B3","","B4","B5","B6","","B7","B8","B9","",""],
    ["","C1","C2","C3","C4","","C5","C6","C7","","C8","C9","C10","C11",""],
    ["D1","D2","D3","D4","D5","","D6","D7","D8","","D9","D10","D11","D12","D13"],
    ["E1","E2","E3","E4","E5","","E6","E7","E8","","E9","E10","E11","E12","E13"],
    ["F1","F2","F3","F4","F5","","F6","F7","F8","","F9","F10","F11","F12","F13"],
    ["G1","G2","G3","G4","G5","","G6","G7","G8","","G9","G10","G11","G12","G13"],
    ["H1","H2","H3","H4","H5","","H6","H7","H8","","H9","H10","H11","H12","H13"],
    ["I1","I2","I3","I4","I5","I6","I7","I8","I9","I10","I11","I12","I13","I14","I15"],
  ];
  return (
    <>
    <div className={styles.container}>
      <div style={{width:1200}}>
        <img className={styles.img} width='100%' height={300} />
        <h2 className={styles.title}>表演節目名稱</h2>
        <h3 style={{marginBottom:20}}>表演資訊</h3>
        <div style={{lineHeight:2}}>
          <p>演出日期：113/XX/XX</p>
          <p>演出時間：XX：XX-XX：XX：XX-XX：XX</p>
          <p>演出地點：XXXXXXX</p>
        </div>
        <p style={{marginTop:7}}>表演相關敘述表演相關敘述表演相關敘述表演相關敘述表演相關敘述表演相關敘述表演相關敘述表演相關敘述表演相關敘述表演相關敘述表演相關敘述表演相關敘述表演相關敘述表演相關敘述表演相關敘述表演相關敘述表演相關敘述表演相關敘述</p>
        <button className={styles.button}>預約</button>
      
      </div>
      <div>
      {seat.map((row, i) => (
        <div key={i}>
          {row.map((cell, j) => (
            <span className={styles.seat} key={j} style={cell? {} : {opacity:0}}>{cell? cell : "0"}</span>
          ))}
        </div>
      ))}
      </div>
      <button style={{width:1200}} className={styles.button}>預約</button>
    </div>
    </>
  )
}
