import React, { useEffect, useState } from "react";
import styles from "@/component/Icon-nav/Icon-nav.module.css";

export default function SearchCateType(props) {
  const [searchCateType, setSearchCateType] = useState(0);

  useEffect(() => {
    // 由props得到父母元件傳來的方法，傳入自己本身的內部狀態並呼叫(回送資料給父母)
    props.setDataFromCateType(searchCateType);
  }, [searchCateType]);

  return (
    <>
      <div className={styles.icon_nav}>
        <button
          onClick={() => {
            setSearchCateType(searchCateType === 3 || 4 ? 1 : 0);
            setSearchCateType(searchCateType === 1 ? 0 : 1);
          }}
        >
          <img src="\images\icon-button\iconshirt.png" classname="" alt="..." />
        </button>

        <button
          onClick={() => {
            setSearchCateType(searchCateType === 1 || 3 ? 4 : 0);
            setSearchCateType(searchCateType === 4 ? 0 : 4);
          }}
        >
          <img src="\images\icon-button\iconbag.png" classname="" alt="..." />
        </button>

        <button
          onClick={() => {
            setSearchCateType(searchCateType === 1 || 4 ? 3 : 0);
            setSearchCateType(searchCateType === 3 ? 0 : 3);
          }}
        >
          <img src="\images\icon-button\icontoy.png" classname="" alt="..." />
        </button>
      </div>
    </>
  );
}
