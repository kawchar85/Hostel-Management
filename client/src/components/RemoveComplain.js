import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Moment from 'moment';

export default function RemoveComplain(props) {
    const [modalShow, setModalShow] = useState(true);

    const handleDelete = () => {

        Axios.delete(`http://localhost:3001/delete/complain/${formatDate(props.complain.DateTime)}&${props.complain.Std_reg}`).then((response) => {
            if(response.data === "error"){
                alert("Opps!! Something wrong!! Try agin later...");
                setModalShow(false); window.location.reload();
            } else {
                alert("Complain removed successfully...");
                setModalShow(false); window.location.reload();
            }
        }).catch((e) => alert(e));
        setModalShow(false); window.location.reload();
    }
    const getLess = (s, x)=>{
        if(s.length<x) return s;
        else return s.substring(0,x-3)+"...";
    }
    const formatDate = (dt) => {
        if(dt === "0000-00-00 00:00:00") return dt;
        else return(Moment(dt).format('YYYY-MM-DD HH:mm:ss'));
    }
    return (
        <>

        <Modal
            show={modalShow}
            onHide={()=>{ setModalShow(false); window.location.reload();} }
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {getLess(props.complain.Title, 15)}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {getLess(props.complain.Description, 50)}

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>{ setModalShow(false); window.location.reload();} }>Cancel</Button>
                <Button variant="danger" onClick={ handleDelete} >Delete</Button>
            </Modal.Footer>
        </Modal>
        
        </>
    )
}
