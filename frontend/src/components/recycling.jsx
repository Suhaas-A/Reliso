import { useState, useEffect } from "react"
import axios from "axios"
import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, AppBar, Toolbar, Typography, Button, Divider, Chip, Avatar, Card, styled, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField, MenuItem, CardHeader, CardContent, CardActions } from "@mui/material";
import logo from "./logo.jpg"
import solar from "./solar.jpg"
import lithium from "./lithium.jpg"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { red } from "@mui/material/colors";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    height: 300,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.3,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
}));
  
const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});
  
const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));
  
const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgb(100, 100, 100)',
    opacity: 0.1,
    transition: theme.transitions.create('opacity'),
}));
  
const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

function Recycling() {
    const [username, setUsername] = useState('');
    const [accountType, setAccountType] = useState('');
    const [details, setDetails] = useState({});
    const [trackingDetails, setTrackingDetails] = useState([]);
    const [itemType, setItemType] = useState('');
    const [itemWeight, setItemWeight] = useState(2000);
    const [vehicle, setVehicle] = useState(10500);
    const [itemQuantity, setItemQuantity] = useState('');
    const [itemAge, setItemAge] = useState('');
    const [openSolar, setOpenSolar] = useState(false);
    const [openLithium, setOpenLithium] = useState(false);
    const [pickUpDate, setPickUpDate] = useState(null);
    const [pickUpTime, setPickUpTime] = useState(null);

    async function getAccountDetails() {
        const response = await axios.get('https://recyclingapp.pythonanywhere.com/api/view_account',  {
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`
            }
        })
        const message = await response.data;

        setUsername(message['accountDetails']['username']);
        setAccountType(message['accountDetails']['accountType'])
        console.log(message['accountDetails']);
    }

    async function getCurrentRecycling() {
        const response = await axios.get('https://recyclingapp.pythonanywhere.com/api/view-current-order',  {
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`
            }
        });
        const message = await response.data;

        setDetails(message['order']);
        console.log(message);
    }

    async function trackCurrentRecycling() {
        const response = await axios.get('https://recyclingapp.pythonanywhere.com/api/track-current-recycling',  {
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`
            }
        });
        const message = await response.data;

        setTrackingDetails(message['orders']);
        console.log(message);
    }

    useEffect(() => {
        getAccountDetails();
        getCurrentRecycling();
        trackCurrentRecycling();
    }, [])

    async function logOut() {
        const response = await axios.get('https://recyclingapp.pythonanywhere.com/api/log-out', {
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`
            }
        });
        const message = await response.data;
        sessionStorage.removeItem('accessToken')

        window.location.href = 'login'
    }

    async function placeRecycling(type) {
        const data = {
            'itemType': type,
            'itemWeight': itemWeight,
            'itemQuantity': itemQuantity,
            'recyclingDate': pickUpDate,
            'recyclingTime': pickUpTime,
            'vehicle': vehicle
        };
        console.log(itemType);
        const response = await axios.post('https://recyclingapp.pythonanywhere.com/api/place-recycling', data, {
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`
            }
        });
        const message = await response.data;

        console.log(message);

        window.location.reload();
    }

    async function completeDelivery(id) {
        const data = {'id': id};
        const response = await axios.post('https://recyclingapp.pythonanywhere.com/api/successful-delivery', data, {
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`
            }
        });
        const message = await response.data;

        console.log(message);

        window.location.reload();
    }

    return (
        <>
            {
                accountType == 'u' ?
                    details == null ?
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

                            <div>
                                <Card sx={{position: 'absolute', width: '27%', height: 330, top: 500, left: 200, borderRadius: 3}} elevation={5}>
                                    <ImageButton
                                        focusRipple
                                        key={'Recycle'}
                                        style={{
                                            width: '93%',
                                            left: 15,
                                            top: 15,
                                            position: 'absolute'
                                        }}
                                        onClick={function() {setOpenSolar(true)}}
                                    >
                                        <ImageSrc style={{ backgroundImage: `url(${solar})` }} />
                                        <ImageBackdrop className="MuiImageBackdrop-root" />
                                        <Image>
                                            <Typography
                                                component="span"
                                                variant="h5"
                                                color="rgb(40, 40, 40)"
                                                sx={(theme) => ({
                                                    position: 'relative',
                                                    p: 4,
                                                    pt: 2,
                                                    pb: `calc(${theme.spacing(1)} + 6px)`,
                                                })}
                                            >
                                                {'Solar Panels'}
                                                <ImageMarked className="MuiImageMarked-root" />
                                            </Typography>
                                        </Image>
                                    </ImageButton>
                                </Card>

                                <Typography color="rgb(80, 80, 80)" variant="h5" style={{position: "absolute", top: 850, left: 115, padding: 40}}>
                                    <b>Harness the sun, recycle the past, power the future.</b>
                                </Typography>

                                <Card sx={{position: 'absolute', width: '27%', height: 330, top: 500, left: 930, borderRadius: 3}} elevation={5}>
                                    <ImageButton
                                        focusRipple
                                        style={{
                                            width: '93%',
                                            left: 15,
                                            top: 15,
                                            position: 'absolute'
                                        }}
                                        onClick={function() {setOpenLithium(true)}}
                                    >
                                        <ImageSrc style={{ backgroundImage: `url(${lithium})` }} />
                                        <ImageBackdrop className="MuiImageBackdrop-root" />
                                        <Image>
                                            <Typography
                                                component="span"
                                                variant="h5"
                                                color="rgb(40, 40, 40)"
                                                sx={(theme) => ({
                                                    position: 'relative',
                                                    p: 4,
                                                    pt: 2,
                                                    pb: `calc(${theme.spacing(1)} + 6px)`,
                                                })}
                                            >
                                                {'Lithium Ion Batteries'}
                                                <ImageMarked className="MuiImageMarked-root" />
                                            </Typography>
                                        </Image>
                                    </ImageButton>
                                </Card>

                                <Typography color="rgb(80, 80, 80)" variant="h5" style={{position: "absolute", top: 850, left: 815, padding: 40, paddingBottom: 100}}>
                                    <b>Lithium never dies—recycle, revive, and repower the future!</b>
                                </Typography>
                            </div>

                            <div style={{position: 'absolute', top: 1005, zIndex: 100, backgroundColor: 'rgb(255, 255, 255)', height: 400, width: '100%'}}>
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

                            <div style={{position: 'absolute', top: 1408, zIndex: 100, backgroundColor: 'rgb(20, 20, 20)', height: 225, width: '100%'}}>
                                <Typography color="white" variant="h6" style={{padding: 110, paddingTop: 100}}>
                                    Copyright 2025 - All Rights Reserved By <b>Reliso</b>
                                </Typography>

                                <Typography color="white" variant="h6" style={{position: 'absolute', left: 1000, top: 100}}>
                                    Developed And Maintained By <b>Suhaas.A</b>
                                </Typography>
                            </div>

                            <Dialog
                                open={openSolar}
                                handleClose={function() {setOpenSolar(true)}}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title" style={{paddingLeft: 100, paddingRight: 100, paddingTop: 50}}>
                                    Please Provide The Following Data
                                </DialogTitle>
                                <DialogContent style={{paddingLeft: 100, paddingRight: 100, paddingTop: 1}}>
                                    <br></br>
                                    <TextField placeholder="Item Quantity" label="Item Quantity" fullWidth value={itemQuantity} onChange={function(e) {setItemQuantity(e.target.value)}}></TextField> <br></br> <br></br>
                                    <TextField placeholder="Item Size" label="Item Size" fullWidth select value={itemWeight} onChange={function(e) {setItemWeight(e.target.value)}}>
                                        <MenuItem value={2000}>
                                            Small
                                        </MenuItem>
                                        <MenuItem value={2500}>
                                            Medium
                                        </MenuItem>
                                        <MenuItem value={3000}>
                                            Big
                                        </MenuItem>
                                    </TextField> <br></br> <br></br>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker fullWidth value={pickUpDate} onChange={(date) => setPickUpDate(date)} /> <br></br> <br></br>
                                        <TimePicker fullWidth value={pickUpTime} onChange={(time) => setPickUpTime(time)}/>
                                    </LocalizationProvider>

                                    <Typography variant="h5" fontSize={24} style={{position: "absolute", top: 440, left: 95}}>Amount You Get - <b> {itemQuantity * itemWeight} </b></Typography>
                                </DialogContent>
                                <DialogActions style={{padding: 35, paddingTop: 80}}>
                                    <Button onClick={function() {setOpenSolar(false); placeRecycling('s')}}>Recycle Now</Button>
                                    <Button onClick={function() {setOpenSolar(false)}} autoFocus>
                                        Close
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            <Dialog
                                open={openLithium}
                                handleClose={function() {setOpenLithium(true)}}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title" style={{paddingLeft: 100, paddingRight: 100, paddingTop: 50}}>
                                    Please Provide The Following Data
                                </DialogTitle>
                                <DialogContent style={{paddingLeft: 100, paddingRight: 100, paddingTop: 1}}>
                                    <br></br>
                                    <TextField placeholder="Number Of EV Vehicles" label="Number Of EV Vehicles" fullWidth value={itemQuantity} onChange={function(e) {setItemQuantity(e.target.value)}}></TextField> <br></br> <br></br>
                                    <TextField placeholder="Vehicle" label="Vehicle" fullWidth select value={vehicle} onChange={function(e) {setVehicle(e.target.value)}}>
                                        <MenuItem value={10500}>
                                            Bike
                                        </MenuItem>
                                        <MenuItem value={15000}>
                                            Car
                                        </MenuItem>
                                        <MenuItem value={22000}>
                                            Bus
                                        </MenuItem>
                                    </TextField> <br></br> <br></br>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker fullWidth value={pickUpDate} onChange={(date) => setPickUpDate(date)} /> <br></br> <br></br>
                                        <TimePicker fullWidth value={pickUpTime} onChange={(time) => setPickUpTime(time)}/>
                                    </LocalizationProvider>

                                    <Typography variant="h5" fontSize={24} style={{position: "absolute", top: 440, left: 95}}>Amount You Get - <b> {itemQuantity * vehicle} </b></Typography>
                                </DialogContent>
                                <DialogActions style={{padding: 35, paddingTop: 80}}>
                                    <Button onClick={function() {setOpenLithium(false); placeRecycling('l')}}>Recycle Now</Button>
                                    <Button onClick={function() {setOpenLithium(false)}} autoFocus>
                                        Close
                                    </Button>
                                </DialogActions>
                            </Dialog>
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
                                    <Chip label={details['status'] == 'p' ? 'Pending' : details['status'] == 'd' ? 'Deliverd' : details['status']} style={{fontSize: 15, color: 'red', position: 'absolute', top: 480, left: 400}}></Chip>
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
                                            <TableCell align="right">Monetary Incentives</TableCell>
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
                                                <TableCell align="right"><b style={{fontSize: 17}}>Total Monetary Incentives</b></TableCell>
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
                :
                    <>
                        {
                            trackingDetails.length == 0 ?
                                <Card style={{margin: 20, padding: 20}}>
                                    <Typography variant="h2">No Current Orders</Typography>
                                </Card>
                            :
                                <Typography variant="h4" style={{padding: 30}}>
                                    Here Are Your List Of Orders :
                                </Typography>
                        }

                        {
                            trackingDetails.map((detail, id) => (
                                <Card key={id}>
                                    <CardHeader
                                        title={"Order #" + detail.id}
                                        subheader={detail.pickUpDate + " " + detail.pickUpTime}
                                    />

                                    <CardContent>
                                        <Typography>
                                            You Have To Deliver At This Address : <b>{detail.address}</b>
                                        </Typography>

                                        <Typography>
                                            Contact Of User : <b>{detail.userContact}</b>
                                        </Typography>

                                        <Typography>
                                            Here Are The Item Details : <br></br>
                                            -Item Name : <b>{detail.itemType == "s" ? "Solar Panel" : "Lithium Ion Battery"}</b> <br></br>
                                            -Item Quantity : <b>{detail.itemQuantity}</b> <br></br>
                                            -Total Monetary Incentives : <b>{detail.totalPrice}</b> <br></br>
                                            -Item To Bring : <b>{
                                                detail.itemWeight == 2000 ?
                                                    "Small Solar Panel"
                                                :
                                                    detail.itemWeight == 2500 ?
                                                        "Medium Solar Panel"
                                                    :
                                                        detail.itemWeight == 3000 ?
                                                            "Large Solar Panel"
                                                        :
                                                            detail.itemWeight == 10500 ?
                                                                "Bike Lithium Ion Battery"
                                                            :
                                                                detail.itemWeight == 15000 ?
                                                                    "Car Lithium Ion Battery"
                                                                :
                                                                    "Bus Lithium Ion Battery"
                                            }</b>
                                        </Typography>
                                    </CardContent>

                                    <CardActions>
                                        <Button variant="contained" style={{margin: 10}} onClick={function() {completeDelivery(detail.id)}}>Successful Delivery</Button>
                                    </CardActions>
                                </Card>
                            ))
                        }
                    </>
            }
        </>
    )
}

export default Recycling
