import { useState, useEffect } from "react";
import styles from "./Log.module.css";

function LogStoreForm({ storeExist }) {
  const [category, setCategory] = useState("");
  const [locquick, setLocquick] = useState("");
  const [webpage, setWebpage] = useState("");
  const [distance, setDistance] = useState(0);
  const onChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const onChangeLocquick = (event) => {
    setLocquick(event.target.value);
  };
  const onChangeWebpage = (event) => {
    setWebpage(event.target.value);
  };
  const onChangeDistance = (event) => {
    setDistance(event.target.value);
  };
  return (
    <div>
      <div className={styles.storeInputArea}>
        <div>
          새로운 식당입니다!
          <br />
          기본 정보를 입력해 주세요.
        </div>
        <div className={styles.storeDetailInputArea}>
          <input
            value={category}
            onChange={onChangeCategory}
            type="text"
            placeholder="음식 종류(e.g. 한식, 양식, ...)"
          />
        </div>
        <div className={styles.storeDetailInputArea}>
          <input
            value={locquick}
            onChange={onChangeLocquick}
            type="text"
            placeholder="대략 위치(e.g. xx 건물 x층 ...)"
          />
        </div>
        <div className={styles.storeDetailInputArea}>
          <input
            value={webpage}
            onChange={onChangeWebpage}
            type="text"
            placeholder="홈페이지 정보(네이버 링크, 인스타 링크 등...)"
          />
        </div>
        <div className={styles.storeDetailInputArea}>
          <input
            value={distance}
            onChange={onChangeDistance}
            type="text"
            placeholder="가는데 걸리는 시간(분단위)"
          />
          분
        </div>
        <button onClick={null}>식당정보 입력</button>
      </div>
    </div>
  );
}

export default LogStoreForm;