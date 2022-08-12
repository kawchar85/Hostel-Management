import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from './firebase';

import { PublicContex } from './PublicContext';
import { async } from '@firebase/util';

export default function Complain() {

    const [publicData, setPublicData] = useContext(PublicContex);
    const [show, setShow] = useState(false);
    const [error, setError] = useState({
        tag: "* field is required",
        description: "* field is required",
        title: "* field is required",
        image: "* field is required",
        contact: "* field is required",
        total_seats: "* field is required",
    });
    const [complain, setComplain] = useState({
        tag: 0,
        description: "",
        title: "",
        photo: "",
        std_reg: "2018331000"

    });
    const [files, setFiles] = useState([]);

    const getReg = () => {
        Axios.get("http://localhost:3001/getData/student/reg", { params: { email: publicData.user.email } }).then((response) => {
            if (response.data === "error") {
                alert("You are not student!")
            } else {
                console.log(response.data[0].Reg);
                setComplain({ ...complain, std_reg: response.data[0].Reg });
            }
        }).catch((e) => alert(e));
    }
    useEffect(() => {
        getReg();
    }, []);

    const uploadImage = async () => {
        if (files.length !== 0) {
            const imageRef = ref(storage, `banner/${Date.now()}`);
            uploadBytes(imageRef, files).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async (url) => {
                    console.log(url);
                    setComplain({ ...complain, photo: url });
                    console.log(complain.photo);

                    if (complain.photo !== "") {
                        console.log("complian data");
                        console.log(complain);
                        await Axios.post("http://localhost:3001/add/complain", {
                            "tag": complain.tag,
                            "description": complain.description,
                            "photo": complain.photo,
                            "title": complain.title,
                            "std_reg": complain.std_reg,
                        }).then(() => {
                            console.log("look it works!!");
                            setShow(true);
                        }).catch((e) => {
                            alert(e);
                            console.log("hoilona");
                        });
                    }
                    else alert("select imag!");

                });
            });
        } else return;

        // if (complain.photo != null) {
        //     await Axios.post("http://localhost:3001/add/complain", {
        //         "tag": complain.tag,
        //         "description": complain.description,
        //         "photo": complain.photo,
        //         "title": complain.title,
        //         "std_reg": complain.std_reg,
        //     }).then(() => {
        //         console.log("look it works!!");
        //     }).catch((e) => {
        //         alert(e);
        //         console.log("hoilona");
        //     });
        // }
        // else alert("select imag!");


    };


    return (
        <>
            <div className="shadow p-4" style={{
                width: "60%",
                border: "3px solid lightGray",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "30px"
            }} >
                <Alert show={show} variant="success">
                    <Alert.Heading>How's it going?!</Alert.Heading>
                    <p>
                        Hostel Added successfully...
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => { setShow(false); window.location.reload(); }} variant="outline-success">
                            Close!
                        </Button>
                    </div>
                </Alert>

                {!show && (
                    <>
                        <Form>
                            <Form.Group className="mb-3" >
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Complain title" onChange={(event) => {
                                    const value = event.target.value;
                                    setComplain({ ...complain, title: value });
                                    let msg = "";
                                    if (value.length === 0)
                                        msg = "* field is required";
                                    setError({ ...error, title: msg });
                                }} />
                                <span className="text-danger">{error.title}</span>
                            </Form.Group>

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

                            <input className="mb-3" type="file" fileName="complainPhoto" onChange={(event) => {
                                event.preventDefault();
                                setFiles(event.target.files[0]);
                            }} />
                        </Form>
                        <Button variant="primary" type="submit" onClick={uploadImage}>
                            Submit
                        </Button>
                    </>
                )}



            </div></>
    )
}
