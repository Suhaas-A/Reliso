import { useState, useEffect } from "react"
import axios from "axios"
import { Button, Card, CardActions, CardContent, CardHeader, TextField, Typography} from "@mui/material";

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [location, setLocation] = useState('');

    async function getNotifications() {
        const response = await axios.get('http://127.0.0.1:5000/api/home', {
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`
            }
        });
        const message = await response.data;
        console.log(message['notifications']);
        setNotifications(message['notifications']);
    }

    useEffect(() => {
        getNotifications();
    }, [])

    async function acceptRecycling(data) {
        data['location'] = location
        const response = await axios.post('http://127.0.0.1:5000/api/accept-recycling', data, {
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`
            }
        });
        const message = await response.data;

        console.log(message);

        window.location.reload();
    }

    async function rejectRecycling(data) {
        const response = await axios.post('http://127.0.0.1:5000/api/reject-recycling', data, {
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
            <ul>
                {
                    notifications.map((notification, id) => (
                        <Card elevation={3} style={{marginRight: 45, marginTop: 35}} key={id}>
                            <CardHeader
                                title={"Delivery At " + notification.username + "`s House"} 
                                subheader={notification.pickUpDate + " " + notification.pickUpTime}
                            />

                            <CardContent style={{paddingLeft: 30}}>
                                <Typography variant="h5">
                                    Here is The address to deliver : <br></br>
                                    <b>{notification.address}</b>
                                </Typography>
                            </CardContent>

                            <CardActions style={{padding: 10}}>
                                <Button variant="contained" onClick={function() {acceptRecycling(notification)}}>
                                    Accept
                                </Button>

                                <Button variant="contained" onClick={function() {rejectRecycling(notification)}}>
                                    Reject
                                </Button>

                                <TextField value={location} onChange={function (e) {setLocation(e.target.value)}} style={{width: 300, marginLeft: 20}} label="Share Your Maps Link To Accept"></TextField>
                            </CardActions>
                        </Card>
                    ))
                }
            </ul>

            {
                notifications.length == 0 ?
                    <Card style={{margin: 20, padding: 20}}>
                        <Typography variant="h2">No Current Notifications</Typography>
                    </Card>
                :
                    null
            }
        </>
    )
}

export default Notifications