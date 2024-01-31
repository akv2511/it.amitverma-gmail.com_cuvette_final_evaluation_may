import styles from './Home.module.css';
import React, { useState } from 'react';
import Signup from '../LoginSignup/Signup';
import Login from '../LoginSignup/Login';

function Home() {
    const [selected, setSelected] = useState("signup");

    return (
        <>
            <div className={styles.signupmainpage}>
                <h1 className={styles.heading}>QUIZZIE</h1>
            </div>
            <div>
                <button
                    className={styles.signupbutton}
                    style={selected === "signup" ? { boxShadow: "0 0 50px 0 rgba(0,25,255,.24)" } : {}}
                    onClick={() => setSelected("signup")}>
                    Sign Up
                </button>
                <button className={styles.loginbutton}
                    style={selected === "login" ? { boxShadow: "0 0 50px 0 rgba(0,25,255,.24)" } : {}}
                    onClick={() => setSelected("login")}>
                    Log In
                </button>
            </div>
            <div className={styles.form}>
                {selected === "signup" ? <Signup /> : <Login />
                }
            </div>
        </>
    )
}
export default Home;