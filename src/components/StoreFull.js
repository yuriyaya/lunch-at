import styles from "./StoreFull.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HomeWhat from "../components/HomeWhat";

function StoreFull() {
  const { sid } = useParams();
  const [loading, setLoading] = useState(true);
  const [storeInfo, setStoreInfo] = useState({});
  const [storeRatings, setStoreRatings] = useState([]);
  const [storeMenus, setStoreMenus] = useState([]);
  const [srateStat, setSrateStat] = useState({});

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
    avg = (avg / cnt).toFixed(2);
    setSrateStat({ avg: avg, max: max, min: min, cnt: cnt });
  };

  useEffect(() => {
    getStoreInfo();
  }, []);

  return (
    <div>
      <HomeWhat />
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
          평균: {srateStat.avg} (총 {srateStat.cnt}개의 평가) <br />
          최고: {srateStat.max} / 최저:
          {srateStat.min}
        </div>
        <div className={styles.srate}>
          <b>식당 평점</b>
          <table>
            <thead>
              <tr>
                <td
                  style={{
                    width: "30px",
                    textAlign: "center",
                  }}
                >
                  평점
                </td>
                <td className={styles.centerCell}>코멘트</td>
                <td
                  style={{
                    width: "70px",
                    textAlign: "center",
                  }}
                >
                  날짜
                </td>
              </tr>
            </thead>
            <tbody>
              {storeRatings.map((sr, index) => (
                <tr key={index}>
                  <td className={styles.centerCell}>{sr.rating}</td>
                  <td>{sr.comment}</td>
                  <td className={styles.centerCell}>
                    {sr.datetime.substring(0, 10)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.mrate}>
          <b>메뉴 평점</b>
          <br />
          {storeMenus.map((m) => (
            <b>{m.name}</b>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StoreFull;
