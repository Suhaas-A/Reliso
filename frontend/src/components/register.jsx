import { useState } from "react"
import axios from "axios"
import { TextField, Typography, Button, Divider, MenuItem } from "@mui/material";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [accountType, setAccountType] = useState('');

    async function submit() {
        const data = {'username': username, 
            'password': password, 
            'email': email, 
            'phoneNumber': phoneNumber, 
            'address': address, 
            'accountType': accountType
        };
        const response = await axios.post('https://recyclingapp.pythonanywhere.com/api/register', data);
        const message = await response.data;

        console.log(message);

        window.location.href = '/home';
    }

    return (
        <>
            <div>
                <Typography class="w3-center" variant="h3" style={{color: 'rgb(0, 100, 0)', fontSize: 58}}><b>Reliso</b></Typography>
            </div>

            <div class="w3-card-4 w3-white w3-border w3-round-large" style={{'width': '35%', 'height': 590, position: "absolute", top: '14.5%', left: '34.5%'}}>
                <Typography variant="h6" fontSize={25} style={{marginLeft: 98, marginTop: 6}}><b>Create a new account</b></Typography>
                <Typography variant="h6" fontSize={15} style={{marginLeft: 155, marginTop: -5, marginBottom: 12, color: 'rgb(90, 90, 90)'}}>It's quick and easy.</Typography>
                <Divider></Divider>
                <TextField label="Username" size="small" style={{margin: 16, width: '93.5%'}} value={username} onChange={function(e) {setUsername(e.target.value)}} placeholder="Username"></TextField> <br></br>
                <TextField label="Password" size="small" style={{margin: 16, marginTop: 0, width: '93.5%'}} value={password} onChange={function(e) {setPassword(e.target.value)}} placeholder="Password"></TextField> <br></br>
                <TextField label="Email" size="small" style={{margin: 16, marginTop: 0, width: '93.5%'}} value={email} onChange={function(e) {setEmail(e.target.value)}} placeholder="Email"></TextField> <br></br>
                <TextField label="Phone number" size="small" style={{margin: 16, marginTop: 0, width: '93.5%'}} value={phoneNumber} onChange={function(e) {setPhoneNumber(e.target.value)}} placeholder="Phone number"></TextField> <br></br>
                <TextField label="Address" size="small" style={{margin: 16, marginTop: 0, width: '93.5%'}} value={address} onChange={function(e) {setAddress(e.target.value)}} placeholder="Address"></TextField> <br></br>
                <TextField select label="Role" size="small" style={{margin: 16, marginTop: 0, width: '93.5%'}} value={accountType} onChange={function(e) {setAccountType(e.target.value)}} placeholder="Role">
                    <MenuItem value={'u'}>
                        Customer
                    </MenuItem>
                    <MenuItem value={'w'}>
                        Worker
                    </MenuItem>
                </TextField>

                <div>
                    <Typography fontSize={11} style={{color: 'rgb(90, 90, 90)', margin: 16, marginTop: -2}}>By clicking on register, you opt to share your provided details with us and other specific workers.</Typography>
                    <Typography fontSize={11} style={{color: 'rgb(90, 90, 90)', margin: 16, marginTop: -11}}>Do not try to place prank orders.</Typography>
                </div>

                <Button color="success" size="medium" variant="contained" style={{width: 180, position: "fixed", left: 665}} onClick={function() {submit()}}>submit</Button>

                <a class="w3-text-blue" href="/login" style={{position: "fixed", left: 660, top: 650}}>Already have an account?</a>
            </div>
        </>
    )
}

export default Register
