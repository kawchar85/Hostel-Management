import React, { useEffect, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Axios from 'axios';

//import { PublicContex } from './PublicContext';

export default function UpdateHostel(props) {
    //const [publicData, setPublicData] = useContext(PublicContex);

    const hostelData = JSON.parse(props.hostel);
    console.log("here hostel data::");
    console.log(hostelData);

    const [show, setShow] = useState(false);
    const [finalMsg, setFinalMsg] = useState("");

    const [hostel, setHostel] = useState({
        id: JSON.stringify(hostelData.Hostel_ID),
        type: hostelData.Type,
        name: hostelData.Name,
        address: hostelData.Address,
        contact: hostelData.Contact,
        occupied_seats: hostelData.Occupied_Seats,
        total_seats: hostelData.Total_Seats,
    })

    const [error, setError] = useState({
        id: "",
        type: "",
        name: "",
        address: "",
        contact: "",
        total_seats: "",
    })

    console.log("set: ");
    console.log(hostel);

    const handleSubmit = (event) => {

        console.log("now in handlesubmit2");
        event.preventDefault();
        //check erro?
        const isEmpty = Object.values(error).every(x => x === null || x === "");
        console.log(isEmpty);
        console.log(error);
        
        if (isEmpty) {
                Axios.put("http://localhost:3001/update/hostel", {
                    hostel_id: hostel.id,
                    type: hostel.type,
                    name: hostel.name,
                    address: hostel.address,
                    contact: hostel.contact,
                    occupied_seats: hostel.occupied_seats,
                    total_seats: hostel.total_seats,
        
                }).then((response) => {
                    if(response.data === "error"){
                        setFinalMsg("Something Error!!");
                    } else {
                        setFinalMsg("Hostel Updated successfully...");
                    }
                    setShow(true);
                }).catch((e) => alert(e));
                
        }
        console.log(hostel);

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
                <Alert.Heading>How's it going?!</Alert.Heading>
                <p>
                    {finalMsg}
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
                    <Form.Group className="mb-3" controlId="hostelID">
                        <Form.Label>Hostel ID</Form.Label>
                        <Form.Control type="number" value={hostel.id} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="hostelName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Hostel Name" value = {hostel.name} onChange={(event) => {
                            const value = event.target.value;
                            setHostel({ ...hostel, name: value });
                            let msg = "";
                            if (value.length === 0)
                                msg = "* field is required";
                            else if (value.length < 2)
                                msg = "Too short!";
                            setError({ ...error, name: msg });
                        }} />
                        <span className="text-danger">{error.name}</span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="hostelType">
                        <Form.Label>Type</Form.Label>
                        <Form.Select value = {hostel.type} onChange={(event) => {
                            const value = event.currentTarget.value;
                            setHostel({ ...hostel, type: value })
                            let msg = "";
                            if (value.length === 0)
                                msg = "* field is required";
                            setError({ ...error, type: msg });
                        }}>
                            <option value="male" >Male</option>
                            <option value="female">Female</option>
                        </Form.Select>
                        <span className="text-danger">{error.type}</span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Occupied_Seats">
                        <Form.Label>Occupied Seats</Form.Label>
                        <Form.Control type="number" value={hostel.occupied_seats} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="hostelSeats">
                        <Form.Label>Total Seats</Form.Label>
                        <Form.Control type="number" placeholder='Total number of seats' value = {hostel.total_seats} onChange={(event) => {
                            const value = event.target.value;
                            setHostel({ ...hostel, total_seats: value });
                            //console.log(Number(value) + " ??? "+ Number(hostel.occupied_seats));
                            let msg = "";
                            if (value.length === 0)
                                msg = "* field is required";
                            else if (Number(value) <= 0)
                                msg = "Total number of seats must be greater than zero!";
                            else if (!Number.isInteger(Number(value)))
                                msg = "Invalid number!"
                            else if (Number(value) < Number(hostel.occupied_seats)){
                                msg = "Total seats can't be less than occupied seats!";
                                //console.log(Number.isInteger(Number(value)) + " ??? "+ Number(hostel.occupied_seats))
                            }
                            setError({ ...error, total_seats: msg });
                        }} />
                        <span className="text-danger">{error.total_seats}</span>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="hostelAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control as="textarea" rows={3} value = {hostel.address} placeholder="Address..." onChange={(event) => {
                            const value = event.target.value;
                            setHostel({ ...hostel, address: value });
                            let msg = "";
                            if (value.length === 0)
                                msg = "* field is required";
                            setError({ ...error, address: msg });
                        }} />
                        <span className="text-danger">{error.address}</span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="hostelContact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control type="tel" value = {hostel.contact} placeholder="Office contact number: 01...." onChange={(event) => {
                            const value = event.target.value;
                            setHostel({ ...hostel, contact: value });
                            let msg = "";

                            const regex = /^[0][1][0-9]{9}$/i;
                            if (value.length === 0)
                                msg = "* field is required";
                            else if (value.length !== 11)
                                msg = "Mobile Number must have to be 11 Digits";
                            else if (!regex.test(value))
                                msg = "Invalid format!";

                            setError({ ...error, contact: msg });
                        }} />
                        <span className="text-danger">{error.contact}</span>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update Hostel
                    </Button>
                </Form>
            )}
        </div>
        <br/><br/>
        </>
    )
}
