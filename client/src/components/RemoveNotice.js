import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Axios from 'axios';
import Moment from 'moment';
import Modal from 'react-bootstrap/Modal';

//import { PublicContex } from './PublicContext';

export default function RemoveNotice(props) {
    //const [publicData, setPublicData] = useContext(PublicContex);
    const [modalShow, setModalShow] = useState(true);

    const handleDelete = () => {

        Axios.delete(`http://localhost:3001/delete/notice/${formatDate(props.notice.DateTime)}&${props.notice.Title}`).then((response) => {
            if(response.data === "error"){
                alert("Opps!! Something wrong!! Try agin later...");
                setModalShow(false); window.location.reload();
            } else {
                alert("Notice removed successfully...");
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
                    {getLess(props.notice.Title, 15)}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {getLess(props.notice.Description, 50)}

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>{ setModalShow(false); window.location.reload();} }>Cancel</Button>
                <Button variant="danger" onClick={ handleDelete} >Delete</Button>
            </Modal.Footer>
        </Modal>
        
        </>
    )
}
