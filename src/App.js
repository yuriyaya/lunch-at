import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Log from "./routes/Log";
import Find from "./routes/Find";
import StoreInfo from "./routes/StoreInfo";
import SearchStore from "./routes/SearchStore";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log" element={<Log />} />
        <Route path="/find" element={<Find />} />
        <Route path="/find/store/:sid" element={<StoreInfo />} />
        <Route path="/find/stores/search" element={<SearchStore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
