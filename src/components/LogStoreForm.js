import { useState, useEffect } from "react";
import styles from "./Log.module.css";

function LogStoreForm({ id, name, storeData }) {
  const [category, setCategory] = useState("");
  const [locquick, setLocquick] = useState("");
  const [webpage, setWebpage] = useState("");
  const [distance, setDistance] = useState(0);
  const [editBtnClick, setEditBtnClick] = useState(false);
  const [editComplete, setEditComplete] = useState(false);
  const [addComplete, setAddComplete] = useState(false);

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
  const loadStoreData = () => {
    if (storeData.length === 1) {
      setCategory(storeData[0]["category"]);
      setLocquick(storeData[0]["loc_quick"]);
      setWebpage(storeData[0]["link"]);
      setDistance(storeData[0]["distance"]);
      setEditBtnClick(true);
      setEditComplete(false);
    }
  };

  const updateStoreData = async () => {
    const json = await (
      await fetch(`${process.env.REACT_APP_API_HOST}/store/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: storeData[0]["name"],
          category: category,
          loc_quick: locquick,
          link: webpage,
          distance: distance,
        }),
      })
    ).json();
    // console.log(json);
    setEditComplete(true);
  };

  const addStoreData = async () => {
    const json = await (
      await fetch(`${process.env.REACT_APP_API_HOST}/stores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          category: category,
          loc_quick: locquick,
          link: webpage,
          distance: distance,
        }),
      })
    ).json();
    // console.log(json);
    setAddComplete(true);
  };

  return (
    <div>
      <div className={styles.storeInfoInputArea}>
        <div>
          {id ? "식당정보 수정(옵션)" : "새로운 식당입니다!"}
          <br />
          {id ? "" : "기본 정보를 입력해 주세요(옵션)."}
        </div>
        <table style={{ border: 0 }}>
          <tbody>
            <tr>
              <td>음식 종류</td>
              <td>
                <div className={styles.secondLevelInputArea}>
                  <input
                    value={category}
                    onChange={onChangeCategory}
                    type="text"
                    placeholder="e.g. 한식, 양식, ..."
                    disabled={!editBtnClick ? true : false}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>대략 위치</td>
              <td>
                <div className={styles.secondLevelInputArea}>
                  <input
                    value={locquick}
                    onChange={onChangeLocquick}
                    type="text"
                    placeholder="e.g. xx 건물 x층 ..."
                    disabled={!editBtnClick ? true : false}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>홈페이지</td>
              <td>
                <div className={styles.secondLevelInputArea}>
                  <input
                    value={webpage}
                    onChange={onChangeWebpage}
                    type="text"
                    placeholder="네이버, 인스타 링크 등..."
                    disabled={!editBtnClick ? true : false}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>걸리는 시간(분)</td>
              <td>
                <div className={styles.secondLevelInputArea}>
                  <input
                    value={distance}
                    onChange={onChangeDistance}
                    type="text"
                    placeholder="가는데 걸리는 시간(분단위)"
                    disabled={!editBtnClick ? true : false}
                  />
                  분
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                {id ? (
                  <div>
                    <button
                      className={styles.buttonGen}
                      onClick={loadStoreData}
                    >
                      불러오기
                    </button>
                    <button
                      className={styles.buttonGen}
                      onClick={updateStoreData}
                      disabled={!editBtnClick ? true : false}
                    >
                      수정
                    </button>
                  </div>
                ) : (
                  <button className={styles.buttonGen} onClick={addStoreData}>
                    식당정보 입력
                  </button>
                )}
                {editComplete ? <div>식당 정보 수정 완료</div> : ""}
                {addComplete ? <div>식당 정보 입력 완료</div> : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LogStoreForm;
