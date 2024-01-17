import React from 'react'
import Link from 'next/link';
import styles from '@/styles/user.module.css'
import Head from 'next/head'
import AuthContext from "@/context/auth-context";
import { useContext } from "react";
import { USER_GET_ONE } from '@/component/ride-const';
import { useRouter } from "next/router";
import { useState,useEffect } from 'react';
import { Layout } from '@/component/layout';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content' 


export default function User() {
  const { parkAuth, logout } = useContext(AuthContext);
  const [data,setData] = useState({
      user_name: '',
      user_email: '',
      user_password:'',
      rePassword:'',
      birthday: '',
      phone: '',
      address: '',
      user_nickname:'',
  })
  const router = useRouter();
  const Alert = withReactContent(Swal) ;
  const [displayInfo, setDisplayInfo] = useState(""); // "", "succ", "fail"
  const changeHandler = (e) => {
    const { name, id, value } = e.target;
    console.log({ name, id, value });
    setDisplayInfo("");
    setData({ ...data, [id]: value });
  };
  const [nameError,setNameError]=useState('')
  const [emailError,setEmailError]=useState('')
  const [passwordError,setPasswordError]=useState('')
  const [password2Error,setPassword2Error]=useState('')
  const [phoneError,setPhoneError]=useState('')
  const checkName = ()=>{
    if(data.user_name===""){
      setNameError('姓名為必填')
    }
    else{
      setNameError('')
    }
  };

  const checkEmail = () =>{
    
    const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if(data.user_email !== "" && data.user_email.search(emailRule) === -1){
      setEmailError('email必須符合格式');
    }
    else if(data.user_email==""){
      setEmailError('email為必填');
    }
    else{
      setEmailError('');
    }
  };

  const checkPhone = () =>{
    const phoneRule = /^09\d{8}$/;
    if(data.phone!==""&& data.phone.search(phoneRule)===-1){
      setPhoneError('手機號碼不符合格式');
    }
    if(data.phone===""||data.phone!==""&& data.phone.search(phoneRule)!==-1){
      setPhoneError('');
    }
  };

  const checkPassword = () =>{
    const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/;
    if(data.user_password===""){
      setPasswordError('密碼為必填')
    }
    else if(data.user_password!==""&& data.user_password.search(passwordRule)===-1){
      setPasswordError('密碼不符合格式，長度6以上且至少包含一個數字一個小寫英文字母，一個大寫英文字母');
    }
    else{
      setPasswordError('')
    }
  };

  const checkPassword2 = () =>{
    if(data.rePassword===data.user_password){
      setPassword2Error('')
    }
    else{
      setPassword2Error('輸入的密碼與第一次不同');
    }
  }

  useEffect(()=>{
    checkName
  },[data.user_name])

  useEffect(()=>{
    checkEmail
  },[data.user_email])

  useEffect(()=>{
    checkPhone
  },[data.phone])

  useEffect(()=>{
    checkPassword
  },[data.user_password])

  useEffect(()=>{
    checkPassword2
  },[data.rePassword,data.user_password])
  useEffect(()=>{
    if(parkAuth.email){
      const user_id = +router.query.user_id;
      if(!user_id){
        router.push('/')
      }else{
        fetch(USER_GET_ONE + '/' + user_id,)
        .then((r) => r.json())
        .then((data) => {
        if (!data.success) {
          router.push('/')
        }else{
          setData({...data.row});
        }
      })
      .catch((ex) => console.log(ex));
    }
  }
},[router.query.user_id])

  useEffect(()=>{
    if(!parkAuth.email && !data){
      Alert.fire({ 
  didOpen: () => { 
      Alert.fire({
        titleText:'尚未登入',
        text:'前往登入',
      }),
      Alert.fire({
        titleText:'尚未登入',
        text:'前往登入',
        willClose:()=>{
          router.push('/login');
        }
      })
    }
})
}
  },[])

  const onSubmit = async (e) => {
    e.preventDefault();
    // TODO: 檢查各個欄位的資料
    let ispass = true
    if(data.user_name.trim().length == 0){
        setNameError('姓名為必填');
        ispass = false;
      }
    const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if(data.user_email===""){
      setEmailError('email為必填');
      ispass = false;
    }
    else if(data.user_email!==""&&data.user_email.search(emailRule)===-1){
      setEmailError('email不符合格式');
      ispass = false;
    }
    else{
      setEmailError('');
    }
    const phoneRule = /^09\d{8}$/;
    if(data.phone!==""&& data.phone.search(phoneRule)===-1){
      setPhoneError('手機號碼不符合格式');
      ispass = false;
    }
    const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/;
    if(data.user_password===""){
      setPasswordError('密碼為必填');
      ispass = false;
    }
    if(data.user_password!==""&& data.user_password.search(passwordRule)===-1){
      setPasswordError('密碼不符合格式');
      ispass = false;
    }
    if(data.rePassword===data.user_password){
      setPassword2Error('');
    }
    else{
      setPassword2Error('輸入的密碼與第一次不同');
      ispass = false;
    }
    if(!ispass){
      setDisplayInfo("fail");
      Alert.fire({ 
        didOpen: () => { 
            Alert.fire({
              titleText:'編輯失敗',
              text:'請檢查輸入的資料是否符合格式',
            })
          }
    })
    }
    if(ispass){
      const r = await fetch(USER_ADD, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await r.json();
    if (responseData.success) {
      setDisplayInfo("succ");
      Alert.fire({ 
        didOpen: () => { 
            Alert.fire({
              titleText:'編輯成功',
              text:'前往確認資料',
            }),
            Alert.fire({
              titleText:'編輯成功',
              text:'前往確認資料',
              willClose:()=>{
                router.push('/user');
              }
            })
          }
    })
    } else {
      setDisplayInfo("fail");
      Alert.fire({ 
        didOpen: () => { 
            Alert.fire({
              titleText:'註冊失敗',
              text:responseData.error,
            })
          }
    })
    }
    }


  };
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
            <button className={styles.button}>會員訂單</button>
              <button className={styles.button}>優惠券</button>
              <button className={styles.button}>我的收藏</button>
              <button className={styles.selected_button}>修改資料</button>
              <button className={styles.button}>表演預約</button>
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
            <h2 className={styles.title}>編輯會員資料</h2>
            {/* <table className={styles.table}> 
            <tbody>
              <tr> 
                <th className={styles.th}>姓名</th> 
                <td className={styles.td}>{data.user_name}</td>
                <th className={styles.th}>小名</th>
                <td className={styles.td}>{data.user_nickname}</td>
              </tr>
              <tr>
                <th className={styles.th}>email</th>
                <td colSpan="3" className={styles.td}>{data.user_email}</td>
              </tr>
              <tr>
                <th className={styles.th}>手機號碼</th>
                <td className={styles.td}>{data.phone}</td>
                <th className={styles.th}>生日</th>
                <td className={styles.td}>{data.birthday}</td>
              </tr> 
              <tr>
                <th className={styles.th}>地址</th>
                <td colSpan="3" className={styles.td}>{data.address}</td>
              </tr>
            </tbody>
            </table> */}
            {/* <div>
          <p>前端取得資料:</p>
          <p>會員姓名：{data.user_name}</p>
          <p>帳號：{data.user_email}</p>
          <p>密碼：{data.user_password}</p>
          <p>再次驗證密碼：{data.rePassword}</p>
          <p>手機：{data.phone}</p>
          <p>小名：{data.user_nickname}</p>
          <p>頭貼：{data.avatar}</p>
          <p>生日:{data.birthday}</p>
          <p>地址:{data.address}</p>
          </div> */}
          <form name="form1" onSubmit={onSubmit}>
            <div className={styles.flex}>
              {/* <div className={styles.column}>
                
              </div> */}
              <div style={{width:700}}>
                <label htmlFor="user_name" >
                <div><span className={styles.red}>*</span>會員姓名：</div>
                  <input type='text' className={styles.input} id="user_name"
                      name="user_name"
                      value={data.user_name}
                      onChange={changeHandler} onKeyUp={checkName}  placeholder='請輸入真實姓名'/>
                  <p style={{color:"red",fontSize:16}}>{nameError}</p>
                </label>
                <label htmlFor="user_email" className={styles.label_flex}><span className={styles.red}>*</span>帳號：<br/>
                  <input type='email' className={styles.input} id="user_email"
                      name="user_email"
                      value={data.user_email}
                      onChange={changeHandler} onKeyUp={checkEmail} placeholder='請輸入email'/>
                </label>
                <p style={{color:"red",fontSize:16}}>{emailError}</p>
                <label htmlFor="user_password" className={styles.label_flex}><span className={styles.red}>*</span>密碼：<br/>
                  <input type='password' className={styles.input} id="user_password"
                      name="user_password"
                      value={data.user_password}
                      onChange={changeHandler} onKeyUp={checkPassword} placeholder='請輸入密碼'/>
                </label>
                <p style={{color:"red",fontSize:16,width:550}}>{passwordError}</p>
                <label htmlFor="rePassword" className={styles.label_flex}><span className={styles.red}>*</span>再次確認密碼：<br/>
                  <input type='password' id="rePassword"
                      name="rePassword" className={styles.input} value={data.rePassword} onChange={changeHandler} onKeyUp={checkPassword2} placeholder='請輸入一樣的密碼'/>
                </label>
                <p style={{color:"red",fontSize:16}}>{password2Error}</p>
                <label htmlFor="user_phone" className={styles.label_flex}>手機號碼：<br/>
                  <input type='text' className={styles.input} id="phone"
                      name="phone"
                      value={data.phone}
                      onChange={changeHandler} onKeyUp={checkPhone} placeholder='請輸入手機號碼'/>
                </label>
                <p style={{color:"red",fontSize:16}}>{phoneError}</p>
                <label htmlFor="birthday" className={styles.label_flex}>生日：<br/>
                  <input type='date' className={styles.input} id="birthday"
                      name="birthday"
                      value={data.birthday}
                      onChange={changeHandler}/>
                </label>
                <br/>
                <label htmlFor="address" className={styles.label_flex}>地址：<br/>
                  <input type='text' className={styles.input} id="address"
                      name="address"
                      value={data.address}
                      onChange={changeHandler} placeholder='請輸入地址'/>
                </label>
                <br/>
                  <label htmlFor="user_nickname" className={styles.label_flex}>小名：<br/>
                    <input className={styles.input} placeholder='小名' type="text"
                      id="user_nickname"
                      name="user_nickname"
                      value={data.user_nickname}
                      onChange={changeHandler}/>
                  </label>
              </div>
            </div>
            
            <div className={styles.flex}>
              
              <button type='submit' className={styles.form_button}>確定</button>
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
            </div>
          </form>
          </div>
        </div>
      </Layout>
      <Head><title>會員中心</title></Head>
    </>
  )
}
