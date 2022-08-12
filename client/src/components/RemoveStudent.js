import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Axios from 'axios';

export default function RemoveStudent() {
    const [show, setShow] = useState(false);

    const [std, setStd] = useState({
        reg: 0,
        finalTxt: "Hostel removed successfully...",
    })

    const [error, setError] = useState({
        id: "* field is required",
    })

    const handleSubmit = (event) => {

        event.preventDefault();

        const isEmpty = Object.values(error).every(x => x === null || x === "");
        if (isEmpty) {
            Axios.get("http://localhost:3001/getData/student", { params: { reg: std.reg } }).then((response) => {
                if(response.data === "error"){
                    setStd({ ...std, finalTxt: "Opps!! Something wrong!! Try agin later..." });
                }
                else if(response.data === "notRegistered"){
                    setError({ ...error, id: "You have entered an Invalid registration number!!..." });
                }
                else {
                    Axios.delete(`http://localhost:3001/delete/students/${std.reg}`).then((response) => {
                    if(response.data === "error"){
                        setStd({ ...std, finalTxt: "Opps!! Something wrong!! Try agin later..." });
                    } else {
                        setStd({ ...std, finalTxt: "Student removed successfully..." });
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
                    {std.finalTxt}
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
                    <Form.Group className="mb-3" controlId="reg">
                        <Form.Label>Registration No</Form.Label>
                        <Form.Control type="number" onChange={(event) => {
                            const value = event.target.value;
                            setStd({ ...std, reg: value });
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
                        Remove Stdent
                    </Button>
                </Form>
            )}

        </div>
        <br/><br/>
        </>
    )
}
