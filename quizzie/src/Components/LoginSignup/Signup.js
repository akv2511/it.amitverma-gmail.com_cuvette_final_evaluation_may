import styles from './Signup.module.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState(false);
    const [apiError, setApiError] = useState();
    const navigate = useNavigate();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    function validateEmail(email) {
        return emailRegex.test(email);
    }

    const handleAddUser = async (event) => {
        event.preventDefault();
    
        if (name.length === 0 || !validateEmail(email) || password.length === 0 || confirmpassword !== password) {
            setError(true);
        } else {
            try {
                const response = await axios.post('/register', {
                    name,
                    email,
                    password,
                });    
                console.log(response.data);   
                if (response.data.status === 'SUCCESS') {
                    console.log(response.data, 'userRegister');
                    localStorage.setItem('email', response.data?.email);
                    localStorage.setItem('token', response.data.jwtToken);                    
                    navigate('/dashboardhome');
                } else {
                    setApiError(response.data);
                }
            } catch (error) {
                console.error('Error adding item:', error.message);
                setResponse('Error adding item. Please try again.');
            }
        }
    };
    return (
        <>
            <form onSubmit={handleAddUser} className={styles.signinform}>
                <label className={styles.labelsignup}>
                    Name
                </label>
                <input className={styles.signupinput}
                    type="text" name="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {error && name.length <= 0 ?
                    <label className={styles.error}>Can't be empty</label> : ""}
                <br />
                <label className={styles.labelsignup}>
                    Email
                </label>
                <input className={styles.signupinput}
                    type="email" name="name"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {error && !validateEmail(email) ?
                    <label className={styles.error}>Invalid email address</label> : ""}
                <br />
                <label className={styles.labelsignup}>
                    Password
                </label >
                <input className={styles.signupinput}
                    type="password" name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && password.length <= 0 ?
                    <lable className={styles.error}>Can't be empty</lable> : ""}
                <br />
                <label className={styles.labelsignup}>
                    Confirm Password
                </label>
                <input className={styles.signupinput}
                    type="password" name="confirmpassword"
                    placeholder="Confirm your password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && confirmpassword !== password ?
                    <label className={styles.error}>password not match</label> : ""}
                <br />
                <button onClick={handleAddUser} className={styles.signbutn}>Sign-Up</button>
                {apiError && 
                    <label className={styles.error}>{apiError.message}</label> }
            </form>
        </>
    )
}
export default Signup;
