import Head from "next/head";
import Navbar from "@/component/navbar";
import Footer from "@/component/Footer/Footer";

export function Layout({ children }) {
  return (
    <>
      <Head>
        <title>豬豬的網站</title>
      </Head>
      <Navbar />
      <div className="container">{children}</div>
      <Footer />
    </>
  );
}
