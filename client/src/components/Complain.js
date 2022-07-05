import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import validator from 'validator';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';
import StudentSidebar from './StudentSidebar'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from './firebase';


export default function Complain() {

    const [error, setError] = useState({
        tag: "* field is required",
        description: "* field is required",
        image: "* field is required",
        contact: "* field is required",
        total_seats: "* field is required",
    });
    const [complain, setComplain] = useState({
        tag:0,
        description:"",
        timestamp:"",
        photo:"",
        std_reg:"2018331008"

    });
    const [files, setFiles] = useState([]);


    const uploadImage = () => {
        if (files.length !== 0) {
          const imageRef = ref(storage, `banner/${Date.now()}`);
          uploadBytes(imageRef, files).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
            console.log(url);
            complain.photo=url;
            console.log(complain.photo);
    
             
            });
          });
        } else return;

        console.log("kaj korche");
        const tm= Date.now();
        console.log(tm);
    
        
        if(complain.photo != null) {
            Axios.post("http://localhost:3001/add/complain", {
            "tag":complain.tag,
            "description":complain.description,
            "photo":complain.photo,
            "timestamp":tm,
            "std_reg":complain.std_reg,
        }).then( ()=> {
            console.log("look it works!!");
        }).catch((e)=>{
            alert(e);
            console.log("hoilona");
        });
        }
        else alert("select imag!");


      };


    return(
        <>
        <div className="shadow p-4" style={{
            width: "60%",
            border: "3px solid lightGray",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "30px"
        }} >
        {JSON.stringify(complain)}
            <Form>
            <Form.Group className="mb-3">
            <Form.Label>Tag</Form.Label>
            <Form.Select onChange={(event) => {
                const value = event.currentTarget.value;
                setComplain({ ...complain, tag: value })
                let msg = "";
                if (value.length === 0)
                    msg = "* field is required";
                setError({ ...error, tag: msg });
                }}>
                <option>Select Type</option>
                <option value="11" >Cleaning</option>
                <option value="12">Seat</option>
                <option value="13">Kitchen</option>
            </Form.Select>
            <span className="text-danger">{error.tag}</span>
            </Form.Group>



            <Form.Group className="mb-3" >
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Details complain..." onChange={(event) => {
                            const value = event.target.value;
                            setComplain({ ...complain, description: value });
                            let msg = "";
                            if (value.length === 0)
                                msg = "* field is required";
                            setError({ ...error, description: msg });
                        }} />
                        <span className="text-danger">{error.description}</span>
                    </Form.Group>

                    <input className="mb-3" type="file" fileName="complainPhoto" onChange={(event)=>{
                        event.preventDefault();
                        setFiles(event.target.files[0]);
                    }}/>

                    
                
            
            </Form><Button variant="primary" type="submit" onClick={uploadImage}>
                        Submit
                    </Button>
        
        
        </div></>
    )
}