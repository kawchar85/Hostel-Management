import React, { useState, useContext } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Axios from 'axios';

//import { PublicContex } from './PublicContext';

export default function AddHostel() {
    //const [publicData, setPublicData] = useContext(PublicContex);
    const [show, setShow] = useState(false);

    const [hostel, setHostel] = useState({
        id: "-1",
        type: "",
        name: "",
        address: "",
        contact: "",
        total_seats: 0,
    })

    const [error, setError] = useState({
        id: "",
        type: "* field is required",
        name: "* field is required",
        address: "* field is required",
        contact: "* field is required",
        total_seats: "* field is required",
    })

    const handleSubmit = (event) => {

        console.log("now in handlesubmit");
        event.preventDefault();
//         const value = 1 + publicData.hostel.length;
//         setHostel({ ...hostel, id: value });

        //check erro?
        const isEmpty = Object.values(error).every(x => x === null || x === "");
        console.log(isEmpty);
        if (isEmpty) {
            Axios.post("http://localhost:3001/add/hostel", {
                hostel_id: hostel.id,
                name: hostel.name,
                type: hostel.type,
                address: hostel.address,
                contact: hostel.contact,
                total_seats: hostel.total_seats,
                occupied_seats: 0,
            }).then(() => {
                setShow(true);
                //alert("hostel added");
                console.log("hostel added");
            }).catch((e) => alert(e));
        }
        console.log(hostel);

    };

    //hostel ID auto increment hobe.
    //1+hostelListArray readOnly dewa takbe
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
                    Hostel Added successfully...
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
                        <Form.Control type="number" value={420} onChange={(event) => {
                            const value = event.target.value;
                            setHostel({ ...hostel, id: value });
                        }} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="hostelName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Hostel Name" onChange={(event) => {
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
                        <Form.Select onChange={(event) => {
                            const value = event.currentTarget.value;
                            setHostel({ ...hostel, type: value })
                            let msg = "";
                            if (value.length === 0)
                                msg = "* field is required";
                            setError({ ...error, type: msg });
                        }}>
                            <option>Select Type</option>
                            <option value="male" >Male</option>
                            <option value="female">Female</option>
                        </Form.Select>
                        <span className="text-danger">{error.type}</span>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="hostelSeats">
                        <Form.Label>Total Seats</Form.Label>
                        <Form.Control type="number" placeholder='Total number of seats' onChange={(event) => {
                            const value = event.target.value;
                            setHostel({ ...hostel, total_seats: value });
                            let msg = "";
                            if (value.length === 0)
                                msg = "* field is required";
                            else if (Number(value) <= 0)
                                msg = "Total number of seats must be greater than zero!";
                            else if (!Number.isInteger(Number(value)))
                                msg = "Invalid number!"
                            setError({ ...error, total_seats: msg });
                        }} />
                        <span className="text-danger">{error.total_seats}</span>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="hostelAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Address..." onChange={(event) => {
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
                        <Form.Control type="tel" placeholder="Office contact number: 01...." onChange={(event) => {
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
                        Add Hostel
                    </Button>
                </Form>
            )}

        </div>
        <br/><br/>
        </>
    )
}
