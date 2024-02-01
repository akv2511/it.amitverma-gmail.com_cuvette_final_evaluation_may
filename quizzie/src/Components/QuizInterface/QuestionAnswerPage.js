import React, { useEffect, useState } from 'react';
import styles from './QuestionAnswerPage.module.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


function QuestionAnswerPage() {
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const [page, setPage] = useState(0)
    const navigate = useNavigate();
    const [time, setTime] = useState(quiz?.timer)
    const handleSubmit = () => {
        if (page < quiz.questions.length) {
            setPage(page + 1)
        }
        if (page === quiz.questions.length - 1) {
            navigate("/congratulationpage")
        }
    }
    useEffect(() => {
        const fetchQuizById = async () => {
            try {
                const response = await axios.get(`/quiz/${params.id}`);
                setQuiz(response.data);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizById();
    }, [params.id]);
    useEffect(() => {
        console.log("timer", time)
        const interval = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime === 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTime - 1;
            });
        }, (1000));
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (quiz?.timer) {            
            console.log('secnd effect', quiz?.timer);
            setTime(quiz?.timer)
        }
    }, [quiz, page]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!quiz) {
        return <p>Quiz not found.</p>;
    }
    const renderQuestion = quiz.questions.map((data, index) => {
        return (
            <div key={index} className={styles.qnamainpage}>
                <div className={styles.qnapage}>
                    <label className={styles.totalquestion}>{`${index + 1}/${quiz.questions.length}`}</label>
                    <label className={styles.timer}>{`00:${time < 10 ? `0${time}` : time}s`}</label>
                    <p className={styles.questionp}>{data.questionName}</p>
                    <div className={styles.optionspage}>
                        {data.options.map((options, optionsIndex) => (
                            <div key={optionsIndex} className={styles.options}>
                                {data.optionType === 'optionTypetxt' && options.text}
                                {data.optionType === 'optionTypeimg' && <img className={styles.optionimg} src={options.url} alt="" />}
                                {data.optionType === 'optionTypeboth' && (
                                    <div className={styles.options2}>
                                        <div>
                                            <img className={styles.optionimgboth} src={options.url} alt="" />
                                        </div>
                                        <div className={styles.urltxt}>{options.text}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <button className={styles.butnsubmit} onClick={handleSubmit}>SUBMIT</button>
                </div>
            </div>
        );
    });


    return (
        <div>
            {renderQuestion[page]}
        </div>

    );
}

export default QuestionAnswerPage;

