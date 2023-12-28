import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/index.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className={styles.container}>
      <h2 className={styles.title}>最新消息</h2>
      <div className={styles.flex_center}>
        <div className={styles.card}>
          <div>
            <Image width={500} height={350}/>
          </div>
          <div>標題</div>
          <div className={styles.card}>
            <p>日期</p>
            <button>按鈕</button>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.mini_card}>
            <Image width={250} height={130}/>
          </div>
          <div className={styles.mini_card}>
            <Image width={250} height={130}/>
          </div>
          <div className={styles.mini_card}>
            <Image width={250} height={130}/>
          </div>
          <div className={styles.mini_card}>
            <Image width={250} height={130}/>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
