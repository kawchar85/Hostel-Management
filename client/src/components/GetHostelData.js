import React, { useState, useContext } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Axios from 'axios';

import UpdateHostel from './UpdateHostel';

//import { PublicContex } from './PublicContext';

export default function GetHostelData() {
    //const [publicData, setPublicData] = useContext(PublicContex);

    const [update, setUpdate] = useState(false);
    const [hostelData, setHostelData] = useState(null);
    const [id, setId] = useState();

    const [error, setError] = useState({
        id: "* field is required",
    })

    const handleSubmit = (event) => {

        event.preventDefault();

        const isEmpty = Object.values(error).every(x => x === null || x === "");
        console.log(isEmpty);

        if (isEmpty) {
            console.log("dukse"+ id);
            Axios.get("http://localhost:3001/getData/hostel", { params: { hostel_id: id } }).then((response) => {
                if(response.data === "error"){
                    console.log("baaal error");
                    setError({ ...error, id: "You have entered an Invalid id!!..." });
                } else {
                    let data = JSON.stringify(response.data[0]);
                    console.log("res data");
                    console.log(data);
                    setHostelData(data);
                    console.log("hostel data");
                    console.log(hostelData);

                    setUpdate(true);
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

            {!update && (
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="hostelID">
                        <Form.Label>Hostel ID</Form.Label>
                        <Form.Control type="number" onChange={(event) => {
                            const value = event.target.value;
                            console.log("dhur baal"+value);
                            setId(value);
                            let msg = "";
                            if (value.length === 0)
                                msg = "* field is required";
                            else if (Number(value) <= 0 || !Number.isInteger(Number(value)))
                                msg = "Invalid hostel ID!"
                                console.log("msg = "+msg);
                            setError({ ...error, id: msg });
                        }}  />
                        <span className="text-danger">{error.id}</span>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Select Hostel
                    </Button>
                </Form>
            )}

        </div>
        {update && (<UpdateHostel hostel={hostelData} />)}
        <br/><br/>
        </>
    )
}
