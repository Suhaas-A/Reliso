import { useState } from "react"
import axios from "axios"
import { TextField, Button, Divider, Typography } from "@mui/material"

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function submit() {
        const data = {
            'username': username,
            'password': password
        };
        const response = await axios.post('https://recyclingapp.pythonanywhere.com/api/login', data);
        const message = await response.data;

        console.log(message);

        sessionStorage.setItem('accessToken', message['accessToken']);

        if (message['accessToken'] != null) {
            window.location.href = '/home';
        }
    }

    return (
        <>
            <div style={{ position: "fixed", top: "25%", left: "20%" }}>
                <Typography variant="h3" style={{ color: 'rgb(0, 100, 0)', fontSize: "4vw" }}><b>Reliso</b></Typography>
                <Typography variant="h5" style={{ fontSize: "2vw" }}>Recycling today for a greener tomorrow.</Typography>
            </div>

            <div className="w3-card-4 w3-white w3-border w3-round-large" 
                style={{ width: "30%", height: "45%", position: "fixed", top: "20%", left: "60%" }}>
                
                <TextField 
                    style={{ width: "92%", margin: "4%", marginBottom: 0 }} 
                    fullWidth className="w3-border w3-round-large" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="username">
                </TextField> 
                <br />

                <TextField 
                    style={{ width: "92%", margin: "4%", marginTop: "-1%" }} 
                    fullWidth className="w3-border w3-round-large" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="password">
                </TextField> 
                <br />
                
                <Button 
                    style={{ width: "92%", margin: "4%", marginTop: "-2%", height: "13%" }} 
                    variant="contained" 
                    fullWidth 
                    onClick={() => submit()}>
                    Submit
                </Button>

                <a style={{ marginLeft: "32%" }} href="/forget-password">Forgotten Password?</a>

                <Divider style={{ marginTop: "5%" }}></Divider>

                <Button 
                    onClick={() => window.location.href = '/register'} 
                    style={{ width: "50%", margin: "12%", marginBottom: "4%", marginTop: "5%", height: "13%" }} 
                    color="success" 
                    variant="contained">
                    Create Account
                </Button>
            </div>
        </>
    )
}

export default Login
