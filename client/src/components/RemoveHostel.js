import React, { useState, useContext } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Axios from 'axios';

//import { PublicContex } from './PublicContext';

export default function AddHostel() {
    //const [publicData, setPublicData] = useContext(PublicContex);
    const [show, setShow] = useState(false);

    const [hostel, setHostel] = useState({
        id: "",
        finalTxt: "Hostel removed successfully...",
    })

    const [error, setError] = useState({
        id: "* field is required",
    })

    const handleSubmit = (event) => {

        event.preventDefault();

        const isEmpty = Object.values(error).every(x => x === null || x === "");
        if (isEmpty) {
            console.log("dukse"+ hostel.id);
            Axios.get("http://localhost:3001/getData/hostel", { params: { hostel_id: hostel.id } }).then((response) => {
                if(response.data === "error"){
                    console.log("baaal error");
                    setError({ ...error, id: "You have entered an Invalid id!!..." });
                } else {
                    console.log("deleting");
                    Axios.delete(`http://localhost:3001/delete/hostel/${hostel.id}`).then((response) => {
                    if(response.data === "error"){
                        setHostel({ ...hostel, finalTxt: "Opps!! Something wrong!! Try agin later..." });
                    } else {
                        setHostel({ ...hostel, finalTxt: "Hostel removed successfully..." });
                    }
                    setShow(true);
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
                <Alert.Heading>How's it going?!</Alert.Heading>
                <p>
                    {hostel.finalTxt}
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
                        <Form.Control type="number" onChange={(event) => {
                            const value = event.target.value;
                            setHostel({ ...hostel, id: value });
                            let msg = "";
                            if (value.length === 0)
                                msg = "* field is required";
                            else if (Number(value) <= 0 || !Number.isInteger(Number(value)))
                                msg = "Invalid hostel ID!"
                            setError({ ...error, id: msg });
                        }}  />
                        <span className="text-danger">{error.id}</span>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Remove Hostel
                    </Button>
                </Form>
            )}

        </div>
        <br/><br/>
        </>
    )
}
