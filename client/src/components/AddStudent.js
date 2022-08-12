import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useContext } from "react";
import { Alert, Container, Form, Button } from 'react-bootstrap';
import validator from 'validator';
import Axios from 'axios';
import { Component } from 'react';

class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            reg: "",
            reg_err: "* field is required",
            std_name: "",
            std_name_err: "* field is required",
            password: "",
            password_err: "* field is required",
            dept: "",
            dept_err: "* field is required",
            merit: "",
            merit_err: "* field is required",
            email: "",
            email_err: "* field is required",
            hostelID: "",
            hostelID_err: "* field is required",
            roomID: "",
            roomID_err: "* field is required",
            phone: "",
            phone_err: "* field is required",
            roleID: "1",
            roleTag: "Student",
            guardian_name: "",
            guardian_name_err: "* field is required",
            guardian_address: "",
            guardian_address_err: "* field is required",
            guardian_phone: "",
            guardian_phone_err: "* field is required",
            hostels: [],
            show: false
        });
    };
    getHostels = async () => {
        await Axios.get("http://localhost:3001/getData/", { params: { table: "hostel" } }).then((response) => {
            let tmp = { hostels: response.data };
            this.setState({ hostels: response.data }, () => {
                console.log(this.state);
            });
        });
    };
    /* handleChange=(e)=>{
        this.setState({
            ...this.state,
            [e.target.id]:e.target.value
        })
    }*/
    addStudent = () => {

        Axios.get("http://localhost:3001/getData/student", { params: { reg: this.state.reg } }).then((response) => {
            if (response.data === "notRegistered") {
                let cnt = 0;
                Axios.post("http://localhost:3001/add/students", {
                    "reg": this.state.reg,
                    "name": this.state.std_name,
                    "dept": this.state.dept,
                    "merit": this.state.merit,
                    "email": this.state.email,
                    "hostel_id": this.state.hostelID,
                    "room_id": this.state.roomID,
                    "phone": this.state.phone,
                    "role_id": this.state.roleID
                }).then(() => {
                    cnt++;
                    if (cnt === 4) {
                        this.setState({ ...this.state, show: true });
                    }
                });
                Axios.post("http://localhost:3001/add/guardian_info", {
                    "name": this.state.guardian_name,
                    "address": this.state.guardian_address,
                    "phone": this.state.guardian_phone
                }).then(() => {
                    cnt++;
                    if (cnt === 4) {
                        this.setState({ ...this.state, show: true });
                    }
                });
                Axios.post("http://localhost:3001/add/guardian", {
                    "std_reg": this.state.reg,
                    "phone": this.state.guardian_phone
                }).then(() => {
                    cnt++;
                    if (cnt === 4) {
                        this.setState({ ...this.state, show: true });
                    }
                });
                Axios.post("http://localhost:3001/add/login", {
                    "password": this.state.password,
                    "role_id": this.state.roleID,
                    "email": this.state.email
                }).then(() => {
                    cnt++;
                    if (cnt === 4) {
                        this.setState({ ...this.state, show: true });
                    }
                });
            }
            else if (response.data === "Registered") {
               
                alert("This registration number already exists!");
            }
            else {
                alert("Something went wrong! try again!");
            }
            console.log(response.data);
        }).catch((e) => alert(e));



    };
    componentDidMount() {
        this.getHostels();
    }
    render() {
        return (
            <>


                <div className="row justify-content-center align-items-center">
                    <div className="shadow p-4" style={{
                        width: "60%",
                        border: "3px solid lightGray",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }} >

                        <Alert show={this.state.show} variant="success">
                            <Alert.Heading>Hostel Management Says</Alert.Heading>
                            <p>
                                Student Added successfully...
                            </p>
                            <hr />
                            <div className="d-flex justify-content-end">
                                <Button onClick={() => { this.setState({ ...this.state, show: false }); window.location.reload(); }} variant="outline-success">
                                    Close!
                                </Button>
                            </div>
                        </Alert>

                        {!this.state.show && (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Registration No</Form.Label>
                                    <Form.Control type="text" placeholder="Reg No" onChange={(event) => {
                                        const value = event.target.value;
                                        let msg = "";
                                        if (value.length === 0)
                                            msg = "* field is required";
                                        else if (value.length !== 10)
                                            msg = "Registration number is ten digit!";
                                        this.setState({ ...this.state, reg: value, reg_err: msg });
                                    }} />
                                    <span className="text-danger">{this.state.reg_err}</span>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="text" placeholder="Password" onChange={(event) => {
                                        const value = event.target.value;
                                        let msg = "";
                                        if (value.length === 0)
                                            msg = "* field is required";
                                        else if (value.length < 5)
                                            msg = "Password should be at least 5 digit!";
                                        this.setState({ ...this.state, password: value, password_err: msg });
                                    }} />
                                    <span className="text-danger">{this.state.password_err}</span>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name" onChange={(event) => {
                                        const value = event.target.value;
                                        let msg = "";
                                        if (value.length === 0)
                                            msg = "* field is required";
                                        this.setState({ ...this.state, std_name: value, std_name_err: msg });
                                    }} />
                                    <span className="text-danger">{this.state.std_name_err}</span>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Department</Form.Label>
                                    <select className="form-select" onChange={(event) => {
                                        const value = event.currentTarget.value;
                                        console.log(value);
                                        let msg = "";
                                        if (value.length === 0) msg = "* field is required";
                                        this.setState({ ...this.state, dept: value, dept_err: msg });
                                    }}>
                                        <option selected>Department</option>
                                        <option value="1">CSE</option>
                                        <option value="2">EEE</option>
                                        <option value="3">SWE</option>

                                    </select>
                                    <span className="text-danger">{this.state.dept_err}</span>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Merit Position</Form.Label>
                                    <Form.Control type="text" placeholder="Merit position" onChange={(event) => {
                                        const value = event.target.value;
                                        let msg = "";
                                        if (value.length === 0)
                                            msg = "* field is required";
                                        this.setState({ ...this.state, merit: value, merit_err: msg });
                                    }} />
                                    <span className="text-danger">{this.state.merit_err}</span>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Mail address" onChange={(event) => {
                                        const value = event.target.value;
                                        let msg = "";

                                        if (validator.isEmail(value)) {
                                            try {
                                                this.setState({ ...this.state, email: value, email_err: msg });
                                            }
                                            catch (e) {
                                                console.log(e);
                                            }
                                        }
                                        else {
                                            if (value.length === 0) msg = "* field is required";
                                            else msg = "Invalid Mail!!"
                                            this.setState({ ...this.state, email_err: msg });
                                            console.log(value);
                                        }
                                    }} />
                                    <span className="text-danger">{this.state.email_err}</span>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Hostel</Form.Label>
                                    <select className="form-select" onChange={(event) => {
                                        const value = event.currentTarget.value;
                                        console.log(value);
                                        let msg = "";
                                        if (value.length === 0) msg = "* field is required";
                                        this.setState({ ...this.state, hostelID: value, hostelID_err: msg });
                                    }}>
                                        {this.state.hostels.map((option, index) => (
                                            <option key={index} value={option.Hostel_ID}>
                                                {option.Name}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="text-danger">{this.state.hostelID_err}</span>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Room Number</Form.Label>
                                    <Form.Control type="text" placeholder="Room" onChange={(event) => {
                                        const value = event.target.value;
                                        let msg = "";
                                        if (value.length === 0)
                                            msg = "* field is required";
                                        this.setState({ ...this.state, roomID: value, roomID_err: msg });
                                    }} />
                                    <span className="text-danger">{this.state.roomID_err}</span>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control type="text" placeholder="phone" onChange={(event) => {
                                        const value = event.target.value;
                                        let msg = "";
                                        if (value.length === 0) msg = "* filed is required";
                                        if (value.length !== 11)
                                            msg = "Phone number should be 11 digit!";
                                        this.setState({ ...this.state, phone: value, phone_err: msg });
                                    }} />
                                    <span className="text-danger">{this.state.phone_err}</span>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Guardian name</Form.Label>
                                    <Form.Control type="text" placeholder="guardian name" onChange={(event) => {
                                        const value = event.target.value;
                                        let msg = "";
                                        if (value.length === 0) msg = "* filed is required";
                                        this.setState({ ...this.state, guardian_name: value, guardian_name_err: msg });
                                    }} />
                                    <span className="text-danger">{this.state.guardian_name_err}</span>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Guardian address</Form.Label>
                                    <Form.Control type="text" placeholder="guardian address" onChange={(event) => {
                                        const value = event.target.value;
                                        let msg = "";
                                        if (value.length === 0) msg = "* filed is required";
                                        this.setState({ ...this.state, guardian_address: value, guardian_address_err: msg });
                                    }} />
                                    <span className="text-danger">{this.state.guardian_address_err}</span>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Guardian_phone</Form.Label>
                                    <Form.Control type="text" placeholder="guardian phone" onChange={(event) => {
                                        const value = event.target.value;
                                        let msg = "";
                                        if (value.length === 0) msg = "* filed is required";
                                        if (value.length !== 11)
                                            msg = "Phone number should be 11 digit!";
                                        this.setState({ ...this.state, guardian_phone: value, guardian_phone_err: msg });
                                    }} />
                                    <span className="text-danger">{this.state.guardian_phone_err}</span>
                                </Form.Group>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={this.addStudent}
                                >
                                    Submit
                                </button>
                                <p className="text-right my-4">
                                    <a href="http://localhost:3000/AdminReg">Not a student??</a>
                                </p>
                            </>
                        )}
                    </div>
                </div>

            </>
        )
    }

}

export default AddStudent;