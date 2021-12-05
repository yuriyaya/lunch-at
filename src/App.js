import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Log from "./routes/Log";
import Find from "./routes/Find";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log" element={<Log />} />
        <Route path="/find" element={<Find />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
