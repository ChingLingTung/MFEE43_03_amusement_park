import React, { useState, useEffect } from 'react';
import styles from '@/styles/register.module.css';
import Head from 'next/head';
import { USER_ADD } from '@/component/ride-const';
import { z } from "zod";

export default function Register() {
  const [registerForm, setRegisterForm]=useState(
    {
      user_name: "",
      user_email: "",
      hash: "",
      avatar: "/images/user/profile.png",
      birthday: "",
      phone: "",
      address: "",
      user_nickname:"",
      address:""
    }
  );
  const onSubmit = async (e) => {
    e.preventDefault();
    // TODO: 檢查各個欄位的資料
    if(registerForm.user_name.trim().length == 0){
      
    }
    // coerce 寬鬆的檢查方式
    const emailSchema = z.coerce
      .string()
      .email({ message: "錯誤的 email 格式" });
    console.log("emailSchema:", emailSchema.safeParse(registerForm.user_email));

    const r = await fetch(USER_ADD, {
      method: "POST",
      body: JSON.stringify(registerForm),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await r.json();
    if (responseData.success) {
      setDisplayInfo("succ");
      // alert("新增成功");
    } else {
      setDisplayInfo("fail");
      // alert("新增發生錯誤!!!");
    }
  };

  console.log("re-render---", new Date());
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>會員註冊</h2>
        <div>
          <p>前端取得資料:</p>
          <p>會員姓名：{registerForm.user_name}</p>
          <p>帳號：{registerForm.user_email}</p>
          <p>密碼：{registerForm.user_password}</p>
          <p>手機：{registerForm.phone}</p>
          <p>小名：{registerForm.user_nickname}</p>
          <p>頭貼：{registerForm.avatar}</p>
          <p>生日:{registerForm.birthday}</p>
          <p>地址:{registerForm.address}</p>
        </div>
        <div className={styles.formborder}>
          <form name="form1" onSubmit={onSubmit}>
            <div className={styles.flex}>
              <div className={styles.column}>
                  <div className={styles.padding30}>
                    <img className={styles.img} src={registerForm.avatar}/>
                  </div>
                  <label htmlFor="avatar">
                    <input type="hidden"
                      id="avatar"
                      name="avatar"
                      value={registerForm.avatar}
                      onChange={changeHandler}/>
                      {/* <input type="file" id="avatar"
                      name="avatar"
                      onChange={changeHandler} /> */}
                  </label>
                  <div className={styles.flex}>
                    <button type='button' className={styles.upload_button}>
                      <img className={styles.icon} src='/images/Upload.png'/>
                上傳大頭照
                    </button>
                    
                  </div>
                <p className={styles.flex}>
                  <img className={styles.icon} src='/images/Edit.png'/>
                  <label htmlFor="user_nickname">
                    <input className={styles.nickname} placeholder='小名' type="text"
                      id="user_nickname"
                      name="user_nickname"
                      value={registerForm.user_nickname}
                      onChange={changeHandler}/>
                  </label>
                </p>
              </div>
              <div>
                <label htmlFor="user_name">
                <span className={styles.red}>*</span>會員姓名：<br/>
                  <input type='text' className={styles.input} id="user_name"
                      name="user_name"
                      value={registerForm.user_name}
                      onChange={changeHandler} placeholder='請輸入真實姓名'/>
                </label>
                <br/>
                <label htmlFor="user_email"><span className={styles.red}>*</span>帳號：<br/>
                  <input type='email' className={styles.input} id="user_email"
                      name="user_email"
                      value={registerForm.user_email}
                      onChange={changeHandler} placeholder='請輸入email'/>
                </label>
                <br/>
                <label htmlFor="user_password"><span className={styles.red}>*</span>密碼：<br/>
                  <input type='password' className={styles.input} id="user_password"
                      name="user_password"
                      value={registerForm.user_password}
                      onChange={changeHandler} placeholder='請輸入密碼'/>
                </label>
                <br/>
                {/* <label htmlFor="password"><span className={styles.red}>*</span>再次確認密碼：<br/>
                  <input type='password' className={styles.input} placeholder='請輸入一樣的密碼'/>
                </label>
                <br/> */}
                <label htmlFor="user_phone">手機號碼：<br/>
                  <input type='text' className={styles.input} id="phone"
                      name="phone"
                      value={registerForm.phone}
                      onChange={changeHandler} placeholder='請輸入手機號碼'/>
                </label>
                <br/>
                <label htmlFor="birthday">生日：<br/>
                  <input type='date' className={styles.input} id="birthday"
                      name="birthday"
                      value={registerForm.birthday}
                      onChange={changeHandler} placeholder='請輸入出生年月日YYYY/MM/DD'/>
                </label>
                <br/>
                <label htmlFor="address">地址：<br/>
                  <input type='text' className={styles.input} id="address"
                      name="address"
                      value={registerForm.address}
                      onChange={changeHandler} placeholder='請輸入地址'/>
                </label>
                <br/>
              </div>
            </div>
            
            <div className={styles.flex}>
              {displayInfo ? (
                    displayInfo === "succ" ? (
                      <div>
                        資料新增成功
                      </div>
                    ) : (
                      <div style={{color:'red'}}>
                        新增發生錯誤!!!
                      </div>
                    )
                  ) : null}
              <button type='submit' className={styles.button}>註冊</button>
            </div>
          </form>
        </div>
      </div>
      <Head><title>註冊</title></Head>
    </>
  )

}