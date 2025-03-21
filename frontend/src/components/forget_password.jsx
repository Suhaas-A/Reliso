import { useState, useEffect } from "react";
import axios from "axios";

function ForgetPassword() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [otp, setOtp] = useState('');
    const [inputOtp, setInputOtp] = useState('');

    async function verifyUser() {
        const response = await axios.post('http://127.0.0.1:5000/api/forget-password', {'username': username});
        const message = response.data;

        setOtp(message['otp']);

        console.log(message);
    }

    async function ResetPassword() {
        console.log(otp, inputOtp);
        if (String(otp) == String(inputOtp)) {
            const data = {
                'username': username,
                'password': password
            }
            const response = await axios.post('http://127.0.0.1:5000/api/reset-password', data);
            
            window.location.href = '/login';
        } else {
            console.log('Wrong Code');
            window.location.href = '/api/register'
        }
    }

    return (
        <>
            <input value={username} onChange={function(e) {setUsername(e.target.value)}} placeholder="username"></input>
            <input value={password} onChange={function(e) {setPassword(e.target.value)}} placeholder="password"></input>
            <button onClick={function() {verifyUser()}}>submit</button>

            {
                otp == '' ?
                    null
                :
                    <>
                        <input value={inputOtp} onChange={function(e) {setInputOtp(e.target.value)}} placeholder="otp"></input>
                        <button onClick={function() {ResetPassword()}}>Verify</button>
                    </>
            }
        </>
    )
}

export default ForgetPassword
