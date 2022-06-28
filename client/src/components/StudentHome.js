import React, { useState } from 'react'
import Axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar } from 'react-bootstrap';
import StudentSidebar from './StudentSidebar';

export default function StudentHome() {
    return(
        <div>
        <Navbar/>
        <StudentSidebar/>


        </div>
    )
}