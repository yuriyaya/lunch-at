import HomeToday from "../components/HomeToday";
import HomeWhat from "../components/HomeWhat";
import HomeHow from "../components/HomeHow";
import HomeFooter from "../components/HomeFooter";

function Home() {
  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        gridTemplateRows: "30% 30% 30% 10%",
      }}
    >
      <HomeToday />
      <HomeWhat />
      <HomeHow />
      <HomeFooter />
    </div>
  );
}

export default Home;
