import { useState } from "react";
import styles from "./Log.module.css";

function LogRateForm({ storeEnable, id, mName, storeList }) {
  const [rate, setRate] = useState(3);
  const [comment, setComment] = useState("");
  const [upComplete, setUpComplete] = useState(false);
  const [store, setStore] = useState(""); //store name
  const [userWarn, setUserWarn] = useState(""); //store name
  const [storeId, setStoreId] = useState(0); //storeId, selected inside of Menu rate form, value is 0 when menu already exist

  const onChangeStore = (event) => {
    setStore(event.target.value);
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

  const getStoreId = (storeName) => {
    let sid = 0;
    if (store !== "") {
      for (const i in storeList) {
        if (storeList[i]["name"] === storeName) {
          sid = storeList[i]["id"];
        }
      }
    }
    return sid;
  };

  const addStoreData = async () => {
    const json = await (
      await fetch(`${process.env.REACT_APP_API_HOST}/stores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: store,
          category: "",
          loc_quick: "",
          link: "",
          distance: 0,
        }),
      })
    ).json();
    // console.log(json);
  };

  const addMenuData = async (sid) => {
    const json = await (
      await fetch(`${process.env.REACT_APP_API_HOST}/store/${sid}/menus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: mName,
        }),
      })
    ).json();
    console.log(json);
    updateMenuRate(json.id);
  };

  const updateMenuRate = async (idToUp) => {
    console.log("idToUp", idToUp);
    const json = await (
      await fetch(
        `${process.env.REACT_APP_API_HOST}/menu/${idToUp}/menu_ratings`,
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
      //store already exist, add store rate
      updateStoreRate();
    } else {
      if (id < 1) {
        // new menu!!
        // (1)check store id
        // (2) -> if store is not exist, add store id
        // (3) -> add menu(already know menu is new, becuase id is 0)
        // (4) -> update menu rating
        if (store !== "") {
          let sid = getStoreId(store); //(1)
          if (sid === 0) addStoreData(); //(2)
          addMenuData(sid); //(3)
          //updateMenuRate(); //(4)
        } else {
          setUserWarn("! 식당 이름을 입력해 주세요");
        }
      } else {
        //update menu rate
        updateMenuRate(id);
      }
    }
  };

  return (
    <div>
      <div className={styles.firstLevelInputArea}>
        <div>{storeEnable ? "식당" : "메뉴"} 평점 입력</div>
        <div className={styles.secondLevelInputArea}>
          {!storeEnable && id === 0 ? (
            <div>
              <input
                value={store}
                onChange={onChangeStore}
                type="search"
                placeholder="식당이름 입력(필수)"
                list="storelist"
                required={true}
              />
              <datalist id="storelist">
                {storeList.map((i) => (
                  <option key={i["id"]} value={i["name"]}></option>
                ))}
              </datalist>
            </div>
          ) : null}
        </div>
        <div className={styles.secondLevelInputArea}>
          <div className="starRating">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= rate ? styles.on : styles.off}
                  onClick={() => {
                    setRate(index);
                  }}
                >
                  <span className="star">&#9733;</span>
                </button>
              );
            })}
          </div>
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
          <button className={styles.buttonGen} onClick={updateRate}>
            평점 입력
          </button>
        )}
        {userWarn !== 0 ? userWarn : ""}
      </div>
    </div>
  );
}

export default LogRateForm;
