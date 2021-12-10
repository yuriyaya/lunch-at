import { useState } from "react";
import styles from "./Log.module.css";

function LogRateForm({ storeEnable, id }) {
  const [rate, setRate] = useState(3);
  const [comment, setComment] = useState("");
  const onChangeRate = (event) => {
    setRate(event.target.value);
  };
  const onChangeComment = (event) => {
    setComment(event.target.value);
  };
  const updateRate = () => {
    if (storeEnable) {
      //update store rate
      if (id === 0) {
        //add new store, then update rate
      }
    } else {
      //update menu rate
    }
  };
  return (
    <div>
      <div className={styles.firstLevelInputArea}>
        <div>
          {id} {storeEnable ? "식당" : "메뉴"} 평점 입력
        </div>
        <div className={styles.secondLevelInputArea}>
          <input
            value={rate}
            onChange={onChangeRate}
            type="text"
            placeholder="평점 0~5점"
          />
        </div>
        <div className={styles.secondLevelInputArea}>
          <input
            value={comment}
            onChange={onChangeComment}
            type="text"
            placeholder="코멘트"
          />
        </div>
        <button onClick={updateRate}>평점 입력</button>
      </div>
    </div>
  );
}

export default LogRateForm;
