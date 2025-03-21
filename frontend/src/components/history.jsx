import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, AppBar, Toolbar, Typography, Button, Divider, Chip, Avatar, Card, styled, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField, MenuItem } from "@mui/material";
import logo from "./logo.jpg"
import solar from "./solar.jpg"
import lithium from "./lithium.jpg"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function History() {
    const [orders, setOrders] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [username, setUsername] = useState('');
    const [accountType, setAccountType] = useState('');
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState({});

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

    async function getAllOrders() {
        const response = await axios.get('http://127.0.0.1:5000/api/view-past-orders', {
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`
            }
        });
        const message = await response.data;

        setOrders(message['orders']);
        setPendingOrders(message['pendingOrders'])

        console.log(message);
    }

    async function getAccountDetails() {
        const response = await axios.get('http://127.0.0.1:5000/api/view_account',  {
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`
            }
        })
        const message = await response.data;

        setUsername(message['accountDetails']['username']);
        setAccountType(message['accountDetails']['accountType'])
        console.log(message['accountDetails']);
    }

    useEffect(() => {
        getAllOrders();
        getAccountDetails();
    }, [])

    return (
        <>
            {
                open == false?
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
                                            <Button onClick={function() {window.location.href = '/account'}} sx={{paddingLeft: 2, paddingRight: 2, color: 'black'}}><b>View Account</b></Button>
                                            <Button onClick={function() {window.location.href = '/notifications'}} sx={{position: 'absolute', top: 65, left: 712, width: 170, color: 'black'}}><b>View Notifications</b></Button>
                                            <Button onClick={function() {logOut()}} sx={{position: "absolute", top: 65, left: 885, paddingLeft: 2, paddingRight: 2, color: 'black'}}><b>Log Out</b></Button>
            
                                            <Avatar onClick={function() {window.location.href = "/account"}} sx={{height: 60, width: 60, marginLeft: 70, backgroundColor: 'rgb(100, 150, 100)'}}>{username[0]}</Avatar>
                                        </Toolbar>
                                    </AppBar>
                                </div>
                        }

                        <Typography variant="h4" style={{padding: 30}}><b>Order History</b></Typography>
                        <Button variant="contained" size="large" style={{position: "absolute", top: 195, left: 1300}}>Place New Order</Button>

                        <Card elevation={2} sx={{padding: 4, marginTop: 1, marginBottom: 5, marginLeft: 3.5, width: 1450, backgroundColor: 'rgb(230, 230, 230)', height: 430, overflow: 'auto'}}>
                            {orders.map((order) => (
                                <Card key={order.id} style={{background: 'rgb(254, 254, 254)', padding: 30}}>
                                    <Typography variant="h5">Order #{order.id} ({order.itemType == 'l'? 'Lithium' : 'Solar'})</Typography> <br></br>
                                    <Button onClick={function() {setDetails(order); setOpen(true)}} variant="contained">View Details</Button>
                                </Card>
                            ))}

                            {pendingOrders.map((order) => (
                                <Card key={order.id} style={{background: 'rgb(254, 254, 254)', padding: 30}}>
                                    <Typography variant="h5">Order #{order.id} ({order.itemType == 'l'? 'Lithium' : 'Solar'})</Typography> <br></br>
                                    <Button color="error" onClick={function() {setDetails(order); setOpen(true)}} variant="contained">View Details</Button>
                                </Card>
                            ))}
                        </Card>
                    </>
                :
                    <>
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
                                    

                                    <Button onClick={function() {window.location.href = '/account'}} sx={{paddingLeft: 2, paddingRight: 2, color: 'black'}}><b>View Account</b></Button>
                                    <Button onClick={function() {window.location.href = '/home'}} sx={{paddingLeft: 2, paddingRight: 2, color: 'black'}}><b>Home</b></Button>
                                    <Button onClick={function() {window.location.href = '/recycling-history'}} sx={{paddingLeft: 2, paddingRight: 2, color: 'black'}}><b>View Past Orders</b></Button>
                                    <Button onClick={function() {logOut()}} sx={{paddingLeft: 2, paddingRight: 2, color: 'black'}}><b>Log Out</b></Button>

                                    <Avatar onClick={function() {window.location.href = "/account"}} sx={{height: 60, width: 60, marginLeft: 60, backgroundColor: 'rgb(100, 150, 100)'}}>{username[0]}</Avatar>
                                </Toolbar>
                            </AppBar>
                        </div>

                        <div style={{height: 245, filter: 'brightness(50%)', zIndex: 100, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: 'url("https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=")'}}>
                        </div>
                        
                        <div style={{position: 'absolute', top: 250, left: 675, zIndex: 100}}>
                            <Typography variant="h2" color="rgb(210, 250, 210)"><b>Reliso</b></Typography>
                            <Typography style={{marginLeft: -120, paddingTop: 10}} variant="h5" color="rgb(255, 255, 250)">Recycling today for a greener tomorrow.</Typography>
                        </div>

                        <div style={{paddingLeft: 130, paddingTop: 60, paddingBottom: 60, backgroundColor: "rgb(230, 230, 230)"}}>
                            <Typography variant="h6" fontSize={33}>
                                <b>Order Details #{details['id']}</b>
                                <Chip label={details['status']} style={{fontSize: 15, color: 'red', position: 'absolute', top: 480, left: 400}}></Chip>
                            </Typography>

                            <Typography variant="body2" fontSize={14} color="rgb(100, 100, 100)">
                                Date: {details['pickUpDate']} &nbsp;&nbsp; Time: {details['pickUpTime']}
                            </Typography> <br></br> <br></br>

                            <TextField sx={{width: 1000, backgroundColor: "white"}} label="Tracking Url" value={details['location'] == null ? "Waiting For a Delivery Person" : details['location']}></TextField> <br></br> <br></br> <br></br>

                            <Typography><b>Item Ordered</b></Typography>

                            <Card sx={{marginTop: 3, marginBottom: 5, marginRight: 5, minWidth: 650, maxWidth: 1000}}>
                                <Table sx={{ minWidth: 650, maxWidth: 1000 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Item Name</TableCell>
                                        <TableCell align="right">Item Price</TableCell>
                                        <TableCell align="right">Item Quantity</TableCell>
                                        <TableCell align="right">Total Price</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {details['itemType'] == 's' ? 'Solar Panel' : 'Lithium Ion Battery'}
                                            </TableCell>
                                            <TableCell align="right">{details['itemWeight']}</TableCell>
                                            <TableCell align="right">{details['itemQuantity']}</TableCell>
                                            <TableCell align="right">{details['totalPrice']}</TableCell>
                                        </TableRow>

                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                
                                            </TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right"><b style={{fontSize: 17}}>Product Total</b></TableCell>
                                            <TableCell align="right"><b style={{fontSize: 17}}>{details['totalPrice']}</b></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Card>
                        </div>

                        <div style={{position: 'absolute', top: 985, zIndex: 100, backgroundColor: 'rgb(255, 255, 255)', height: 400, width: '100%'}}>
                            <Typography color="rgb(0, 100, 0)" variant="h1" fontSize={45} style={{margin: 200, marginTop: 70}}>
                                <img src={logo} style={{height: 100, width: 120, paddingLeft: 10, paddingRight: 15}}></img>
                                <b>Reliso</b>
                            </Typography>

                            <Typography style={{position: 'absolute', top: 75, left: 630, lineHeight: 1.35}} variant="h6">
                                <i class="fa fa-envelope"></i> random8066@gmail. <br></br> <br></br>
                                <i class="fa fa-phone"></i> 9696942069 <br></br> <br></br>
                                <i class="fa fa-home"></i> xyz building, near abc <br></br>&nbsp;&nbsp;&nbsp; def nagar, <br></br> &nbsp;&nbsp;&nbsp; hyderabad
                            </Typography>

                            <div style={{position: 'absolute', top: 75, left: 1050}}>
                                <Button onClick={function() {window.location.href = '/recycling'}} size="large">Place Recycling</Button> <br></br> <br></br>
                                <Button onClick={function() {window.location.href = '/account'}} size="large">Edit Account</Button> <br></br> <br></br>
                                <Button onClick={function() {window.location.href = '/recycling-history'}} size="large">View Past Orders</Button> <br></br> <br></br>
                            </div>

                            <div style={{position: 'absolute', top: 315, left: 350}}>
                                <Typography variant="h5" color="rgb(0, 80, 0)">
                                    "We do not inherit the Earth from our ancestors; we borrow it from our children".
                                </Typography>
                            </div>
                        </div>

                        <div style={{position: 'absolute', top: 1388, zIndex: 100, backgroundColor: 'rgb(20, 20, 20)', height: 225, width: '100%'}}>
                            <Typography color="white" variant="h6" style={{padding: 110, paddingTop: 100}}>
                                Copyright 2025 - All Rights Reserved By <b>Reliso</b>
                            </Typography>

                            <Typography color="white" variant="h6" style={{position: 'absolute', left: 1000, top: 100}}>
                                Developed And Maintained By <b>Suhaas.A</b>
                            </Typography>
                        </div>
                    </>
            }
        </>
    )
}

export default History