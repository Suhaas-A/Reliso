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
            <div style={{position: "absolute", top: '27%', left: '17.5%'}}>
                <Typography variant="h3" style={{color: 'rgb(0, 100, 0)', fontSize: 58}}><b>Reliso</b></Typography>
                <Typography variant="h5" style={{fontSize: 27}}>Recycling today for a greener tomorrow.</Typography>
            </div>
            
            <div class="w3-card-4 w3-white w3-border w3-round-large" style={{'width': '26%', 'height': 350, position: "absolute", top: '18%', left: '54.8%'}}>
                <TextField style={{width: 368, margin: 16, marginBottom: 0}} fullWidth class="w3-border w3-round-large" value={username} onChange={function(e) {setUsername(e.target.value)}} placeholder="username"></TextField> <br></br>
                <TextField style={{width: 368, margin: 16, marginTop: -10}} fullWidth class="w3-border w3-round-large" value={password} onChange={function(e) {setPassword(e.target.value)}} placeholder="password"></TextField> <br></br>
                
                <Button style={{width: 368, margin: 16, marginTop: -20, height: 45}} variant="contained" fullWidth onClick={function() {submit()}}>submit</Button>

                <a style={{marginLeft: 130}} href="/forget-password">Forgotten Password?</a>

                <Divider style={{marginTop: 20}}></Divider>

                <Button onClick={function() {window.location.href = '/register'}} style={{width: 200, margin: 100, marginBottom: 16, marginTop: 20, height: 45}} color="success" variant="contained">Create Account</Button>
            </div>
        </>
    )
}

export default Login
