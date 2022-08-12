import React, { useState, useContext } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Axios from 'axios';

//import { PublicContex } from './PublicContext';

export default function AddNotice() {
    //const [publicData, setPublicData] = useContext(PublicContex);
    const [show, setShow] = useState(false);
    const [notice, setNotice] = useState({
        title: "",
        hostel_id: -1,
        description: "",
        priority: 0,
    })

    const [error, setError] = useState({
        title: "* field is required",
        hostel_id: "* field is required",
        description: "* field is required",
        priority: "* field is required",
    })

    const handleSubmit = (event) => {

        event.preventDefault();

        //check error
        const isEmpty = Object.values(error).every(x => x === null || x === "");
        const tm = Date.now();
        if (isEmpty) {
            Axios.post("http://localhost:3001/add/notice", {
                hostel_id: notice.hostel_id,
                title: notice.title,
                description: notice.description,
                priority: notice.priority,
                date_time: tm,
            }).then(() => {
                setShow(true);
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
                    Notice Added successfully...
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
                        <Form.Control type="number" placeholder="put -1 for public notice"  onChange={(event) => {
                            const value = event.target.value;
                            setNotice({ ...notice, hostel_id: value });
                            let msg = "";
                            if (value.length === 0)
                                msg = "* field is required";
                            else if (Number(value) < -1)
                                msg = "Invalid hostel id!!";
                            setError({ ...error, hostel_id: msg });
                        }} />
                        <span className="text-danger">{error.hostel_id}</span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Notice title" onChange={(event) => {
                            const value = event.target.value;
                            setNotice({ ...notice, title: value });
                            let msg = "";
                            if (value.length === 0)
                                msg = "* field is required";
                            else if (value.length < 2)
                                msg = "Too short!";
                            setError({ ...error, title: msg });
                        }} />
                        <span className="text-danger">{error.title}</span>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={4} placeholder="Describe..." onChange={(event) => {
                            const value = event.target.value;
                            setNotice({ ...notice, description: value })
                            let msg = "";
                            if (value.length === 0)
                                msg = "* field is required";
                            setError({ ...error, description: msg });
                        }} />
                        <span className="text-danger">{error.description}</span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="priority">
                        <Form.Label>Priority</Form.Label>
                        <Form.Control type="number" placeholder="Priority of notice..." onChange={(event) => {
                            const value = event.target.value;
                            setNotice({ ...notice, priority: value })
                            let msg = "";

                            if (value.length === 0)
                                msg = "* field is required";
        
                            setError({ ...error, priority: msg });
                        }} />
                        <span className="text-danger">{error.priority}</span>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Notice
                    </Button>
                </Form>
            )}

        </div>
        <br/><br/>
        </>
    )
}
