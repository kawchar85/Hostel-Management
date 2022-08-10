import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SingleStudent from './SingleStudent';


export default function RoomDetails(props) {

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
return (
    <>

        <Modal
            show={props.show(props.id)}
            onHide={props.onHide(props.id)}
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
                <p>

                Hotel id diye query kore student list ber korbo(useEffect). 
                Info in each card:
                Std name: .....
                Reg: ....
                Dept: ....
                Phone ....
                </p>

                {
                        student.map((val) => {
                            return <SingleStudent data={val} />
                        })
                }

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide(props.id)}>Close</Button>
            </Modal.Footer>
        </Modal>

    </>

)
}
