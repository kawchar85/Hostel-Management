import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import validator from 'validator';
import Axios from 'axios';

export default function AdminReg () {

    const [admin, setAdmin] = useState({
        name: "",
        phone:"",
        email:"",
        hostel_id:"",
        designation:"",
        role_id: ""
    });

    const [error, setError] = useState({
        name: "* field is required",
        phone: "* field is required",
        mail: "* field is required",
        hostel: "* field is required",
        designation: "* field is required",
        role: "* field is required",
    });

    const addAdmin =()=> {
        console.log("now in handlesubmit");
        const isEmpty = Object.values(error).every(x => x === null || x === "");
        console.log(isEmpty);
        
        Axios.post("http://localhost:3001/add/administration", {
            "name":admin.name,
            "phone":admin.phone,
            "email":admin.email,
            "hostel_id":admin.hostel_id,
            "designation":admin.designation,
            "role_id":admin.role_id,
        }).then( ()=> {
            console.log("look it works!!");
        }).catch((e)=>{
            alert("baal");
            console.log("hoilona");
        });
    };

    return(
        <>
        <div className="shadow p-4" style={{
            width: "60%",
            border: "3px solid lightGray",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "30px",
        }} >

        

        <Form onSubmit={addAdmin}>
            <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" onChange={(event) => {
                const value = event.target.value;
                setAdmin({ ...admin, Name: value });
                let msg = "";
                if (value.length === 0)
                    msg = "* field is required";
                else if (value.length < 2)
                    msg = "Too short!";
                setError({...error, name: msg });
            }} />
            <span className="text-danger">{error.name}</span>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Contact</Form.Label>
            <Form.Control type="tel" placeholder="Contact number: 01...." onChange={(event) => {
            const value = event.target.value;
         //   setHostel({ ...hostel, contact: value });
            let msg = "";
            const regex = /^[0][1][0-9]{9}$/i;
            if (value.length === 0)
                msg = "* field is required";
            else if (value.length !== 11)
                msg = "Mobile Number must have to be 11 Digits";
            else if (!regex.test(value))
                msg = "Invalid format!";
                setError({ ...error, phone: msg });
            }} />
            <span className="text-danger">{error.phone}</span>
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Contact</Form.Label>
            <Form.Control type="email" placeholder="example@something.com" onChange={(event) => {
            const value = event.target.value;
         //   setHostel({ ...hostel, contact: value });
            let msg = "";
    
            if (value.length === 0)
                msg = "* field is required";
            else if(!validator.isEmail(value))
                msg = "Invalid format!";
                setError({ ...error, mail: msg });
            }} />
            <span className="text-danger">{error.mail}</span>
            </Form.Group>
        
        </Form>

        <Form.Group className="mb-3">
            <Form.Label>Hostel</Form.Label>
            <Form.Select onChange={(event) => {
            const value = event.currentTarget.value;
            //                setHostel({ ...hostel, type: value })
            let msg = "";
            if (value.length === 0)
            msg = "* field is required";
            setError({ ...error, hostel: msg });
            }}>
            <option>Select hostel</option>
                <option value="1" >1st hall</option>
                <option value="2">mujib hall</option>
            </Form.Select>
            <span className="text-danger">{error.hostel}</span>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Designation</Form.Label>
            <Form.Select onChange={(event) => {
            const value = event.currentTarget.value;
            //                setHostel({ ...hostel, type: value })
            let msg = "";
            if (value.length === 0)
            msg = "* field is required";
            setError({ ...error, designation: msg });
            }}>
            <option>Select designation</option>
                <option value="1" >Provost</option>
                <option value="2">Assistant Provost</option>
                <option value="3">Supervisor</option>
            </Form.Select>
            <span className="text-danger">{error.designation}</span>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select onChange={(event) => {
            const value = event.currentTarget.value;
            //                setHostel({ ...hostel, type: value })
            let msg = "";
            if (value.length === 0)
            msg = "* field is required";
            setError({ ...error, role: msg });
            }}>
            <option>Select designation</option>
                <option value="1" >Cleaning</option>
                <option value="2">Seat Allocation</option>
                <option value="3">Supervison</option>
            </Form.Select>
            <span className="text-danger">{error.role}</span>
        </Form.Group>


        <Button variant="primary" type="submit" onClick={addAdmin}>
                        Submit
                    </Button>

        </div>

        </>
    )

}