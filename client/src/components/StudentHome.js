import React, { useState } from 'react'
import Axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar } from 'react-bootstrap';

import '../index.css';
import AddHostel from './AddHostel';
import StudentSidebar from './StudentSidebar';

export default function StudentHome() {
    const [query, setQuery] = useSearchParams();
    const myStyle = {
        align: "center",
        marginLeft: "auto",
        marginRight: "auto"
    }
    return(
        <div id= "side">
            <div className='main'>
                <StudentSidebar/>
                <div className="container">
                    <div style={myStyle} >
                    <h2>{query.get("action")}  {query.get("section")}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}