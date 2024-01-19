import Head from "next/head";
import Navbar from "@/component/navbar.js"
export function Layout({ children }) {
  return (
    <>
      <Head>
        <title>遊樂園</title>
      </Head>
      <div className="container">
        <Navbar />
        {children}
      </div>

    </>
  );
}
