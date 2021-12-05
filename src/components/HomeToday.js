import styles from "./Home.module.css";

function HomeToday() {
  const now = new Date();
  const month = now.getMonth();
  const date = now.getDate();
  const dayKor = ["일", "월", "화", "수", "목", "금", "토"];
  const day = dayKor[now.getDay()];

  return (
    <div className={styles.hometoday}>
      {month + 1}월 {date}일 {day}요일
      <br />
      오늘 점심,
    </div>
  );
}

export default HomeToday;
