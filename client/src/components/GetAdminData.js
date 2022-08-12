import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Axios from 'axios';
import validator from 'validator';

import UpdateHostel from './UpdateHostel';
import UpdateStudent from './UpdateStudent';
import UpdateAdmin from './UpdateAdmin';

export default function GetAdminData() {

    const [update, setUpdate] = useState(false);
    const [adminData, setAdminData] = useState(null);
    const [id, setId] = useState();

    const [error, setError] = useState({
        id: "* field is required",
    })

    const handleSubmit = (event) => {

        event.preventDefault();

        const isEmpty = Object.values(error).every(x => x === null || x === "");

        if (isEmpty) {
            Axios.get("http://localhost:3001/getData/admin", { params: { mail: id } }).then((response) => {
                if (response.data === "error") {
                    setError({ ...error, id: "Something error !!" });
                }
                else if (response.data.length === 0) {
                    setError({ ...error, id: "This email is not registered!" });
                }
                else {
                    let data = JSON.stringify(response.data[0]);
                    setAdminData(data);
                    setUpdate(true);
                    console.log(data);
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
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Mail address" onChange={(event) => {
                                const value = event.target.value;

                                let msg = "";
                                if (validator.isEmail(value)) {
                                    try {
                                        setId(value);
                                        setError({ ...error, id: "" })
                                    }
                                    catch (e) {
                                        console.log(e);
                                    }
                                }
                                else {
                                    if (value.length === 0)
                                        msg = "* field is required";
                                    else
                                        msg = "Invalid Mail!!"
                                    setError({ ...error, id: msg });
                                }
                            }} />
                            <span className="text-danger">{error.id}</span>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Select Admin
                        </Button>
                    </Form>

                </div>)}
            {update && (<UpdateAdmin data={adminData} />)}
            <br /><br />
        </>
    )
}
