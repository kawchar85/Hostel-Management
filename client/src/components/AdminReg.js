import React, { useState,useEffect, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import validator from 'validator';
import Axios from 'axios';

export default function AdminReg () {

    const [admin, setAdmin] = useState({
        name: "",
        password:"",
        phone:"",
        email:"",
        hostel_id:"",
        designation:"",
        role_id: "",
        show: false
    });

    const [error, setError] = useState({
        name: "* field is required",
        pass: "* field is required",
        phone: "* field is required",
        mail: "* field is required",
        hostel: "* field is required",
        designation: "* field is required",
        role: "* field is required",
    });
    const [hostel, setHostel] = useState({
        hostels : []
    })


    const getHostels = async() => {
        const response= await Axios.get("http://localhost:3001/getData/", { params: { table: "hostel" } }).then((response) => {
            let tmp = {hostels : response.data};
            setHostel({hostels : response.data} , ()=>{
                console.log(hostel.hostels);
            });
        });
    };

    useEffect( ()=>{
        console.log("hi");
        getHostels();
     }, [] );

    const addAdmin =()=> {

        Axios.get("http://localhost:3001/getData/login", { params: { mail: admin.email } }).then((response) => {
            console.log(response.data);
            if(response.data === "notRegistered")
            {
                let cnt = 0;
                const isEmpty = Object.values(error).every(x => x === null || x === "");
                if(isEmpty) {
                Axios.post("http://localhost:3001/add/administration", {
                "name":admin.name,
                "phone":admin.phone,
                "email":admin.email,
                "hostel_id":admin.hostel_id,
                "designation":admin.designation,
                "role_id":admin.role_id,
            }).then( ()=> {
                console.log("look it works!!");
                cnt++;
                    if (cnt === 2) {
                        setAdmin({ ...admin, show: true });
                    }
            }).catch((e)=>{
                alert("Something went wrong, try again");
                console.log(e);
            });
            Axios.post("http://localhost:3001/add/login", {
                "password":admin.password,
                "role_id": admin.role_id,
                "email": admin.email
            }).then(()=> {
                console.log("login added");
                cnt++;
                    if (cnt === 2) {
                        setAdmin({ ...admin, show: true });
                    }
            } ); 
            }
            else alert("No field can remain empty");
            }
            else if(response.data === "Registered") {
                alert("This registration number is in use!");
            }
            else {
                alert("Something went wrong, try again!");
            }
        }).catch((e) => alert(e));
        console.log("now in handlesubmit");
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
        <Alert show={admin.show} variant="success">
                            <Alert.Heading>How's it going?!</Alert.Heading>
                            <p>
                                Admin Added successfully...
                            </p>
                            <hr />
                            <div className="d-flex justify-content-end">
                                <Button onClick={() => { setAdmin({ ...admin, show: false }); window.location.href = "http://localhost:3000/Home"; }} variant="outline-success">
                                    Close!
                                </Button>
                            </div>
                        </Alert>

                        {!admin.show && (
                            <>

        <Form onSubmit={addAdmin}>
        <div style={{
            textShadow: "#f9fafb 0px 1px 0px, #0d6efd 3px 3px 3px",
            textAlign: "center",
            color: "#666",
            margin: "0 0 30px 0",
            letterSpacing: "4px",
            font: "normal 30px/2 Segoe Print,Verdana, Helvetica",
            position: "relative",
        }} > <h4>REGISTER ADMIN </h4> </div>
            <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" onChange={(event) => {
                const value = event.target.value;
                setAdmin({ ...admin, name: value });
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
            setAdmin({ ...admin, phone: value });
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
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="example@something.com" onChange={(event) => {
            const value = event.target.value;
            setAdmin({ ...admin, email: value });
            let msg = "";
    
            if (value.length === 0)
                msg = "* field is required";
            else if(!validator.isEmail(value))
                msg = "Invalid format!";
                setError({ ...error, mail: msg });
            }} />
            <span className="text-danger">{error.mail}</span>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" placeholder="password" onChange={(event) => {
                const value = event.target.value;
                setAdmin({ ...admin, password: value });
                let msg = "";
        
                if (value.length === 0)
                    msg = "* field is required";
                else if(value.length < 5)
                    msg = "Password should be at least 5 digit long!";
                    setError({ ...error, pass: msg });
                }}/>
            <span className="text-danger">{error.pass}</span>
            </Form.Group>
        
        </Form>

        <Form.Group className="mb-3">
            <Form.Label>Hostel</Form.Label>
            <Form.Select onChange={(event) => {
            const value = event.currentTarget.value;
            setAdmin({ ...admin, hostel_id: value })
            let msg = "";
            if (value.length === 0)
            msg = "* field is required";
            setError({ ...error, hostel: msg });
            }}>
            {hostel.hostels.map((option, index) => (
                <option key={index} value={option.Hostel_ID}>
                    {option.Name}
                </option>
            ))}
            </Form.Select>
            <span className="text-danger">{error.hostel}</span>
        </Form.Group>

        <Form.Group className="mb-3">
                            <Form.Label>Designation</Form.Label>
                            <Form.Select  onChange={(event) => {
                                const value = event.currentTarget.value;
                        
                                if(value === "1") setAdmin({ ...admin, designation: value, role_id: 20 });
                                else setAdmin({ ...admin, designation: value });
                                console.log("kochu");
                                console.log(value);
                                
                                let msg = "";
                                if (value.length === 0)
                                    msg = "* field is required";
                                    if(value === "1"){
                                        setError({ ...error, designation: msg, role:""});
                                    }else{
                                        setError({ ...error, designation: msg });
                                    }
                            }}>
                                <option>Select designation</option>
                                <option value="1" >Provost</option>
                                <option value="2">Assistant Provost</option>
                                <option value="3">Supervisor</option>
                            </Form.Select>
                            <span className="text-danger">{error.designation}</span>
                        </Form.Group>
                        {admin.designation !=="1" && (<>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select onChange={(event) => {
                                const value = event.currentTarget.value;
                                setAdmin({ ...admin, role_id: value })
                                let msg = "";
                                if (value.length === 0)
                                    msg = "* field is required";
                                setError({ ...error, role: msg });
                            }}>
                                <option>Select designation</option>
                                <option value="14" >Cleaning</option>
                                
                                <option value="16">Supervison</option>
                                <option value="15">Seat Allocation</option>
                            </Form.Select>
                            <span className="text-danger">{error.role}</span>
                        </Form.Group>
                        </>
                        )}


        <Button variant="primary" type="submit" onClick={addAdmin}>
                        Submit
                    </Button>
                    <p className="text-right my-4">
                                <a href="http://localhost:3000/Signup">Not an admin??</a>
                            </p>

                            </>)}

        </div>

        </>
    )

}