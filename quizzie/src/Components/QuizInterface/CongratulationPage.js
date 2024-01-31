import styles from './CongratulationPage.module.css';
import trophy from '../../Assets/trophy.png';
function CongratulationPage(){
    return(
        <>
        <div className={styles.mainpage}>
            <div className={styles.congratulationpage}>
                <h1 className={styles.congheading}>Congrats Quiz is completed</h1>
                <img className={styles.imgtrphy} src={trophy} alt='imgtrophy' />
                <h1 className={styles.scoreheading}>Your Score is 03/04</h1>
            </div>
        </div>
        </>
    )
}
export default CongratulationPage;