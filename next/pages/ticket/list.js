import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { TICKET_LIST } from "@/components/ticketConst";


export default function Ticket() {
  const [data, setData] = useState({});
  const router = useRouter();
  const getListData = async () => {
    let page = +router.query.page || 1;
    if (page < 1) page = 1;
    try {
      const r = await fetch(TICKET_LIST);
      const d = await r.json();
      // console.log(value)
      setData(d);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    getListData();
  },[]);

  return (
    <>
      {data.rows &&
        data.rows.map((i) => {
          return (
            <div key={i.sid}>
              {/* <Link href={`/show/details/${i.amusement_ride_id}`}> */}
              <div>
                <div style={{ padding: 5 }}>
                  <div>{i.tc1_name}</div>
                  <div>{i.tc2_name}</div>
                  <div>{i.tc_amount}</div>
                  <div>{i.description}</div>
                </div>
              </div>
              {/* </Link> */}
            </div>
          );
        })}
    </>
  );
}
