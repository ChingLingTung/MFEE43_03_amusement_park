import Link from "next/link";
import ThemeContext, { themes } from "@/context/theme-context";
import AuthContext from "@/context/auth-context";
import { useContext } from "react";
import styles from '@/styles/navbar.module.css'
import { FaUserAlt } from "react-icons/fa";
import { LuRollerCoaster } from "react-icons/lu";
import { FaTicketAlt } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import Swal from 'sweetalert2' 
import withReactContent from 'sweetalert2-react-content' 
import { useRouter } from 'next/navigation';


export default function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { parkAuth, logout } = useContext(AuthContext);
  const Alert = withReactContent(Swal) 
  const router = useRouter();
  return (
    <>
      <nav className={styles.flex_spacebetween}>
        <span className={styles.option}>
          <Link href="/">
            <img className={styles.logo} src='/images/logo.png'/>
          </Link>
        </span>
        <div className={styles.flex_center}>
          <span className={styles.option} onClick={()=>{
                if(!parkAuth.email){
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
              }else{
                router.push('/user');
              }
          }}>
            <Link href="#">
            <FaUserAlt color="white"/>會員中心
            </Link>
          </span>
          <span className={styles.option}>
            <Link href="/ticket">
            <FaTicketAlt color="white"/>購票資訊
            </Link>
          </span>
          <span className={styles.option}>
            <Link href="/ride">
            <LuRollerCoaster color="white"/>設施介紹
            </Link>
          </span>
          <span className={styles.option}>
            <Link  href="/product">
            <FaBagShopping color="white"/>商品專區
            </Link>
          </span>
        </div>
        
          {parkAuth.email ? (
            <>
            <div className={styles.flex_center}>
              <span className={styles.option}>
                <p>{parkAuth.nickname}</p>
              </span>
              {/* <span className={styles.option}>
                <Link  href="/profile">profile</Link>
              </span> */}
              <span className={styles.option}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                    Alert.fire({ 
                    didOpen: () => { 
                      Alert.fire({
                        titleText:'成功登出',
                        text:'前往首頁',
                    }),
                        Alert.fire({
                          titleText:'成功登出',
                          text:'前往首頁',
                          willClose:()=>{
                            router.push('/');
                          }
                        })
                    }
                  })
                  }}
                >
                  登出
                </a>
              </span>
            </div>
            </>
          ) : (
            <>
            <div className={styles.flex_center}>
              <span className={styles.option}>
                <Link href="/login">
                  登入
                </Link>
              </span>
              <span className={styles.option}>
                <Link href="/register">
                  註冊
                </Link>
              </span>
            </div>
            </>
          )}
      </nav>
    </>
  );      
}
