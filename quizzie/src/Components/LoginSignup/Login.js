import styles from './Login.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");
    const [apiError, setApiError] = useState();
    const [error, setError] = useState(false);
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    function validateEmail(email) {
        return emailRegex.test(email);
    }   
    const handelSubmit = async (event) => {
        event.preventDefault();
        if (!validateEmail(email) || password.length === 0) {
            setError(true);
        }else  {             
            try  {
                console.log("handleSignIn")
            const response  =  await fetch('https://it-amitverma-server.vercel.app/api/loginUser', {
                method: 'POST',
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                
                    
                }, body: JSON.stringify({
                    email,
                    password,
                }),
                })
                    .then((res) => res.json())
                    .then((respose) => {
                        console.log(respose, "user-Login")
                        if (respose.status === "SUCCESS") {                            
                            localStorage.setItem("token", respose.jwtToken);
                            localStorage.setItem("email", respose.email);
                            navigate('/dashboardhome')
                        }else{
                            setApiError(respose)
                        }
                    })                
            } catch (error) {
                console.log(error)
                console.error('Error error login:', error.message);
                setResponse('Error login user. Please try again.');
            };
        };
    }

    return (
        <>
            <form onSubmit={handelSubmit} className={styles.loginform}>
                <h1 className={styles.texth1}>
                    Email <input className={styles.logininput}
                    type="email" name="email"
                    placeholder='Enter your Register email-Id'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </h1>
                {error && !validateEmail(email) ?
                    <lable className={styles.error}>Invalid email address</lable> : ""}
                <br />
                <h1 className={styles.texth1}>
                    Password<input className={styles.logininput}
                    type="password" name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </h1 >
                
                {error && password.length <= 0 ?
                    <lable className={styles.error}>Can't be empty</lable> : ""}
                <br />
                <button onClick={handelSubmit} className={styles.loginbutn}>Log In</button>
                {apiError && 
                    <lable className={styles.error}>{apiError.message}</lable>}
            </form>
        </>
    )
}
export default Login;

