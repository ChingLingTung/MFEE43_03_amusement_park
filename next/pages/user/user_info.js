import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/auth-context";
import { useRouter } from "next/router";
import { USER } from "@/component/ride-const";
import { Layout } from "@/component/layout";

export default function Profile() {
  const [data, setData] = useState({}); // 暫存取得的資料

  const { parkAuth } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!auth.email) {
      router.push("/");
    } else {
      fetch(USER, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
        .then((r) => r.json())
        .then((result) => {
          if (result.success) {
            setData(result.data);
          }
        })
        .catch((ex) => console.log(ex));
    }
  }, []);

  return (
    <>
      <Layout>
        <pre>{ JSON.stringify(data, null, 4) }</pre>
      </Layout>
      <Head>
        <title>會員資料</title>
      </Head>
    </>
  );
}
