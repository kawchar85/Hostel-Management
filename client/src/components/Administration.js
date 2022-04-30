//for test 


import React, { useState } from 'react'
import { Form, Collapse, Button } from 'react-bootstrap';
import Axios from 'axios';

export default function Administration() {

    const [reg, setReg] = useState(0);
    const [name, setName] = useState("");
    const [dept, setDept] = useState("");
    const [merit, setMerit] = useState(0);
    const [email, setEmail] = useState("");
    const [hostel_id, setHostel_ID] = useState(-1);
    const [room_id, setRoom_ID] = useState(-1);
    const [phone, setPhone] = useState("");
    const [role_id, setRole_ID] = useState(2);
    const [password, setPassword] = useState("");


    const addStudentInfo = () => {
        Axios.post("http://localhost:3001/add/students", {
            name: name,
            reg: reg,
            dept: dept,
            merit: merit,
            email: email,
            phone: phone,
            hostel_id: hostel_id,
            room_id: room_id,
            role_id: 2,

        }).then(() => {
            alert("student added");
            console.log("std added");
        });

        Axios.post("http://localhost:3001/add/login", {
            email: email,
            role_id: 2,
            password: password,

        }).then(() => {
            alert("login info added");
            console.log("login added");

        });
    }

    const updateStudentInfo = () => {
        Axios.put("http://localhost:3001/update/students", {
            reg: "2018331099",
            hostel_id: "55",
            room_id: "605",

        }).then(() => {
            console.log("std updated");
        });
    }

    const deleteStudent = (reg) => {
        Axios.delete(`http://localhost:3001/delete/students/${reg}`).then(() => {
            console.log("std deleted");
        });
};

return (
    <div className='m-2' >
        
        Add Student?
        <div>
            <form >
                <div>
                    <label>Reg:</label>
                    <input
                        type="number"
                        onChange={(event) => {
                            setReg(event.target.value);
                        }}
                        required
                    />
                </div>
                <br />
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                        required
                    />
                </div>

                <br />
                <div>
                    <label>Dept:</label>
                    <input
                        type="text"
                        onChange={(event) => {
                            setDept(event.target.value);
                        }}
                        required
                    />
                </div>

                <br />
                <div>
                    <label>Merit:</label>
                    <input
                        type="number"
                        onChange={(event) => {
                            setMerit(event.target.value);
                        }}
                        required
                    />
                </div>

                <br />
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        required
                    />
                </div>
                <br />
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        required
                    />
                </div>

                <br />
                <div>
                    <label>Phone:</label>
                    <input
                        type="phone"
                        onChange={(event) => {
                            setPhone(event.target.value);
                        }}
                        required
                    />
                </div>
                <br />
                <div>

                    <button type="submit" onClick={addStudentInfo}>Add</button>
                </div>
            </form>

        </div>

    </div>
);
}
