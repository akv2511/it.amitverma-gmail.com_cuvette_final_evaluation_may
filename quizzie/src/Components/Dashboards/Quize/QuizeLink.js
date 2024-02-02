import { useState } from 'react';
import styles from './QuizeLink.module.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
function QuizeLink({ quizId }) {
    const [copied, setCopied] = useState('');
    const navigate = useNavigate();
    const baseUrl = 'https://quizzieee-app.vercel.app/quiz/';

    const handleCopyClick = () => {
        navigator.clipboard.writeText(`${baseUrl}${quizId || ''}`)
        showToastMessage();        
    };

 const handelBacktoDashboard = () => {
        navigate("/dashboardHome")
    }
    const showToastMessage = () => {
        toast.success("Link copied to Clipboard", {
            className: "toastmessage",
        });
    };
    return (
        <>
            <div onBlur={handelBacktoDashboard}  className={styles.blurbackground}>
                <div className={styles.popup}>
                    <h1 className={styles.heading}>Congrats your Quiz is Published!</h1>
                    <input className={styles.link} id="quizInput" type='text' onChange={(e) => setCopied(e.target.value)} value={`${baseUrl}${quizId || ''}`} readOnly  ></input>
                    <button className={styles.copylinkbutn} onClick={handleCopyClick}
                    >Share</button>
                    {copied}
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}
export default QuizeLink;
