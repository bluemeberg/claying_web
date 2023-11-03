import { Route, Routes } from "react-router-dom";
import "./App.css";
import AnalysisPage from "./pages/AnalysisPage/AnalysisPage";
import FindPage from "./pages/FindPage/FindPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import CompletionPage from "./pages/ResultPage/CompletionPage";
import ResultPage from "./pages/ResultPage/ResultPage";
import RecommendChannel from "./pages/ResultPage/RecommendChannel";
import RecommendVideo from "./pages/ResultPage/RecommendVideo";
import FindChannel from "./pages/FindPage/FindChannel";
import AfterRecommendPage from "./pages/HookingPage/AfterRecommendPage";
import AfterUserRecommendPage from "./pages/HookingPage/AfterUserRecommendPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/analysis" element={<AnalysisPage />} />
      <Route path="/complete" element={<CompletionPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/result/channel/:channelId" element={<RecommendChannel />} />
      <Route path="/result/video/:videoId" element={<RecommendVideo />} />
      <Route path="/find" element={<FindPage />} />
      <Route path="/find/:channelId" element={<FindChannel />} />
      <Route path="/app/channel" element={<AfterRecommendPage />} />
      <Route path="/app/user" element={<AfterUserRecommendPage />} />
    </Routes>
  );
}

export default App;
