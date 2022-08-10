//for test 


import React, { useState, useContext } from 'react'
import Axios from 'axios';
import AdministrationSidebar from './AdministrationSidebar';

import '../index.css';
import { useSearchParams } from 'react-router-dom';
import AddHostel from './AddHostel';
import GetHostelData from './GetHostelData';
import SwapManual from './SwapManual';

import { PublicContex } from './PublicContext';

export default function Administration() {

    const [publicData, setPublicData] = useContext(PublicContex);
    // console.log(publicData);
    // setPublicData({...publicData,refrash: true});
    // console.log(publicData);

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


    const [query, setQuery] = useSearchParams();

    function addStudentInfo() {
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

    const myStyle = {
        align: "center",
        marginLeft: "auto",
        marginRight: "auto"
    }

    //will send current users' role id in sidebar
    return (
        <div id="side">
            <div className="main">
                <AdministrationSidebar />
                <div className="container">
                    <div style={myStyle} >
                    <h2>{query.get("action")}  {query.get("section")}</h2>
                    </div>

                    <SwapManual />


                </div>
            </div>
        </div>
    );
}
