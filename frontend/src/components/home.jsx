import { useState, useEffect } from "react"
import axios from "axios"
import { AppBar, Toolbar, Typography, Button, Divider, Chip, Avatar } from "@mui/material";
import logo from "./logo.jpg"
import img1 from "./img1.jpg"
import img2 from "./img2.jpg"
import img3 from "./img3.jpg"
import img4 from "./img4.jpg"
import img5 from "./img5.jpg"
import img6 from "./img6.jpg"
import img7 from "./img7.jpg"
import img8 from "./img8.jpg"
import img9 from "./img9.jpg"
import img10 from "./img10.jpg"

function Home() {
    const [username, setUsername] = useState('');
    const [accountType, setAccountType] = useState('');

    async function getAccountDetails() {
        if (sessionStorage.accessToken == undefined) {
            window.location.href = '/login';
        }

        try{
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
        catch {
            window.location.href = '/login'
        }

        if (message['accountDetails']['accountType'] == null) {
            window.location.href = '/login';
        }
    }

    useEffect(() => {
        getAccountDetails();
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

    return (
        <>
            {
                accountType == 'u' ?
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
                                    <Button onClick={function() {window.location.href = '/recycling'}} sx={{paddingLeft: 2, paddingRight: 2, color: 'black'}}><b>Place Recycling</b></Button>
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
                            <Typography style={{marginLeft: -140, paddingTop: 10}} variant="h5" color="rgb(255, 255, 250)">Turning waste into wealth, one battery at a time.</Typography>
                        </div>

                        <div>
                            <Typography fontSize={40} style={{zIndex: 100, position: 'absolute', top: 450, left: 692}} variant="h4" color="rgb(0, 100, 0)">
                                <b>Reliso</b>
                                <Divider style={{borderWidth: 2, margin: 10, width: 150, marginLeft: -20}}></Divider>
                            </Typography>

                            <div style={{zIndex: 100, position: "absolute", top: 365, padding: 200}}>
                                <Typography variant="h6" fontSize={17} color="rgb(80, 80, 80)">
                                    At Reliso, we are redefining the future of recycling by making the disposal of solar panels and 
                                    lithium-ion batteries simple, efficient, and environmentally responsible. 
                                    With the rapid expansion of renewable energy and electric vehicles, the world is facing a rising
                                    challenge—how to sustainably manage expired solar panels and EV batteries without harming 
                                    the planet. Traditional disposal methods contribute to landfills, pollution, and resource 
                                    depletion, making recycling an urgent necessity.
                                </Typography>
                            </div>
                        </div>

                        <div style={{padding: 250, paddingTop: 70, position: 'absolute', top: 725, zIndex: 100, backgroundColor: "rgb(235, 235, 235)", width: '100%', height: 1000}}>
                            <img src={img1} style={{height: 410, width: 457}}></img>

                            <Typography variant="h4" style={{position: 'absolute', top: 144, left: 785, marginRight: 235}} fontSize={28}>
                                <b style={{color: "rgb(0, 100, 0)"}}>EFFORTLESS RECYCLING</b> - SOLAR PANELS AND LITHIUM ION BATTERY

                                <Typography style={{marginTop: 30, color: 'rgb(80, 80, 80)', wordSpacing: 5}} fontSize={17}>
                                    Our platform provides clear, step-by-step guidance on how to recycle properly. Users can choose
                                    between self-drop-off or scheduled pickups for added convenience. Using our web app, users can
                                    quickly find the nearest recycling center or arrange a pickup.
                                </Typography>
                            </Typography>
                        </div>

                        <div style={{padding: 250, paddingTop: 70, position: 'absolute', top: 1200, zIndex: 100, backgroundColor: "rgb(235, 235, 235)", width: '100%'}}>
                            <img src={img2} style={{position: 'absolute', left: 825, height: 410, width: 457}}></img>

                            <Typography variant="h4" style={{position: 'absolute', top: 144, left: 245, marginRight: 765}} fontSize={28}>
                                <b style={{color: "rgb(0, 100, 0)"}}>ON DEMAND PICKUPS </b> - SOLAR PANELS AND LITHIUM ION BATTERY

                                <Typography style={{marginTop: 30, color: 'rgb(80, 80, 80)', wordSpacing: 5}} fontSize={17}>
                                    Users can schedule a pickup at their convenience, avoiding the need to transport heavy or
                                    bulky items. We use electric vehicles (EVs) for collection, reducing carbon emissions.
                                    Trained professionals ensure materials are transported safely and responsibly.
                                </Typography>
                            </Typography>
                        </div>

                        <div style={{padding: 250, paddingTop: 70, position: 'absolute', top: 1635, zIndex: 100, backgroundColor: "rgb(235, 235, 235)", width: '100%', height: 1000}}>
                            <img src={img3} style={{height: 410, width: 457}}></img>

                            <Typography variant="h4" style={{position: 'absolute', top: 144, left: 785, marginRight: 235}} fontSize={28}>
                                <b style={{color: "rgb(0, 100, 0)"}}>FINANCIAL INCENTIVES</b> - SOLAR PANELS AND LITHIUM ION BATTERY

                                <Typography style={{marginTop: 30, color: 'rgb(80, 80, 80)', wordSpacing: 5}} fontSize={17}>
                                    Users can receive financial incentives, discounts, or credits for properly recycling electronic waste.
                                    By making recycling profitable, we encourage more people to participate in sustainable practices.
                                    Companies can benefit from tax credits, corporate sustainability certifications, and material
                                    buyback programs by participating in our recycling network.
                                </Typography>
                            </Typography>
                        </div>

                        <div style={{padding: 250, paddingTop: 70, position: 'absolute', top: 2115, zIndex: 100, backgroundColor: "rgb(235, 235, 235)", width: '100%', height: 1000}}>
                            <img src={img4} style={{position: 'absolute', left: 825, height: 410, width: 457}}></img>

                            <Typography variant="h4" style={{position: 'absolute', top: 144, left: 245, marginRight: 765}} fontSize={28}>
                                <b style={{color: "rgb(0, 100, 0)"}}>RESOURCE RECOVERY & REUSE </b> - SOLAR PANELS AND LITHIUM ION BATTERY

                                <Typography style={{marginTop: 30, color: 'rgb(80, 80, 80)', wordSpacing: 5}} fontSize={17}>
                                    We recover lithium, cobalt, nickel, silicon, and aluminum for reuse. Instead of sending waste 
                                    to landfills, materials are repurposed and reintegrated into the supply chain. This reduces
                                    pollution caused by the harmful chemicals and saves vital resources.
                                </Typography>
                            </Typography>
                        </div>

                        <div style={{padding: 250, paddingTop: 70, position: 'absolute', top: 2610, zIndex: 100, backgroundColor: "rgb(235, 235, 235)", width: '100%', height: 1000}}>
                            <img src={img5} style={{height: 410, width: 457}}></img>

                            <Typography variant="h4" style={{position: 'absolute', top: 144, left: 785, marginRight: 235}} fontSize={28}>
                                <b style={{color: "rgb(0, 100, 0)"}}>ECO FRIENDLY IMPACT </b> - SOLAR PANELS AND LITHIUM ION BATTERY

                                <Typography style={{marginTop: 30, color: 'rgb(80, 80, 80)', wordSpacing: 5}} fontSize={17}>
                                    By preventing solar panels and batteries from ending up in landfills, we reduce environmental
                                    contamination and toxic waste buildup. Sustainable recycling methods help cut down on the carbon
                                    footprint associated with both waste disposal and new material extraction. Every recycled battery
                                    and solar panel contributes to a more sustainable and energy-efficient world.
                                </Typography>
                            </Typography>
                        </div>

                        <div style={{position: 'absolute', top: 3165, zIndex: 100, backgroundColor: 'rgb(255, 255, 255)', height: 400, width: '100%'}}>
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

                        <div style={{position: 'absolute', top: 3567, zIndex: 100, backgroundColor: 'rgb(20, 20, 20)', height: 225, width: '100%'}}>
                            <Typography color="white" variant="h6" style={{padding: 110, paddingTop: 100}}>
                                Copyright 2025 - All Rights Reserved By <b>Reliso</b>
                            </Typography>

                            <Typography color="white" variant="h6" style={{position: 'absolute', left: 1000, top: 100}}>
                                Developed And Maintained By <b>Suhaas.A</b>
                            </Typography>
                        </div>
                    </>
                :
                    accountType == 'w' ?
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
                                        <Button onClick={function() {window.location.href = '/recycling'}} sx={{paddingLeft: 2, paddingRight: 2, color: 'black'}}><b>Place Recycling</b></Button>
                                        <Button onClick={function() {window.location.href = '/recycling-history'}} sx={{paddingLeft: 2, paddingRight: 2, color: 'black'}}><b>View Past Orders</b></Button>
                                        <Button onClick={function() {window.location.href = '/notifications'}} sx={{position: 'absolute', top: 65, left: 792, width: 170, color: 'black'}}><b>View Notifications</b></Button>
                                        <Button onClick={function() {logOut()}} sx={{position: "absolute", top: 65, left: 965, paddingLeft: 2, paddingRight: 2, color: 'black'}}><b>Log Out</b></Button>

                                        <Avatar onClick={function() {window.location.href = "/account"}} sx={{height: 60, width: 60, marginLeft: 70, backgroundColor: 'rgb(100, 150, 100)'}}>{username[0]}</Avatar>
                                    </Toolbar>
                                </AppBar>
                            </div>

                            <div style={{height: 245, filter: 'brightness(50%)', zIndex: 100, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: 'url("https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=")'}}>
                            </div>
                            
                            <div style={{position: 'absolute', top: 250, left: 675, zIndex: 100}}>
                                <Typography variant="h2" color="rgb(210, 250, 210)"><b>Reliso</b></Typography>
                                <Typography style={{marginLeft: -140, paddingTop: 10}} variant="h5" color="rgb(255, 255, 250)">Turning waste into wealth, one battery at a time.</Typography>
                            </div>

                            <div>
                                <Typography fontSize={40} style={{zIndex: 100, position: 'absolute', top: 450, left: 692}} variant="h4" color="rgb(0, 100, 0)">
                                    <b>Reliso</b>
                                    <Divider style={{borderWidth: 2, margin: 10, width: 150, marginLeft: -20}}></Divider>
                                </Typography>

                                <div style={{zIndex: 100, position: "absolute", top: 365, padding: 200}}>
                                    <Typography variant="h6" fontSize={17} color="rgb(80, 80, 80)">
                                        At Reliso, we recognize that our workers and delivery personnel are the backbone of our sustainable 
                                        recycling efforts. We are committed to providing them with the best resources, support, and 
                                        incentives to ensure a safe, rewarding, and growth-oriented work environment.
                                    </Typography>
                                </div>
                            </div>

                            <div style={{padding: 250, paddingTop: 70, position: 'absolute', top: 725, zIndex: 100, backgroundColor: "rgb(235, 235, 235)", width: '100%', height: 1000}}>
                                <img src={img6} style={{height: 410, width: 457}}></img>

                                <Typography variant="h4" style={{position: 'absolute', top: 144, left: 785, marginRight: 235}} fontSize={28}>
                                    <b style={{color: "rgb(0, 100, 0)"}}>EMPOWERING OUR WORKFORCE</b>

                                    <Typography style={{marginTop: 30, color: 'rgb(80, 80, 80)', wordSpacing: 5}} fontSize={17}>
                                        We foster a culture of respect, inclusivity, and continuous learning. Our employees receive 
                                        hands-on training, professional development opportunities, and access to the latest recycling
                                        technologies to enhance their expertise and career progression.
                                    </Typography>
                                </Typography>
                            </div>

                            <div style={{padding: 250, paddingTop: 70, position: 'absolute', top: 1200, zIndex: 100, backgroundColor: "rgb(235, 235, 235)", width: '100%'}}>
                                <img src={img7} style={{position: 'absolute', left: 825, height: 410, width: 457}}></img>

                                <Typography variant="h4" style={{position: 'absolute', top: 144, left: 245, marginRight: 765}} fontSize={28}>
                                    <b style={{color: "rgb(0, 100, 0)"}}>ON DEMAND PICKUPS </b> - SAFE & EFFICIENT WORK ENVIRONMENT

                                    <Typography style={{marginTop: 30, color: 'rgb(80, 80, 80)', wordSpacing: 5}} fontSize={17}>
                                        Our delivery personnel operate a fleet of zero-emission electric vehicles, ensuring sustainable
                                        logistics. They are provided with regular safety training, advanced tracking systems, and
                                        ergonomic tools to optimize their workflow and minimize physical strain.
                                    </Typography>
                                </Typography>
                            </div>

                            <div style={{padding: 250, paddingTop: 70, position: 'absolute', top: 1635, zIndex: 100, backgroundColor: "rgb(235, 235, 235)", width: '100%', height: 1000}}>
                                <img src={img8} style={{height: 410, width: 457}}></img>

                                <Typography variant="h4" style={{position: 'absolute', top: 144, left: 785, marginRight: 235}} fontSize={28}>
                                    <b style={{color: "rgb(0, 100, 0)"}}>FAIR COMPENSATION & EMPLOYEE BENEFITS</b>

                                    <Typography style={{marginTop: 30, color: 'rgb(80, 80, 80)', wordSpacing: 5}} fontSize={17}>
                                        We believe in fair wages and equitable treatment. Workers and delivery personnel receive 
                                        competitive salaries, performance-based incentives, health benefits, and paid time off,
                                        ensuring financial stability and work-life balance.
                                    </Typography>
                                </Typography>
                            </div>

                            <div style={{padding: 250, paddingTop: 70, position: 'absolute', top: 2115, zIndex: 100, backgroundColor: "rgb(235, 235, 235)", width: '100%', height: 1000}}>
                                <img src={img9} style={{position: 'absolute', left: 825, height: 410, width: 457}}></img>

                                <Typography variant="h4" style={{position: 'absolute', top: 144, left: 245, marginRight: 765}} fontSize={28}>
                                    <b style={{color: "rgb(0, 100, 0)"}}>SAFETY & WELL BEING </b> - OUR TOP PRIORITY

                                    <Typography style={{marginTop: 30, color: 'rgb(80, 80, 80)', wordSpacing: 5}} fontSize={17}>
                                        Our workers are equipped with industry-standard safety gear, ergonomic tools, and real-time 
                                        hazard monitoring systems. We enforce strict protocols to protect them from potential risks
                                        associated with handling lithium-ion batteries and solar panels.
                                    </Typography>
                                </Typography>
                            </div>

                            <div style={{padding: 250, paddingTop: 70, position: 'absolute', top: 2610, zIndex: 100, backgroundColor: "rgb(235, 235, 235)", width: '100%', height: 1000}}>
                                <img src={img10} style={{height: 410, width: 457}}></img>

                                <Typography variant="h4" style={{position: 'absolute', top: 144, left: 785, marginRight: 235}} fontSize={28}>
                                    <b style={{color: "rgb(0, 100, 0)"}}>SUSTAINABILITY IN ACTION </b> - RECOGNIZING EMPLOYEE CONTRIBUTIONS

                                    <Typography style={{marginTop: 30, color: 'rgb(80, 80, 80)', wordSpacing: 5}} fontSize={17}>
                                        Workers and delivery personnel play a crucial role in reducing landfill waste, lowering 
                                        carbon emissions, and promoting a circular economy. Their efforts are celebrated through 
                                        company-wide recognition programs, awards, and milestone incentives.
                                    </Typography>
                                </Typography>
                            </div>

                            <div style={{position: 'absolute', top: 3165, zIndex: 100, backgroundColor: 'rgb(255, 255, 255)', height: 400, width: '100%'}}>
                                <Typography color="rgb(0, 100, 0)" variant="h1" fontSize={45} style={{margin: 200, marginTop: 70}}>
                                    <img src={logo} style={{height: 100, width: 120, paddingLeft: 10, paddingRight: 15}}></img>
                                    <b>Reliso</b>
                                </Typography>

                                <Typography style={{position: 'absolute', top: 75, left: 630, lineHeight: 1.35}} variant="h6">
                                    <i class="fa fa-envelope"></i> random8066@gmail. <br></br> <br></br>
                                    <i class="fa fa-phone"></i> 9696942069 <br></br> <br></br>
                                    <i class="fa fa-home"></i> xyz building, near abc <br></br>&nbsp;&nbsp;&nbsp; def nagar, <br></br> &nbsp;&nbsp;&nbsp; hyderabad
                                </Typography>

                                <div style={{position: 'absolute', top: 75, left: 1050, lineHeight: 3.1}}>
                                    <Button onClick={function() {window.location.href = '/recycling'}} size="large">Place Recycling</Button> <br></br>
                                    <Button onClick={function() {window.location.href = '/account'}} size="large">Edit Account</Button> <br></br>
                                    <Button onClick={function() {window.location.href = '/recycling-history'}} size="large">View Past Orders</Button> <br></br>
                                    <Button onClick={function() {window.location.href = '/notifications'}} size="large">View Notifications</Button> <br></br>
                                </div>

                                <div style={{position: 'absolute', top: 315, left: 350}}>
                                    <Typography variant="h5" color="rgb(0, 80, 0)">
                                        "We do not inherit the Earth from our ancestors; we borrow it from our children".
                                    </Typography>
                                </div>
                            </div>

                            <div style={{position: 'absolute', top: 3567, zIndex: 100, backgroundColor: 'rgb(20, 20, 20)', height: 225, width: '100%'}}>
                                <Typography color="white" variant="h6" style={{padding: 110, paddingTop: 100}}>
                                    Copyright 2025 - All Rights Reserved By <b>Reliso</b>
                                </Typography>

                                <Typography color="white" variant="h6" style={{position: 'absolute', left: 1000, top: 100}}>
                                    Developed And Maintained By <b>Suhaas.A</b> Founded By <b>Mudhith</b>
                                </Typography>
                            </div>
                        </>
                    :
                        null
            }
        </>
    )
}

export default Home
