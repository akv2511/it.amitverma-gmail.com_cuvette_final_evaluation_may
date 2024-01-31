import { useState } from 'react';
import styles from './Quize.module.css';
import plus from '../../../Assets/plus.png';
import cross from '../../../Assets/charm_cross.png'
import React from 'react'
import QuizeLink from './QuizeLink';

function Quize(props) {
    // const [quesType, setQuesType] = useState("optionTypetxt");
    const [currentPage, setCurrentPage] = useState(0);
    const [response, setResponse] = useState();
    const [timer, setTimer] = useState(null);
    const [quizId, setQuizId] = useState();
    const questionObject = {
        questionName: "",
        optionType: "optionTypetxt",
        options: [],
        answer: "",
    }

    const [pageData, setPageData] = useState([questionObject])
    const handelInput = (event) => {
        console.log("handelinput", currentPage)
        event.preventDefault();
        const updatedPageData = [...pageData];
        updatedPageData[currentPage]["questionName"] = event.target.value;
        setPageData(updatedPageData);
    }
    const handelInputType = (event) => {
        console.log("handeltype", event.target)
        event.preventDefault();
        const updatedPageData = [...pageData];
        updatedPageData[currentPage]["optionType"] = event.target.value;
        setPageData(updatedPageData);
    }
    const handelPageDelete = (event, index) => {
        console.log("pagedelete", index)
        event.stopPropagation();
        setCurrentPage(index - 1);
        pageData.splice(index, 1);
        setPageData(pageData);
    }
    // const handleOptionInput = (optionIndex, event) => {
    //     const updatedPageData = [...pageData];
    //     updatedPageData[currentPage].options[optionIndex] = event.target.value;
    //     setPageData(updatedPageData);
    // };
    const handleOptionInputBoth = (optionIndex, event, key) => {
        const updatedPageData = [...pageData];
        if (updatedPageData[currentPage].options[optionIndex] === undefined) {
            updatedPageData[currentPage].options[optionIndex] = {}
        }
        updatedPageData[currentPage].options[optionIndex][key] = event.target.value;
        setPageData(updatedPageData);
    };
    const handleOptionSelect = (event) => {
        const updatedPageData = [...pageData];
        updatedPageData[currentPage]["answer"] = event.target.value;
        console.log("pagedata", pageData, currentPage);
        setPageData(updatedPageData);
    };
    const handelSubmitQuestion = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://it-amitverma-server.vercel.app/api/createQuiz', {
                method: 'POST',
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json",
                   
                },
                body: JSON.stringify({
                    quizName: props.quizData?.quizName,
                    quizType: props.quizData?.quizType,
                    questions: pageData,
                    email: localStorage.getItem("email"),
                    timer: timer,
                    createdAt: Date.now(),
                }),
            })
                .then((res) => res.json())
                .then((respose) => {
                    // console.log(respose)
                    if (respose.status === "SUCCESS") {
                        console.log(respose, "QuestionRegister")
                    }
                    setQuizId(respose.quizId)
                })
        } catch (error) {
            console.error('Error adding item:', error.message);
            setResponse('Error adding item. Please try again.');
        };
    };
    console.log("pagedata", pageData)
    console.log("currentpage", currentPage)
    return (
        <>
            <div className={styles.background}>
                <div className={styles.popup}>
                    <div className={styles.number}>
                        {pageData?.map((page, index) => {
                            return (<div key={index} onClick={() => setCurrentPage(index)} className={styles.addno}>
                                {index === 0 ?
                                    null : <img key={index} onClick={(e) => handelPageDelete(e, index)} className={styles.cross} src={cross} alt="" />}
                                <h1 className={styles.no}>{index + 1}</h1>
                            </div>
                            )
                        })}
                        {pageData.length < 5 ?
                            <img className={styles.plusimg} onClick={() => setPageData([...pageData, questionObject])} src={plus} alt="plus" /> : null}
                    </div>
                    <input className={styles.input} type='text' value={pageData[currentPage]["questionName"]} placeholder='Enter Question' onChange={handelInput} />
                    <div className={styles.qnapollbodr}>
                        <label >Option Type</label>
                        <ul><input type="radio" id="inputtxt" value="optionTypetxt" name='1' checked={pageData[currentPage]["optionType"] === "optionTypetxt"} onChange={handelInputType} setQuesType="optionTypetxt" />Text</ul>
                        <ul ><input type="radio" id="inputimg" value="optionTypeimg" name='1' checked={pageData[currentPage]["optionType"] === "optionTypeimg"} onChange={handelInputType} setQuesType="optionTypeimg" />Image url</ul>
                        <ul ><input type="radio" id="inputbothtxtimg" value="optionTypeboth" name='1' checked={pageData[currentPage]["optionType"] === "optionTypeboth"} onChange={handelInputType} setQuesType="optionTypeboth" />Text & Image url</ul>
                    </div>
                    <div>
                        {pageData[currentPage]["optionType"] === "optionTypetxt" &&
                            <div setQuesType="inputtxt" className={styles.inputtxtdiv}>
                                <input type='radio' className={pageData[currentPage]["answer"]=== "0" && styles.inputrdochng} name="AT" value={0} checked={pageData[currentPage]["answer"] === '0'} onChange={handleOptionSelect} ></input><input className={pageData[currentPage]["answer"]=== "0" ? styles.inputtxtchng : styles.inputtxt} type='text' value={pageData[currentPage].options[0]?.text} placeholder='text' onChange={(e) => handleOptionInputBoth(0, e, "text")}></input>
                                <input type='radio' name="AT" value={1} checked={pageData[currentPage]["answer"] === '1'} onChange={handleOptionSelect} ></input><input className={pageData[currentPage]["answer"]=== "1" ? styles.inputtxtchng : styles.inputtxt} type='text' value={pageData[currentPage].options[1]?.text} placeholder='text' onChange={(e) => handleOptionInputBoth(1, e, "text")}></input>
                                <input type='radio' name="AT" value={2} checked={pageData[currentPage]["answer"] === '2'} onChange={handleOptionSelect}></input><input className={pageData[currentPage]["answer"]=== "2" ? styles.inputtxtchng : styles.inputtxt} type='text' value={pageData[currentPage].options[2]?.text} placeholder='text' onChange={(e) => handleOptionInputBoth(2, e, "text")}></input>
                                <input type='radio' name="AT" value={3} checked={pageData[currentPage]["answer"] === '3'} onChange={handleOptionSelect}></input><input className={pageData[currentPage]["answer"]=== "3" ? styles.inputtxtchng : styles.inputtxt} type='text' value={pageData[currentPage].options[3]?.text} placeholder='text' onChange={(e) => handleOptionInputBoth(3, e, "text")}></input>
                            </div>
                        }
                        {pageData[currentPage]["optionType"] === "optionTypeimg" &&
                            <div setQuesType="inputimg" className={styles.inputimgurldiv}>
                                <input type='radio' name="IA" value={0} checked={pageData[currentPage]["answer"] === '0'} onChange={handleOptionSelect}></input><input className={pageData[currentPage]["answer"]=== "0" ? styles.inputtxtchng : styles.inputtxt} type='text' value={pageData[currentPage].options[0]?.url} placeholder='image url' onChange={(e) => handleOptionInputBoth(0, e, "url")}></input>
                                <input type='radio' name="IA" value={1} checked={pageData[currentPage]["answer"] === '1'} onChange={handleOptionSelect}></input><input className={pageData[currentPage]["answer"]=== "1" ? styles.inputtxtchng : styles.inputtxt} type='text' value={pageData[currentPage].options[1]?.url} placeholder='image url' onChange={(e) => handleOptionInputBoth(1, e, "url")}></input>
                                <input type='radio' name="IA" value={2} checked={pageData[currentPage]["answer"] === '2'} onChange={handleOptionSelect}></input><input className={pageData[currentPage]["answer"]=== "2" ? styles.inputtxtchng : styles.inputtxt} type='text' value={pageData[currentPage].options[2]?.url} placeholder='image url' onChange={(e) => handleOptionInputBoth(2, e, "url")}></input>
                                <input type='radio' name="IA" value={3} checked={pageData[currentPage]["answer"] === '3'} onChange={handleOptionSelect}></input><input className={pageData[currentPage]["answer"]=== "3" ? styles.inputtxtchng : styles.inputtxt} type='text' value={pageData[currentPage].options[3]?.url} placeholder='image url' onChange={(e) => handleOptionInputBoth(3, e, "url")}></input>
                            </div>}
                        {pageData[currentPage]["optionType"] === "optionTypeboth" &&
                            <div setQuesType="inputbothtxtimg" className={styles.inputtxtimgdiv}>
                                <input type='radio' name="ATI" value={0} checked={pageData[currentPage]["answer"] === '0'} onChange={handleOptionSelect}></input><input className={pageData[currentPage]["answer"]=== "0" ? styles.inputtxtimgchng : styles.inputtxtimg} type='text' value={pageData[currentPage].options[0]?.text} placeholder='text' onChange={(e) => handleOptionInputBoth(0, e, "text")}></input>
                                <input className={pageData[currentPage]["answer"]=== "0" ? styles.inputtxtchng : styles.inputtxt} type='text' value={pageData[currentPage].options[0]?.url} placeholder='image url' onChange={(e) => handleOptionInputBoth(0, e, "url")} /><br />
                                <input type='radio' name="ATI" value={1} checked={pageData[currentPage]["answer"] === '1'} onChange={handleOptionSelect}></input><input className={pageData[currentPage]["answer"]=== "1" ? styles.inputtxtimgchng : styles.inputtxtimg} type='text' value={pageData[currentPage].options[1]?.text} placeholder='text' onChange={(e) => handleOptionInputBoth(1, e, "text")}></input>
                                <input className={pageData[currentPage]["answer"]=== "1" ? styles.inputtxtchng : styles.inputtxt} type='text' value={pageData[currentPage].options[1]?.url} placeholder='image url' onChange={(e) => handleOptionInputBoth(1, e, "url")} /><br />
                                <input type='radio' name="ATI" value={2} checked={pageData[currentPage]["answer"] === '2'} onChange={handleOptionSelect}></input><input className={pageData[currentPage]["answer"]=== "2" ? styles.inputtxtimgchng : styles.inputtxtimg} type='text' value={pageData[currentPage].options[2]?.text} placeholder='text' onChange={(e) => handleOptionInputBoth(2, e, "text")}></input>
                                <input className={pageData[currentPage]["answer"]=== "2" ? styles.inputtxtchng : styles.inputtxt} type='text' value={pageData[currentPage].options[2]?.url} placeholder='image url' onChange={(e) => handleOptionInputBoth(2, e, "url")} /><br />
                                <input type='radio' name="ATI" value={3} checked={pageData[currentPage]["answer"] === '3'} onChange={handleOptionSelect}></input><input className={pageData[currentPage]["answer"]=== "3" ? styles.inputtxtimgchng : styles.inputtxtimg} type='text' value={pageData[currentPage].options[3]?.text} placeholder='text' onChange={(e) => handleOptionInputBoth(3, e, "text")}></input>
                                <input className={pageData[currentPage]["answer"]=== "3" ? styles.inputtxtchng : styles.inputtxt} type='text' value={pageData[currentPage].options[3]?.url} placeholder='image url' onChange={(e) => handleOptionInputBoth(3, e, "url")} /><br />
                            </div>}
                            {props.quizData?.quizType === "Q&A" &&
                        <div className={styles.timer}>
                            <h5 className={styles.timertxt}>Timer</h5>
                            <button className={timer === null ? styles.timerbutnslect : styles.timerbutn} onClick={() => setTimer(null)}>off</button>
                            <button className={timer === 5 ? styles.timerbutnslect : styles.timerbutn} onClick={() => setTimer(5)}>5 sec</button>
                            <button className={timer === 10 ? styles.timerbutnslect : styles.timerbutn} onClick={() => setTimer(10)}>10 sec</button>
                        </div>}
                    </div>
                    <button className={styles.cancelbut} onClick={props.onCancel}>Cancel</button>
                    <button className={styles.continuebut} onClick={(e) => { setResponse("quizelink"); handelSubmitQuestion(e) }} > Continue</button>
                </div>
                {response === "quizelink" && <QuizeLink quizId={quizId} />}
            </div>
        </>
    )
}

export default Quize;
