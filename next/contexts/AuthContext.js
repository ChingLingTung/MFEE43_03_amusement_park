import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export default AuthContext;

// 登入狀態: 可以登入, 可以登出, 狀態資料(會員id, email, nickname, token)
export const initAuth = {
  id: 0,
  email: "",
  nickname: "",
  token: "",
};

export const AuthContextProvider = ({ children }) => {
  
  const [auth, setAuth] = useState(initAuth);
  useEffect(() => {
    const str = localStorage.getItem("auth");
    if (str) {
      try {
        const data = JSON.parse(str);
        if (data.id && data.email) {
          const { id, email, nickname, token } = data;
          setAuth({ id, email, nickname, token });
        }
      } catch (ex) {}
    }
  }, []);

  // 登出
  const logout = () => {
    // 登出時, 清除 localStorage 的記錄
    localStorage.removeItem("auth");
    setAuth(initAuth);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};