import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';


export default function NoticeView(props) {
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
                    {props.notice.Title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {props.notice.Description}

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>{ setModalShow(false); window.location.reload();} }>Cancel</Button>
            </Modal.Footer>
        </Modal>
        
        </>
    )
}
