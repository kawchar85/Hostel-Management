import React, { useEffect, useState, useContext } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Axios from 'axios';
import jwt_decode from "jwt-decode";
import { storeData, getData, eraseData} from '../App';
import { PublicContex } from './PublicContext';


export default function Profile() {

  const [show, setShow] = useState(false);
  const [finalMsg, setFinalMsg] = useState("");

  const [publicData, setPublicData] = useContext(PublicContex);


const [admin, setAdmin] = useState({
    name: "",
    phone:"",
    email:"",
    hostel_id:"",
    designation:"",
    role_id: ""
});

const [error, setError] = useState({
    name: "",
    phone: "",
    email: "",
    hostel_id: "",
    designation: "",
    role_id: "",
});
const [hostel, setHostel] = useState({
    hostels : []
})
let x = 9;

const[prev, setPrev] = useState({
    val:15
})


let obj = {"email":"", "role_id":""};
obj.email= getData("user_email");              
obj.role_id= getData("user_role_id");

console.log(obj);
const getAdmin = async() => {
    const response= await Axios.get("http://localhost:3001/getData/user", { params: { mail: obj.email, role: obj.role_id } }).then((response) => {
        let data=response.data[0];
        setAdmin({...admin,name:data.Name,email:data.Email,phone:data.Phone,hostel_id:data.Hostel_ID,designation:data.Designation,role_id:data.Role_ID});
        console.log("DEBUGGINGGGG");
        console.log(admin);
    });
};


useEffect(()=> {
    getAdmin();
    try{
        const token = localStorage.getItem('token');
        let decodedToken = jwt_decode(token);
        console.log(decodedToken);
    }
    catch(err)
    {
        console.log(err);
    }
},[]);



  const handleSubmit = (event) => {
    let cnt=0;

    console.log("Admin update");
    event.preventDefault();
    const isEmpty = Object.values(error).every(x => x === null || x === "");
    console.log(isEmpty);
    console.log(error);
    if (isEmpty) {

            Axios.put("http://localhost:3001/update/administration", {
                "name":admin.name,
                "designation": admin.designation,
                "email": admin.email,
                "hostel_id": admin.hostel_id,
                "phone": admin.phone,
                "role_id":admin.role_id
    
            }).then((response) => {
                if(response.data === "error"){
                    setFinalMsg("Something Error!!");
                } else {
                    setFinalMsg("Admin Updated successfully...");
                    cnt++;
                    if(cnt===2)setShow(true);
                }
            //    setShow(true);
            }).catch((e) => alert(e.response.data));

            Axios.put("http://localhost:3001/update/login", {
                "email": admin.email,
                "role_id":admin.role_id
    
            }).then((response) => {
                if(response.data === "error"){
                    setFinalMsg("Something Error!!");
                } else {
                    setFinalMsg("Admin Updated successfully...");
                    cnt++;
                    if(cnt===2)setShow(true);
                }
            }).catch((e) => alert(e.response.data));


    }
    console.log(admin);

};


  return (
    <div className="shadow p-4" style={{
      width: "60%",
      border: "3px solid lightGray",
      marginLeft: "auto",
      marginRight: "auto",
  }} >
    <Alert show={show} variant="success">
    <Alert.Heading>Profile Updated!!</Alert.Heading>
    <p>
        {finalMsg}
    </p>
    <hr />
    <div className="d-flex justify-content-end">
        <Button onClick={() => { setShow(false); window.location.reload(); }} variant="outline-success">
            Close!
        </Button>
    </div>
  </Alert>
  {!show && (
    <div className="container">
        <div style={{
        textShadow: "#f9fafb 0px 1px 0px, #0d6efd 3px 3px 3px",
        textAlign: "center",
        textTransform: "uppercase",
        color: "#666",
        margin: "0 0 30px 0",
        letterSpacing: "4px",
        font: "normal 30px/2 Segoe Print,Verdana, Helvetica",
        position: "relative",
    }} > 
     Profile of {admin.name}

                    </div>
    <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={admin.email} readOnly />
        </Form.Group>
        
        <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value = {admin.name} onChange={(event) => {
                const value = event.currentTarget.value;
                setAdmin({ ...admin, name: value })
                let msg = "";
                if (value.length === 0)
                    msg = "* field is required";
                setError({ ...error, name: msg });
            }}>
            </Form.Control>
            <span className="text-danger">{error.name}</span>
        </Form.Group>
        
        <Form.Group className="mb-3">
            <Form.Label>Contact</Form.Label>
            <Form.Control type="text" placeholder='Contact' value = {admin.phone} onChange={(event) => {
                const value = event.target.value;
                setAdmin({ ...admin, phone: value });
                let msg = "";
                if (value.length === 0)
                    msg = "* field is required";
                else if(value.length !== 11) msg= "Contact must be 11 digit!";
                setError({ ...error, phone: msg });
            }} />
            <span className="text-danger">{error.phone}</span>
        </Form.Group>


        <Form.Group className="mb-3">
            <Form.Label>Hostel</Form.Label>
            <select className="form-select" value={admin.hostel_id} onChange={(event)=> {
                const value = event.target.value;
                let msg="";
                console.log(value);
                if(value.length ===0) msg= "* field is required";
                setAdmin({...admin,hostel_id:value});
                setError({...error, hostel_id: msg});
            }}>
                {publicData.hostel.map((option, index) => (
                    <option key={index} value={option.Hostel_ID}>
                        {option.Name}
                    </option>
                ))}
            </select>
           <span className="text-danger">{error.hostel_id}</span>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Designation</Form.Label>
            <Form.Select value={admin.designation} onChange={(event) => {
            const value = event.currentTarget.value;
            setAdmin({ ...admin, designation: value })
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
            <Form.Select  value={admin.role_id} onChange={(event) => {
            const value = event.currentTarget.value;
            setAdmin({ ...admin, role_id: value })
            let msg = "";
            if (value.length === 0)
            msg = "* field is required";
            setError({ ...error, role: msg });
            }}>
            <option>Select designation</option>
                <option value="1" >Cleaning</option>
                <option value="2">Seat Allocation</option>
                <option value="19">Supervison</option>
            </Form.Select>
            <span className="text-danger">{error.role}</span>
        </Form.Group>

        
        

        
        <Button variant="primary" type="submit">
            Update Profile!
        </Button>
    </Form>
    </div>
  )}
  </div>
  )
}
