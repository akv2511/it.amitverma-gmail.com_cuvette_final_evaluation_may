import axios from "axios";
import React from "react";
import CongratulationPage from "./Components/QuizInterface/CongratulationPage";
import QuestionAnswerPage from "./Components/QuizInterface/QuestionAnswerPage";
import DashboardHome from "./Components/QuizzieDashboard/DashboardHome";
import Home from "./Components/QuizzieHome/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
// axios.defaults.baseURL = "http://it-amitverma-server.vercel.app/api";
// axios.defaults.withCredentials = true;
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/dashboardhome' element={<DashboardHome />} />       
        <Route path='/quiz/:id' element={<QuestionAnswerPage />} />
        <Route path='/congratulationpage' element={<CongratulationPage />} />        
      </Routes>
    </BrowserRouter >
  );
}

export default App;
