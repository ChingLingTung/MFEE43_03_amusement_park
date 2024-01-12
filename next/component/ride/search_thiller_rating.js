import React from 'react'
import styles from '@/styles/ride_search.module.css'
import { FaStar } from "react-icons/fa6";
import { useState } from 'react';


export default function SearchThillerRating() {
  const [searchThillerRating,setSearchThillerRating]=useState(0)
  return (
    <>
      <span className={styles.search_flex} style={{width:500}}>
        <span className={styles.button} style={{width:85}}>刺激程度</span>
        <span className={styles.children_button} style={{width:35}} 
        onClick={()=>{
          if( searchThillerRating === 0){
            setSearchThillerRating(1)
          }else{
            setSearchThillerRating(0)
          }
            console.log(searchThillerRating);}
          }><FaStar /></span>
        <span className={styles.children_button} style={{width:50}} onClick={()=>{
          if( searchThillerRating === 0){
            setSearchThillerRating(2)
          }else{
            setSearchThillerRating(0)
          }
            console.log(searchThillerRating);}
          }><FaStar /><FaStar /></span>
        <span className={styles.children_button} style={{width:65}} 
        onClick={()=>{
          if( searchThillerRating === 0){
            setSearchThillerRating(3)
          }else{
            setSearchThillerRating(0)
          }
            console.log(searchThillerRating);}
          }><FaStar /><FaStar /><FaStar /></span>
        <span className={styles.children_button} style={{width:80}} 
        onClick={()=>{
          if( searchThillerRating === 0){
            setSearchThillerRating(4)
          }else{
            setSearchThillerRating(0)
          }
            console.log(searchThillerRating);}
          }><FaStar /><FaStar /><FaStar /><FaStar /></span>
        <span className={styles.children_button} style={{width:95}} 
        onClick={()=>{
          if( searchThillerRating === 0){
            setSearchThillerRating(5)
          }else{
            setSearchThillerRating(0)
          }
            console.log(searchThillerRating);}
          }><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span>
      </span>
    </>
  )
}
