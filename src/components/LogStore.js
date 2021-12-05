import { useState, useEffect } from "react";
import styles from "./Log.module.css";

function LogStore() {
  const [store, setStore] = useState("");
  const [storeExist, setStoreExist] = useState(0);
  const onChange = (event) => {
    setStore(event.target.value);
  };
  const storeNextClick = (event) => {
    if (store === "") return;
    //REST API 식당 있는지 확인
    //식당 있으면 1, 식당 없으면 2
    setStoreExist(1);
  };
  function StoreExistCheck({ storeExistCheck }) {
    if (storeExistCheck === 1) {
      return "<div>평점</div>";
    } else if (storeExistCheck === 2) {
      return "<div>식당정보 입력</div>";
    } else {
      return "";
    }
  }
  return (
    <div>
      <div className={styles.storeInputArea}>
        <div>오늘 {store ? store : "식당"} 어때?</div>
        <input
          value={store}
          onChange={onChange}
          type="text"
          placeholder="식당이름 입력"
        />
        <button onClick={storeNextClick}>다음</button>
      </div>
      <StoreExistCheck storeExistCheck={storeExist} />
    </div>
  );
}

export default LogStore;
