import Head from "next/head";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

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
