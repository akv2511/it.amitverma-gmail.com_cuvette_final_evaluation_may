import React, { useEffect, useState } from "react";
import styles from './DashboardHome.module.css';
import Dashboard from '../Dashboards/Dashboard';
import Analytics from '../Dashboards/Analytics';
import Line from '../../Assets/line.png'
import { useNavigate } from 'react-router-dom';
import CreateQuize from "../Dashboards/Quize/CreateQuize";
import axios from 'axios';
function DashboardHome() {
  const [selected, setSelected] = useState("dashboard");
  const [quizData, setQuizData] = useState([]);
  const [refresh, setRefresh] = useState(true);    
  const navigate = useNavigate();
  const onLogOut = () => {
    localStorage.removeItem("token", "");
    localStorage.removeItem("email", "");
    navigate('/');
  }
    useEffect(() => {
      // Fetch data from the server
      if(refresh===true){
        axios.get(`http://localhost:4000/api/quiz?email=${localStorage.getItem("email")}`)
        .then(response => {
          setQuizData(response.data);
          setRefresh(false);
        })
        .catch(error => console.error(error));
      }
      
  }, [refresh]);

  return (
    <>
      <nav className={styles.dashnav}>
        <div>
          <h1 className={styles.navheading}>QUIZZIE</h1>
        </div>
        <div className={styles.buttonmid}>
          <button className= {selected==="dashboard" ? styles.butdasbrdslect :styles.butdasbrd} onClick={() => setSelected("dashboard")}>Dashboard</button>
          <button className={selected==="analytics" ? styles.butanalatyslect :styles.butanalaty} onClick={() => setSelected("analytics")}>Analytics</button>
          <button className={selected==="createquize" ? styles.butcreatequizslect :styles.butcreatequiz } onClick={() => setSelected("createquize")}>Create Quiz</button>
        </div>
        <div>
          <img className={styles.lineimg} src={Line} alt="img"/>
          <button className={styles.buttonlogout} onClick={onLogOut} >LOGOUT</button>
        </div>
      </nav>
      <div>
        {selected === "dashboard" && <Dashboard quizData={quizData} />}
        {selected === "analytics" && <Analytics quizData={quizData} refreshData={setRefresh}/>}
        {selected === "createquize" && <CreateQuize onCancel={() => setSelected("dashboard")} />}
      </div>
    </>
  )
}
export default DashboardHome;