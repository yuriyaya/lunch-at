import { useState } from "react";
import styles from "./Log.module.css";

function LogRateForm({ storeEnable, id }) {
  const [rate, setRate] = useState(3);
  const [comment, setComment] = useState("");
  const [upComplete, setUpComplete] = useState(false);
  const onChangeRate = (event) => {
    setRate(event.target.value);
  };
  const onChangeComment = (event) => {
    setComment(event.target.value);
  };

  const getDateTimeString = () => {
    let today = new Date();

    let dateStr = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    let timeStr = `${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`;

    return dateStr + " " + timeStr;
  };

  const updateStoreRate = async () => {
    const json = await (
      await fetch(
        `${process.env.REACT_APP_API_HOST}/store/${id}/store_ratings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating: rate,
            comment: comment,
            datetime: getDateTimeString(),
          }),
        }
      )
    ).json();
    // console.log(json);
    setUpComplete(true);
  };

  const updateRate = () => {
    if (storeEnable) {
      updateStoreRate();
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
            disabled={upComplete ? true : false}
          />
        </div>
        <div className={styles.secondLevelInputArea}>
          <input
            value={comment}
            onChange={onChangeComment}
            type="text"
            placeholder="코멘트"
            disabled={upComplete ? true : false}
          />
        </div>
        {upComplete ? (
          <div>평점 입력 완료! 고맙습니다. :)</div>
        ) : (
          <button onClick={updateRate}>평점 입력</button>
        )}
      </div>
    </div>
  );
}

export default LogRateForm;
