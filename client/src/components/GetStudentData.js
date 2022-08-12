import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Axios from 'axios';

import UpdateHostel from './UpdateHostel';
import UpdateStudent from './UpdateStudent';

export default function GetStudentData() {

    const [update, setUpdate] = useState(false);
    const [stdData, setStdData] = useState(null);
    const [id, setId] = useState();

    const [error, setError] = useState({
        id: "* field is required",
    })

    const handleSubmit = (event) => {

        event.preventDefault();

        const isEmpty = Object.values(error).every(x => x === null || x === "");

        if (isEmpty) {
            Axios.get("http://localhost:3001/getData/student/info", { params: { reg: id } }).then((response) => {
                if(response.data === "error"){
                    setError({ ...error, id: "Something error !!" });
                } 
                else if(response.data === "notRegistered"){
                    setError({ ...error, id: "This registration number is not registered!" });
                } 
                else {
                    let data = JSON.stringify(response.data[0]);
                    setStdData(data);
                    setUpdate(true);
                }
            }).catch((e) => alert(e));
        }
    };


    return (
        <>
        {!update && (
        <div className="shadow p-4" style={{
            width: "60%",
            border: "3px solid lightGray",
            marginLeft: "auto",
            marginRight: "auto",
        }} >
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="reg">
                        <Form.Label>Registration No</Form.Label>
                        <Form.Control type="number" placeholder="Enter registration number of student..." onChange={(event) => {
                            const value = event.target.value;
                            
                            setId(value);
                            let msg = "";
                            if (value.length === 0)
                                msg = "* field is required";
                            else if (Number(value) <= 0 || !Number.isInteger(Number(value)))
                                msg = "Invalid registration number!"
                                console.log("msg = "+msg);
                            setError({ ...error, id: msg });
                        }}  />
                        <span className="text-danger">{error.id}</span>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Select Student
                    </Button>
                </Form>

        </div> )}
        {update && (<UpdateStudent data={stdData} />)}
        <br/><br/>
        </>
    )
}
