import styles from './Analytics.module.css';
import edit from '../../Assets/uil_edit.png';
import delet from '../../Assets/material-symbols_delete.png';
import share from '../../Assets/material-symbols_share.png';
import axios from 'axios';

import React, { useState } from 'react';

function Analytics({ quizData, refreshData }) {
  const [selected, setSelected] = useState(null);
  const data = quizData;
  
  const handelDelete = (id) => {      
    axios.delete(`/quiz/${id}`)
      .then(response => refreshData(true))
      .catch(error => console.error(error));  
      setSelected(null) 
};
  return (
    <>
      <div className={styles.analyticsmain}>
        <h1 className={styles.quizeanalysheadng}>Quiz Analysis</h1>
      </div>
      <div className={styles.tabelview}>
        <table className={styles.table}>
          <tr className={styles.tr1}>
            <th className={styles.sno}>S.No </th>
            <th className={styles.sno1}>Quize Name</th>
            <th className={styles.sno1}>Created on</th>
            <th className={styles.snoimp1}>impression</th>
            <th className={styles.snoimg1}></th>
            <th className={styles.snoimg1} ></th>
            <th className={styles.snoimg1}></th>
            <th className={styles.sno1}></th>

          </tr>
          {quizData.map((data, index) => (
            <tr key={data._id} >
              <td className={styles.td1}>{index + 1}</td>
              <td className={styles.td1}>{data.quizName}</td>
              <td className={styles.td1}>{data.createdAt.split('T')[0]}</td>
              <td className={styles.td1}>365</td>
              <td className={styles.td1}><img src={edit} alt="img" /></td>
              <td className={styles.td1}><img onClick={() => setSelected(data?._id)} src={delet} alt="img" /></td>
              <td className={styles.td1}><img src={share} alt="img" /></td>
              <td className={styles.td1}><a className={styles.td1} href="">Question Wise Analysis</a></td>
            </tr>))}
        </table>
      </div>
      
      <div>
        {selected !== null && 
        <div className={styles.blurbackground}>
        <div className={styles.popup}>
          <h1 className={styles.headingh1}>Are you confirm you want to delete ?</h1>
          <div><button className={styles.cancelbut} onClick={() => setSelected(null)}>Cancel</button>
          <button className={styles.cancelcnfrm} onClick={() => handelDelete(selected)}>confirm</button>
        </div></div>
        </div>}
      </div>
    </>
  )
}
export default Analytics;