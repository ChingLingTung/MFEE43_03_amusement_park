import Navbar from "@/component/ride-navbar";
import Head from "next/head";

export function Layout({ children }) {
  return (
    <>
      <Head>
        <title>遊樂園網站</title>
      </Head>
      <Navbar />
      <div className="container">
        {children}
      </div>
      {/* <div className="container"></div> */}
    </>
  );
}
