import styles from "./StoreFull.module.css";

function StoreFullMenuRatings({ mrData }) {
  return (
    <div>
      {mrData.map((mr) => (
        <div key={mr.name}>
          <div className={styles.menuName}>
            <b>{mr.name}</b>
            <br />
            평균: {mr.avg} (총 {mr.cnt}개의 평가), 최고: {mr.max} / 최저:{" "}
            {mr.min}
          </div>
          <table className={styles.borderTable}>
            {mr.ratelist.map((c, index) => (
              <tbody key={index}>
                <tr>
                  <td className={styles.rateCell}>{c.rate}</td>
                  <td className={styles.borderTableCell}>{c.comment}</td>
                  <td className={styles.dateCell}>{c.date}</td>
                </tr>
              </tbody>
            ))}
          </table>
          <br />
        </div>
      ))}
    </div>
  );
}

export default StoreFullMenuRatings;
