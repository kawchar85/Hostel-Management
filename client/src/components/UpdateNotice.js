import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Axios from 'axios';
import Moment from 'moment';
import Modal from 'react-bootstrap/Modal';

//import { PublicContex } from './PublicContext';

export default function UpdateNotice(props) {
    //const [publicData, setPublicData] = useContext(PublicContex);

    console.log("checking...");
    console.log(typeof props.notice.DateTime);
    console.log(props.notice);
    const [show, setShow] = useState(false);
    const [finalMsg, setFinalMsg] = useState("");

    const [notice, setNotice] = useState({
        title : props.notice.Title,
        hostel_id : props.notice.Hostel_ID,
        priority : props.notice.Priority,
        description : props.notice.Description,
    })

    const [error, setError] = useState({
        title : "",
        hostel_id : "",
        priority : "",
        description : "",
    })

    const handleSubmit = (event) => {

        event.preventDefault();
        //check erro?
        const isEmpty = Object.values(error).every(x => x === null || x === "");

        if (isEmpty) {

                console.log(props.notice.DateTime+" time..."+formatDate(props.notice.DateTime));
                Axios.put("http://localhost:3001/update/notice", {
                    hostel_id: notice.hostel_id,
                    title: notice.title,
                    description: notice.description,
                    priority: notice.priority,
                    date_time: formatDate(props.notice.DateTime),
                    old_title: props.notice.Title,
                }).then((response) => {
                    if(response.data === "error"){
                        setFinalMsg("Something Error!!");
                    } else {
                        setFinalMsg("Notice Updated successfully...");
                    }
                    setShow(true);
                }).catch((e) => alert(e));
                
        }

    };

    const formatDate = (dt) => {
        if(dt === "0000-00-00 00:00:00") return dt;
        else return(Moment(dt).format('YYYY-MM-DD HH:mm:ss'));
    }

    const [modalShow, setModalShow] = useState(true);

    return (
        <>

        <Modal
            show={modalShow}
            onHide={()=>{ setModalShow(false); window.location.reload();} }
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Notice Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

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
                                <Form.Label>Date Time</Form.Label>
                                <Form.Control type="text" value={props.notice.DateTime} readOnly />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="hostelID">
                                <Form.Label>Hostel ID</Form.Label>
                                <Form.Control type="number" value={notice.hostel_id} placeholder="put -1 for public notice"  onChange={(event) => {
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
                                <Form.Control type="text" value={notice.title} placeholder="Notice title" onChange={(event) => {
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
                                <Form.Control as="textarea" rows={4} value={notice.description} placeholder="Describe..." onChange={(event) => {
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
                                <Form.Control type="number" value={notice.priority} placeholder="Priority of notice..." onChange={(event) => {
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
                                Update Notice
                            </Button>
                        </Form>
                    )}
                </div>        

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>{ setModalShow(false); window.location.reload();} }>Close</Button>
            </Modal.Footer>
        </Modal>

        
        <br/><br/>
        </>
    )
}
