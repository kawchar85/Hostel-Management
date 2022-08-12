import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Axios from 'axios';

export default function AddRoom() {
    const [show, setShow] = useState(false);

    const [room, setRoom] = useState({
        room_id : 0,
        hostel_id : 0,
    })

    const [error, setError] = useState({
        room_id : "* field is required",
        hostel_id : "* field is required",
    })

    const handleSubmit = (event) => {

        console.log("now in handlesubmit");
        event.preventDefault();

        //check error
        const isEmpty = Object.values(error).every(x => x === null || x === "");
        console.log(isEmpty);
        if (isEmpty) {
            Axios.get("http://localhost:3001/getData/hostel", { params: { hostel_id: room.hostel_id } }).then((response) => {
                if(response.data === "error"){
                    setError({ ...error, hostel_id: "You have entered an Invalid Hostel id!!..." });
                } else {
                    
                    Axios.post("http://localhost:3001/add/room", {
                        hostel_id: room.hostel_id,
                        room_id: room.room_id,
                    }).then(() => {
                        setShow(true);
                    console.log("room added");
                    }).catch((e) => alert(e));
                }
            }).catch((e) => alert(e));
            
        }

    };

    return (
        <>
        <div className="shadow p-4" style={{
            width: "60%",
            border: "3px solid lightGray",
            marginLeft: "auto",
            marginRight: "auto",
        }} >
            <Alert show={show} variant="success">
                <Alert.Heading>Hostel Management Says</Alert.Heading>
                <p>
                    Room Added successfully...
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => { setShow(false); window.location.reload(); }} variant="outline-success">
                        Close!
                    </Button>
                </div>
            </Alert>

            {!show && (
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="hostel_id">
                        <Form.Label>Hostel ID</Form.Label>
                        <Form.Control type="number" onChange={(event) => {
                            const value = event.target.value;
                            setRoom({ ...room, hostel_id: value });
                            let msg = "";
                            if (value.length === 0)
                                msg = "* field is required";
                            else if (Number(value) <= 0)
                                msg = "Hostel ID must be greater than zero!";
                            else if (!Number.isInteger(Number(value)))
                                msg = "Invalid number!"
                            setError({ ...error, hostel_id: msg });
                        }} />
                        <span className="text-danger">{error.hostel_id}</span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="room_id">
                        <Form.Label>Room ID</Form.Label>
                        <Form.Control type="number" onChange={(event) => {
                            const value = event.target.value;
                            setRoom({ ...room, room_id: value });
                            let msg = "";
                            if (value.length === 0)
                                msg = "* field is required";
                            else if (Number(value) <= 0)
                                msg = "Room ID must be greater than zero!";
                            else if (!Number.isInteger(Number(value)))
                                msg = "Invalid number!"
                            setError({ ...error, room_id: msg });
                        }} />
                        <span className="text-danger">{error.room_id}</span>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Room
                    </Button>
                </Form>
            )}

        </div>
        <br/><br/>
        </>
    )
}
