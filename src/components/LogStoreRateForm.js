import { useState, useEffect } from "react";
import styles from "./Log.module.css";

function LogStoreRateForm({ storeExist }) {
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");
  const onChangeRate = (event) => {
    setRate(event.target.value);
  };
  const onChangeComment = (event) => {
    setComment(event.target.value);
  };
  return (
    <div>
      <div className={styles.storeInputArea}>
        <div>평점 입력</div>
        <div className={styles.storeDetailInputArea}>
          <input
            value={rate}
            onChange={onChangeRate}
            type="text"
            placeholder="평점 0~5점"
          />
        </div>
        <div className={styles.storeDetailInputArea}>
          <input
            value={comment}
            onChange={setComment}
            type="text"
            placeholder="코멘트"
          />
        </div>
        <button onClick={null}>식당 평점 입력</button>
      </div>
    </div>
  );
}

export default LogStoreRateForm;
