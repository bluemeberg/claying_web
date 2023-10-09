import { Route, Routes } from "react-router-dom";
import "./App.css";
import AnalysisPage from "./pages/AnalysisPage/AnalysisPage";
import FindPage from "./pages/FindPage/FindPage";
import LoadingPage2 from "./pages/LoginPage/LoadingPage2";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import CompletionPage from "./pages/ResultPage/CompletionPage";
import ResultPage from "./pages/ResultPage/ResultPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/analysis" element={<AnalysisPage />} />
      <Route path="/complete" element={<CompletionPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/find" element={<FindPage />} />
    </Routes>
  );
}

export default App;
