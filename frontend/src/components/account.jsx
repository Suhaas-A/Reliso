import { useState, useEffect } from "react"
import axios from "axios"
import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, AppBar, Toolbar, Typography, Button, Divider, Chip, Avatar, Card, styled, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField, MenuItem, collapseClasses, InputLabel } from "@mui/material";
import logo from "./logo.jpg"
import solar from "./solar.jpg"
import lithium from "./lithium.jpg"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { red } from "@mui/material/colors";

function Account() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [accountType, setAccountType] = useState('');
    const [orders, setOrders] = useState('');
    const [pendingOrders, setPendingOrders] = useState('');
    const [successfulOrders, setSuccessfulOrders]= useState('');

    async function logOut() {
        const response = await axios.get('http://127.0.0.1:5000/api/log-out', {
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`
            }
        });
        const message = await response.data;
        sessionStorage.removeItem('accessToken')

        window.location.href = 'login'
    }

    async function getAccountDetails() {
        const response = await axios.get('http://127.0.0.1:5000/api/view_account',  {
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`
            }
        })
        const message = await response.data['accountDetails'];

        setUsername(message['username']);
        setEmail(message['email']);
        setPhoneNumber(message['phoneNumber']);
        setAddress(message['address']);
        setAccountType(message['accountType']);

        console.log(message['accountDetails']);
    }

    async function getAllOrders() {
        const response = await axios.get('http://127.0.0.1:5000/api/view-past-orders', {
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`
            }
        });
        const message = await response.data;

        setOrders(message['orders'].length);
        setPendingOrders(message['pendingOrders'].length)
        setSuccessfulOrders(message['orders'].length - message['pendingOrders'].length)
    }

    useEffect(() => {
        getAccountDetails();
        getAllOrders();
    }, [])

    async function editAccount() {
        const data ={
            'username': username,
            'email': email,
            'phoneNumber': phoneNumber,
            'address': address
        };
        const response = await axios.post('http://127.0.0.1:5000/api/edit_account', data, {
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`
            }
        });
        const message = await response.data;
        sessionStorage.accessToken = message['accessToken'];

        console.log(message);

        window.location.reload();
    }

    return (
        <>
            {
                accountType == 'u' ?
                    <div>
                        <AppBar position="static" sx={{backgroundColor: 'white'}}>
                            <Toolbar>
                                <Typography
                                    variant="h5"
                                    sx={{

                                        textDecoration: 'none',
                                        color: 'rgb(0, 100, 0)',
                                        paddingRight: 5,
                                        paddingTop: 4,
                                        paddingBottom: 4,
                                        fontSize: 40,
                                        marginLeft: 7
                                    }}
                                >
                                    <img src={logo} style={{height: 100, width: 120, paddingLeft: 10, paddingRight: 15}}></img>
                                    <b>Reliso</b>
                                </Typography>
                                

                                <Button onClick={function() {window.location.href = '/home'}} sx={{paddingLeft: 2, paddingRight: 2, color: 'black'}}><b>Home</b></Button>
                                <Button onClick={function() {window.location.href = '/recycling'}} sx={{paddingLeft: 2, paddingRight: 2, color: 'black'}}><b>Place Recycling</b></Button>
                                <Button onClick={function() {window.location.href = '/recycling-history'}} sx={{paddingLeft: 2, paddingRight: 2, color: 'black'}}><b>View Past Orders</b></Button>
                                <Button onClick={function() {logOut()}} sx={{paddingLeft: 2, paddingRight: 2, color: 'black'}}><b>Log Out</b></Button>

                                <Avatar onClick={function() {window.location.href = "/account"}} sx={{height: 60, width: 60, marginLeft: 60, backgroundColor: 'rgb(100, 150, 100)'}}>{username[0]}</Avatar>
                            </Toolbar>
                        </AppBar>
                    </div>
                :
                    <div>
                        <AppBar position="static" sx={{backgroundColor: 'white'}}>
                            <Toolbar>
                                <Typography
                                    variant="h5"
                                    sx={{

                                        textDecoration: 'none',
                                        color: 'rgb(0, 100, 0)',
                                        paddingRight: 5,
                                        paddingTop: 4,
                                        paddingBottom: 4,
                                        fontSize: 40,
                                        marginLeft: 7
                                    }}
                                >
                                    <img src={logo} style={{height: 100, width: 120, paddingLeft: 10, paddingRight: 15}}></img>
                                    <b>Reliso</b>
                                </Typography>
                                

                                <Button onClick={function() {window.location.href = '/home'}} sx={{paddingLeft: 2, paddingRight: 2, color: 'black'}}><b>Home</b></Button>
                                <Button onClick={function() {window.location.href = '/recycling'}} sx={{paddingLeft: 2, paddingRight: 2, color: 'black'}}><b>Place Recycling</b></Button>
                                <Button onClick={function() {window.location.href = '/recycling-history'}} sx={{paddingLeft: 2, paddingRight: 2, color: 'black'}}><b>View Past Orders</b></Button>
                                <Button onClick={function() {window.location.href = '/notifications'}} sx={{position: 'absolute', top: 65, left: 737, width: 170, color: 'black'}}><b>View Notifications</b></Button>
                                <Button onClick={function() {logOut()}} sx={{position: "absolute", top: 65, left: 910, paddingLeft: 2, paddingRight: 2, color: 'black'}}><b>Log Out</b></Button>

                                <Avatar onClick={function() {window.location.href = "/account"}} sx={{height: 60, width: 60, marginLeft: 70, backgroundColor: 'rgb(100, 150, 100)'}}>{username[0]}</Avatar>
                            </Toolbar>
                        </AppBar>
                    </div>
            }

            <Card elevation={17} style={{backgroundColor: "rgb(245, 245, 245)", width: 350, margin: 30, marginLeft: 55, height: 515}}>
                <Avatar sx={{fontSize: 45, height: 120, width: 120, backgroundColor: 'rgb(100, 150, 100)', marginLeft: 14, marginTop: 2.5}}>{username[0]}</Avatar>
                <Typography variant="h6" textAlign="center" style={{marginTop: 8}}>
                    <b style={{fontSize: 20}}>{username}</b> <br></br>
                    <div style={{fontSize: 15, marginTop: -5, marginBottom: -5}}>{accountType == 'w' ? 'worker' : 'user'}</div>
                </Typography> <br></br>

                <Divider style={{borderColor: "rgb(200, 200, 200)", borderWidth: 1.2}}></Divider> <br></br>

                <Typography color="info" variant="h5" style={{marginLeft: 35, fontSize: 19, marginRight: 35, marginBottom: 20}}>
                    Orders  <div style={{textAlign: 'right', marginTop: -25}}>{orders}</div>
                </Typography>

                <Divider style={{borderColor: "rgb(200, 200, 200)", borderWidth: 1.2}}></Divider> <br></br>

                <Typography color="error" variant="h5" style={{marginLeft: 35, fontSize: 19, marginRight: 35, marginBottom: 20}}>
                    Pending <div style={{textAlign: 'right', marginTop: -25}}>{pendingOrders}</div>
                </Typography>

                <Divider style={{borderColor: "rgb(200, 200, 200)", borderWidth: 1.2}}></Divider> <br></br>

                <Typography color="success" variant="h5" style={{marginLeft: 35, fontSize: 19, marginRight: 35, marginBottom: 20}}>
                    Successful <div style={{textAlign: 'right', marginTop: -25}}>{successfulOrders}</div>
                </Typography>

                <Divider style={{borderColor: "rgb(200, 200, 200)", borderWidth: 1.2}}></Divider> <br></br>

                <Button variant="contained" color="success" style={{marginTop: 2, marginLeft: 73, width: 200}}>Recycle Now</Button>
            </Card>

            <Card elevation={17} style={{backgroundColor: "rgb(245, 245, 245)", width: 1000, position: 'absolute', top: 195, left: 460, height: 515}}>
                <Typography variant="h3" fontSize={22} style={{margin: 25, textAlign: "center"}}>
                    <b style={{color: "rgb(100, 100, 100)"}}>Account Details</b>
                </Typography>

                <Divider style={{borderColor: "rgb(200, 200, 200)", borderWidth: 1.2}}></Divider>
                
                <div style={{margin: 35, marginLeft: 80}}>
                    <Typography variant="h6" fontSize={17}><b>USERNAME: </b></Typography>
                    <TextField onChange={function(e) {setUsername(e.target.value)}} variant="outlined" value={username} style={{width: 600, position: "absolute", left: 250, top: 100}}></TextField> <br></br>
                </div>

                <div style={{margin: 35, marginLeft: 80}}>
                    <Typography variant="h6" fontSize={17}><b>EMAIL: </b></Typography>
                    <TextField onChange={function(e) {setEmail(e.target.value)}} variant="outlined" value={email} style={{width: 600, position: "absolute", left: 250, top: 185}}></TextField> <br></br>
                </div>

                <div style={{margin: 35, marginLeft: 80}}>
                    <Typography variant="h6" fontSize={17}><b>ADDRESS: </b></Typography>
                    <TextField onChange={function(e) {setAddress(e.target.value)}} variant="outlined" value={address} style={{width: 600, position: "absolute", left: 250, top: 270}}></TextField> <br></br>
                </div>

                <div style={{margin: 35, marginLeft: 80, marginBottom: 25}}>
                    <Typography variant="h6" fontSize={17}><b>PHONE NUMBER: </b></Typography>
                    <TextField onChange={function(e) {setPhoneNumber(e.target.value)}} variant="outlined" value={phoneNumber} style={{width: 600, position: "absolute", left: 250, top: 355}}>                    </TextField> <br></br>
                </div>

                <Button onClick={function() {editAccount()}} variant="contained" size="large" style={{marginLeft: 420, width: 150}}>Update</Button>
            </Card>
        </>
    )
}

export default Account