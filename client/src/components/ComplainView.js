import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';


export default function ComplainView(props) {
    const [modalShow, setModalShow] = useState(true);
    console.log("complain view");
    console.log(props.complain);
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
                    {props.complain.Title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {props.complain.Description}
                <hr />
                <img src={props.complain.Image} width="100%" height="40%"/>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>{ setModalShow(false); window.location.reload();} }>Cancel</Button>
            </Modal.Footer>
        </Modal>
        
        </>
    )
}
