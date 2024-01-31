import styles from './Dashboard.module.css';
import eyeimg from '../../Assets/icon-park-outline_eyes.png'
function Dashboard({ quizData }) {
    return (
        <>
            <div className={styles.dashboardmain}>
                <div className={styles.card}>
                    <div className={styles.card1}>{quizData.length}<br /> Quize Created</div>
                    <div className={styles.card2}>{quizData.reduce((count, currentValue) => count + currentValue.questions?.length, 0)}<br /> Question Created</div>
                    <div className={styles.card3}>0<br />Total Impressions</div>
                </div>
                <h1 className={styles.trendingheadng}>Trending Quizs</h1>
                <div className={styles.trendingquize}>
                    {quizData.map(data => (
                        <div key={data._id} className={styles.insidetrendingquize}>
                            <h1 className={styles.heading}>{data.quizName}</h1>
                            <span className={styles.eyenumbr}>400</span>
                            <img className={styles.eyeimg} src={eyeimg} alt="eyeimg" />
                            <lable className={styles.date}>Created on : {data.createdAt.split('T')[0]}</lable>

                        </div>))}
                </div>
            </div>
        </>
    )
}
export default Dashboard;