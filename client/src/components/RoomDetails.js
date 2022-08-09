import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function RoomDetails(props) {

    console.log(props);
return (
    <>

<Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Room Details
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Room #{props.id}</h4>
            <p>

            Hotel id diye query kore student list ber korbo(useEffect). 
            Info in each card:
            Std name: .....
            Reg: ....
            Dept: ....
            Phone ....
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
    </Modal>

    </>

)
}
