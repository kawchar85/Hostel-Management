import React, { useState, useEffect, useContext } from 'react'
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import SingleStudent from './SingleStudent';
import { PublicContex } from './PublicContext';

export default function RoomDetails(props) {

    const [publicData, setPublicData] = useContext(PublicContex);
    const [student, setStudent] = useState([]);
    
    const getData = async () => {
    
        await Axios.get("http://localhost:3001/getData/student/room", { params: { hostel_id: props.hostel_id, room_id: props.room_id } }).then((response) => {
            if(response.data === "error"){
                alert("Something erroe!!");
            } else {
                setStudent(response.data);
            }
        }).catch((e) => alert(e));
    
    };

    useEffect(() => {
        console.log("loading room details");
        
        getData();

    }, []);
    useEffect(() => {
        console.log("data in room details");
        console.log(student);
    }, [student]);

    const handleClose = () => {
        console.log("closing..."+props.id);
        const arr = publicData.modalShow;
        arr[props.id] = false;
        setPublicData({...publicData,modalShow: arr});
    };
return (
    <React.Fragment key={props.id}>

        <Modal
            show={publicData.modalShow[props.id]}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Room Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Room #{props.room_id}</h4>

                {
                        student.map((val, idx) => {
                            return <SingleStudent data={val} key = {idx} />
                        })
                }
                {!student.length&&(<p>This Room is empty</p>)}

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>

        </React.Fragment>

)
}
