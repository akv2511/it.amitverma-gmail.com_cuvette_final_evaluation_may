import styles from './CreateQuize.module.css';
import Quize from './Quize';
import { useState } from 'react';
function CreateQuize(props) {
    const [selected, setSelected] = useState("");
    const [error, setError] = useState({});
    const [quizData, setQuizData] = useState({
        quizName: "",
        quizType: "",
    })
    const handelInput = (event) => {
        event.preventDefault();
        if(event.target.value.trim()===""){
            setError({
                ...error,
                quizName:true
            })
        }else{
        setQuizData({
            ...quizData,
            quizName: event.target.value,
        })}
    }
    console.log("datacheck", quizData)
    const handelButton = (type) => {
        console.log("type", type)
        setQuizData({
            ...quizData,
            quizType: type,
        })
    }

    return (
        <>
            <div className={styles.blurbackground}>
                <div className={styles.popup}>
                    <input className={styles.input} type='text' placeholder='QUIZ NAME' onChange={handelInput}></input>
                    {error.quizName === true && <lable className={styles.inputerror}>Can't be empty</lable>}
                    <div className={styles.qnapollbodr}>
                        <label className={styles.label}>Quize Type</label>
                        <button className={quizData?.quizType === "Q&A" ? styles.butqnaslect : styles.butqna}
                            onClick={() => {
                                handelButton("Q&A");
                            }} >
                            Q & A
                        </button>
                        <button className={quizData?.quizType === "Poll" ? styles.butpollslect : styles.butpoll}
                            onClick={() => {
                                // setSelected("Q&A");
                                handelButton("Poll");
                            }}>
                            Poll
                        </button>
                    </div>
                    <button onClick={props.onCancel} className={styles.cancelbut}>Cancel</button>
                    <button className={styles.continuebut} onClick={() => setSelected("quize")}>Continue</button>
                </div>
                {(selected === "quize" ) &&  <Quize {...props} quizData={quizData} handleData={setQuizData} /> }
            </div>
        </>
    )
}
export default CreateQuize;