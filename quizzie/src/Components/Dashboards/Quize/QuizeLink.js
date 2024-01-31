import { useState } from 'react';
import styles from './QuizeLink.module.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function QuizeLink({ quizId }) {
    const [copied, setCopied] = useState('');
    const baseUrl = 'http://localhost:3000/quiz/';

    const handleCopyClick = () => {
        navigator.clipboard.writeText(`${baseUrl}${quizId || ''}`)
    };


    const showToastMessage = () => {
        toast.success("Link copied to Clipboard", {
            className: "toastmessage",
        });
    };
    return (
        <>
            <div onBlur={"/dashboardhome"} className={styles.blurbackground}>
                <div className={styles.popup}>
                    <h1 className={styles.heading}>Congrats your Quiz is Published!</h1>
                    <input className={styles.link} id="quizInput" type='text' onChange={(e) => setCopied(e.target.value)} value={`${baseUrl}${quizId || ''}`} readOnly  ></input>
                    <button className={styles.copylinkbutn} onClick={{
                        showToastMessage,
                        handleCopyClick,
                    }}>Share</button>
                    {copied && <p>Copied to clipboard!</p>}
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}
export default QuizeLink;