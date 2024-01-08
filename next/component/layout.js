import Navbar from "@/component/navbar";
import Head from "next/head";

export function Layout({ children }) {
  return (
    <>
      <Head>
        <title>遊樂園網站</title>
      </Head>
      <div className="container">
        <Navbar />
      </div>
      <div className="container">{children}</div>
    </>
  );
}