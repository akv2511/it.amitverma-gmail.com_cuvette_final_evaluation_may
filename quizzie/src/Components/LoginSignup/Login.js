import styles from './Login.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
        } else {
            try {
                console.log("handleSignIn");    
                const response = await axios.post('/loginUser', {
                    email,
                    password,
                });   
                console.log(response.data, 'user-Login');    
                if (response.data.status === 'SUCCESS') {
                    localStorage.setItem('token', response.data.jwtToken);
                    localStorage.setItem('email', response.data.email);
                    navigate('/dashboardhome');
                } else {
                    setApiError(response.data);
                }
            } catch (error) {
                console.log(error);
                console.error('Error error login:', error.message);
                setResponse('Error login user. Please try again.');
            }
        }
    };

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

