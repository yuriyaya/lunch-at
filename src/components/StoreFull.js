import styles from "./StoreFull.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HomeWhat from "./HomeWhat";
import StoreFullMenuRatings from "./StoreFullMenuRatings";

function StoreFull() {
  const { sid } = useParams();
  const [loading, setLoading] = useState(true);
  const [storeInfo, setStoreInfo] = useState({});
  const [storeRatings, setStoreRatings] = useState([]);
  const [storeMenus, setStoreMenus] = useState([]);
  const [srateStat, setSrateStat] = useState({});
  const [menuRatings, setMenuRatings] = useState({});
  const [newMenuRatingData, setNewMenuRatingData] = useState([]);

  const getStoreInfo = async () => {
    const json = await (
      await fetch(`${process.env.REACT_APP_API_HOST}/store/${sid}`)
    ).json();
    setStoreInfo(json);
    getStoreRatingList();
  };

  const getStoreRatingList = async () => {
    const json = await (
      await fetch(
        `${process.env.REACT_APP_API_HOST}/store/${sid}/store_ratings`
      )
    ).json();
    setStoreRatings(json);
    srateStatistics(json);
    // console.log(json);
    getMenuList();
  };

  const getMenuList = async () => {
    const json = await (
      await fetch(`${process.env.REACT_APP_API_HOST}/store/${sid}/menus`)
    ).json();
    setStoreMenus(json);
    // console.log(json);
    getMenuRatingList();
  };

  const getMenuRatingList = async () => {
    const json = await (
      await fetch(
        `${process.env.REACT_APP_API_HOST}/store/${sid}/menuratinglist`
      )
    ).json();
    setMenuRatings(json);
    // console.log(json);
    mrateStatistics(json);
    setLoading(false);
  };

  const srateStatistics = (sratings) => {
    let min = 5;
    let max = 0;
    let avg = 0;
    const cnt = sratings.length;
    for (const r in sratings) {
      avg = avg + sratings[r]["rating"];
      if (sratings[r]["rating"] < min) min = sratings[r]["rating"];
      if (sratings[r]["rating"] > max) max = sratings[r]["rating"];
    }
    if (avg !== 0) avg = (avg / cnt).toFixed(2);
    setSrateStat({ avg: avg, max: max, min: min, cnt: cnt });
  };

  const mrateStatistics = (mratings) => {
    let min = 5;
    let max = 0;
    let avg = 0;
    let cnt = 0;
    let menuName = mratings[0]["name"];
    let newMenuData = [];
    let newMrateStat = {};
    let newRateList = [];
    for (const mr in mratings) {
      if (mratings[mr]["name"] !== menuName) {
        //new menu data
        newMrateStat = {
          name: menuName,
          avg: (avg / cnt).toFixed(2),
          max: max,
          min: min,
          cnt: cnt,
          ratelist: newRateList,
        };
        // console.log(newMrateStat);
        newMenuData.push(newMrateStat);

        //reset data for new menu
        min = 5;
        max = 0;
        avg = 0;
        cnt = 0;
        menuName = mratings[mr]["name"];
        newMrateStat = [];
        newRateList = [];

        //update with new menu
        avg = avg + mratings[mr]["rating"];
        if (mratings[mr]["rating"] > max) max = mratings[mr]["rating"];
        if (mratings[mr]["rating"] < min) min = mratings[mr]["rating"];
        cnt++;
        newRateList.push({
          rate: mratings[mr]["rating"],
          comment: mratings[mr]["comment"],
          date: mratings[mr]["datetime"].substring(0, 10),
        });
      } else if (Number(mr) === mratings.length - 1) {
        //last rating data
        avg = avg + mratings[mr]["rating"];
        if (mratings[mr]["rating"] > max) max = mratings[mr]["rating"];
        if (mratings[mr]["rating"] < min) min = mratings[mr]["rating"];
        cnt++;
        newRateList.push({
          rate: mratings[mr]["rating"],
          comment: mratings[mr]["comment"],
          date: mratings[mr]["datetime"].substring(0, 10),
        });
        newMrateStat = {
          name: menuName,
          avg: (avg / cnt).toFixed(2),
          max: max,
          min: min,
          cnt: cnt,
          ratelist: newRateList,
        };
        newMenuData.push(newMrateStat);
      } else {
        //same menu data
        avg = avg + mratings[mr]["rating"];
        if (mratings[mr]["rating"] > max) max = mratings[mr]["rating"];
        if (mratings[mr]["rating"] < min) min = mratings[mr]["rating"];
        cnt++;
        newRateList.push({
          rate: mratings[mr]["rating"],
          comment: mratings[mr]["comment"],
          date: mratings[mr]["datetime"].substring(0, 10),
        });
        // console.log(newRateList);
      }
    }
    setNewMenuRatingData(newMenuData);
  };

  useEffect(() => {
    getStoreInfo();
  }, []);

  return (
    <div>
      <HomeWhat />
      {loading ? (
        "..."
      ) : (
        <div className={styles.gridContainer}>
          <div className={styles.name}>
            <b>{storeInfo.name}</b>
          </div>
          <div className={styles.empty}></div>
          <div className={styles.cate}>{storeInfo.category}</div>
          <div className={styles.link}>
            <a href={storeInfo.link} rel="noopener noreferrer" target="_blank">
              <b>&#127968; 링크</b>
            </a>
          </div>
          <div className={styles.dist}>약 {storeInfo.distance}분</div>
          <div className={styles.loc}>{storeInfo.loc_quick}</div>
          <div className={styles.rate}>
            평균: {srateStat.avg ? srateStat.avg : "-"} (총 {srateStat.cnt}개의
            평가) <br />
            최고: {srateStat.cnt ? srateStat.max : "-"} / 최저:
            {srateStat.cnt ? srateStat.min : "-"}
          </div>
          <div className={styles.srate}>
            <table>
              <tbody>
                {storeRatings.map((sr, index) => (
                  <tr key={index}>
                    <td className={styles.rateCell}>{sr.rating}</td>
                    <td>{sr.comment}</td>
                    <td className={styles.dateCell}>
                      {sr.datetime.substring(0, 10)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.mrate}>
            <StoreFullMenuRatings mrData={newMenuRatingData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default StoreFull;
