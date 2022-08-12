import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Axios from 'axios';
import validator from 'validator';

export default function RemoveAdmin() {
    const [show, setShow] = useState(false);

    const [id, setId] = useState();

    const [error, setError] = useState({
        id: "* field is required",
    })

    const handleSubmit = (event) => {

        event.preventDefault();

        const isEmpty = Object.values(error).every(x => x === null || x === "");
        if (isEmpty) {
            Axios.get("http://localhost:3001/getData/admin", { params: { mail: id } }).then((response) => {
                if(response.data === "error"){
                    setError({... error, id: "Opps!! Something wrong!! Try agin later..."});
                }
                else if (response.data.length === 0) {
                    setError({ ...error, id: "This email is not registered!" });
                }    
                else {
                    Axios.delete(`http://localhost:3001/delete/admin/${id}`).then((response) => {
                    if(response.data === "error"){
                        setError({... error, id: "Opps!! Something wrong!! Try agin later..."});
                    } else {
                        setShow(true);
                    }
                    
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
                    Admin removed successfully...
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
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Mail address" onChange={(event) => {
                        const value = event.target.value;

                        let msg = "";
                        if (validator.isEmail(value)) {
                            try {
                                setId(value);
                                setError({ ...error, id: "" })
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                        else {
                            if (value.length === 0)
                                msg = "* field is required";
                            else
                                msg = "Invalid Mail!!"
                            setError({ ...error, id: msg });
                        }
                    }} />
                    <span className="text-danger">{error.id}</span>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Remove Admin
                </Button>
            </Form>
            )}

        </div>
        <br/><br/>
        </>
    )
}
