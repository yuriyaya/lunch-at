import { useState } from "react";
import styles from "./Log.module.css";

function LogRateForm({ storeEnable, id, name, storeList }) {
  const [rate, setRate] = useState(3);
  const [comment, setComment] = useState("");
  const [upComplete, setUpComplete] = useState(false);
  const [store, setStore] = useState(""); //store name, only set for menu rating case
  const [userWarn, setUserWarn] = useState(""); //warning, when store name is not type
  const [addStoreId, setAddStoreId] = useState(0);

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

  const updateStoreRate = async (id) => {
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
    if (storeName !== "") {
      // console.log("storeName", storeName);
      // console.log(storeList);
      for (const i in storeList) {
        // console.log("getStoreId", storeList[i]["name"]);
        if (storeList[i]["name"] === storeName) {
          sid = storeList[i]["id"];
        }
      }
    }
    return sid;
  };

  const addStoreData = async (naUpStoreRate) => {
    let storeName;
    if (store === "") {
      storeName = name; //store rating, props from parent
    } else {
      storeName = store; //menu rating -> store name
    }
    let addStoreBody = JSON.stringify({
      name: storeName,
      category: "",
      loc_quick: "",
      link: "",
      distance: 0,
    });
    // console.log("addStoreData body", addStoreBody);
    const json = await (
      await fetch(`${process.env.REACT_APP_API_HOST}/stores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: addStoreBody,
      })
    ).json();
    // console.log(json);
    if (naUpStoreRate) updateStoreRate(json.id);
    setAddStoreId(json.id);
    if (!naUpStoreRate) addMenuData(json.id);
  };

  const addMenuData = async (sid) => {
    const json = await (
      await fetch(`${process.env.REACT_APP_API_HOST}/store/${sid}/menus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
      })
    ).json();
    // console.log(json);
    updateMenuRate(json.id);
  };

  const updateMenuRate = async (idToUp) => {
    // console.log("idToUp", idToUp);
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
      if (id < 1) {
        addStoreData(true); //add store & store rating(true)
      } else {
        //store already exist, add store rate
        // console.log("store rate name:", name);
        let sid = getStoreId(name); //
        // console.log("store rate sid: ", sid);
        updateStoreRate(sid);
      }
    } else {
      if (id < 1) {
        // menu id =0, new menu!!
        // (1)check store id
        // (2) -> if store is not exist, add store id
        // (3) -> add menu(already know menu is new, becuase id is 0)
        // (4) -> update menu rating
        if (store !== "") {
          let sid = getStoreId(store); //(1)
          // console.log("menu rate sid: ", sid);
          if (sid === 0) addStoreData(false); //(2), add store (false: do not update store rating)
          // addMenuData(); //(3)
          //updateMenuRate(); //(4) done after addMenuData
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
          <div>평점 입력 완료! :)</div>
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
