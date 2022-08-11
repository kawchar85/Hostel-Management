import React, { useEffect, useState, useContext } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Axios from 'axios';
import { PublicContex } from './PublicContext';
import jwt_decode from "jwt-decode";

export default function Profile() {

  const userInfo = 2018331001;
  const [show, setShow] = useState(false);
  const [finalMsg, setFinalMsg] = useState("");
  const [error, setError] = useState({
    reg_err:"",
    std_name_err:"",
    password_err:"",
    dept_err:"",
    merit_err:"",
    email_err:"",
    hostelID_err:"",
    roomID_err:"",
    phone_err:"",
    guardian_name_err:"",
    guardian_address_err:"",
    guardian_phone_err:"",
})
const [publicData, setPublicData] = useContext(PublicContex);

const [std, setStd] = useState({
  reg: null,
  std_name: null,
  password: null,
  dept: null,
  merit: null,
  email: null,
  hostelID: null,
  roomID: null,
  phone: null,
  guardian_name: null,
  guardian_address:null,
  guardian_phone: null,
})

const[hostel, setHostel] = useState({
    hostels:[]
})

let obj = publicData.user;
obj.email=publicData.user.email;
obj.rule_id= 2; //publicData.user.rule_id;
const getStudent = async() => {
    const response= await Axios.get("http://localhost:3001/getData/user", { params: { mail: publicData.user.email, role:publicData.user.rule_id } }).then((response) => {
            let data=response.data[0];
            setStd({...std,reg:data.Reg,email:data.Email,std_name:data.Name,dept:data.Dept,merit:data.Merit,hostelID:data.Hostel_ID,roomID:data.Room_ID,phone:data.Phone});
            console.log(data.Phone + " preity");
            console.log(std.reg);
            console.log(data);
        });
        console.log(std);
        

};

    useEffect(()=> {
        getStudent();
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

    console.log("User update");
    event.preventDefault();
    const isEmpty = Object.values(error).every(x => x === null || x === "");
    console.log(isEmpty);
    console.log(error);
    
    if (isEmpty) {
            Axios.put("http://localhost:3001/update/student", {
                "reg":std.reg,
                "name":std.std_name,
                "dept": std.dept,
                "merit": std.merit,
                "email": std.email,
                "hostel_id": std.hostelID,
                "room_id": std.roomID,
                "phone": std.phone,
                "role_id":publicData.user.ule_id
    
            }).then((response) => {
                if(response.data === "error"){
                    setFinalMsg("Something Error!!");
                } else {
                    setFinalMsg("Student Updated successfully...");
                }
                setShow(true);
            }).catch((e) => alert(e.response.data));
            
    }
    console.log(std);

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
    <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="reg">
            <Form.Label>Registration No</Form.Label>
            <Form.Control type="number" value={std.reg} readOnly />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
            <Form.Control type="text" value={std.password} onChange={(event) => {
              const value = event.target.value;
              let msg = "";
              if (value.length === 0)
              msg = "* field is required";
              else if (value.length < 5)
              msg = "Password should be at least 5 digit!";
              setStd({...std,password:value});
              setError({...error,password_err:msg});
              }} 
            />
          <span className="text-danger">{error.password_err}</span>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value = {std.std_name} onChange={(event) => {
                const value = event.currentTarget.value;
                setStd({ ...std, std_name: value })
                let msg = "";
                if (value.length === 0)
                    msg = "* field is required";
                setError({ ...error, std_name_error: msg });
            }}>
            </Form.Control>
            <span className="text-danger">{error.type}</span>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Depertment</Form.Label>
            <select className="form-select" value={std.dept} onChange={(event)=> {
                const value = event.currentTarget.value;
                let msg="";
                if(value.length === 0) msg="* field is required";
                setStd({...std,dept:value});
                setError({...error, dept_err:msg});
            }}>
            <option selected value={std.dept}>Department</option>
            <option value="1">CSE</option>
            <option value="2">EEE</option>
            <option value="3">SWE</option>
            <span className="text-danger">{error.dept_err}</span>
        </select>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Merit position</Form.Label>
            <Form.Control type="text" placeholder='merit position' value = {std.merit} onChange={(event) => {
                const value = event.target.value;
                setStd({ ...std, merit: value });
                let msg = "";
                if (value.length === 0)
                    msg = "* field is required";
                setError({ ...error, merit_err: msg });
            }} />
            <span className="text-danger">{error.merit_err}</span>
        </Form.Group>

        <Form.Group className="mb-3" controlId="hostelAddress">    <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" value={std.email} readOnly />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Hostel</Form.Label>
            <select className="form-select" defaultValue={std.hostelID} onChange={(event)=> {
                const value = event.target.value;
                let msg="";
                console.log(value);
                if(value.length ===0) msg= "* field is required";
                setStd({...std,hostelID:value});
                setError({...error, hostelID_err: msg});
            }}>
                {publicData.hostel.map((option, index) => (
                    <option key={index} value={option.Hostel_ID}>
                        {option.Name}
                    </option>
                ))}
            </select>
           <span className="text-danger">{error.hostelID_err}</span>
        </Form.Group>

        
        <Form.Group className="mb-3">
            <Form.Label>Room Number</Form.Label>
            <Form.Control type="text" placeholder={std.roomID} value={std.roomID} onChange={(event) => {
                const value = event.target.value;
                let msg = "";
                if (value.length === 0)
                    msg = "* field is required";
                    setStd({...std,roomID:value});
                    setError({...error, roomID_err:msg});
                }} 
            />
            <span className="text-danger">{error.roomID_err}</span>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control type="text" placeholder="phone" value={std.phone} onChange={(event) => {
                const value = event.target.value;
                let msg = "";
                if(value.length === 0) msg="* filed is required";
                if (value.length !== 11)
                msg = "Phone number should be 11 digit!";
                setStd({...std,phone:value});
                setError({...error,phone_err:msg});
            }} />
            <span className="text-danger">{error.phone_err}</span>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Guardian name</Form.Label>
            <Form.Control type="text" value={std.guardian_name} placeholder="guardian name" onChange={(event) => {
                const value = event.target.value;
                let msg = "";
                if(value.length === 0) msg="* filed is required";
                setStd({...std,guardian_name:value});
                setError({...error,guardian_name_err:msg});
            }} />
            <span className="text-danger">{error.guardian_name_err}</span>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Guardian address</Form.Label>
            <Form.Control type="text" value={std.guardian_address} placeholder="guardian address" onChange={(event) => {
                const value = event.target.value;
                let msg = "";
                if(value.length === 0) msg="* filed is required";    
                setStd({...std,guardian_address:value});
                setError({...error, guardian_address_err:msg})
            }} />
            <span className="text-danger">{error.guardian_address_err}</span>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Guardian_phone</Form.Label>
            <Form.Control type="text" value={std.guardian_phone} placeholder="guardian phone" onChange={(event) => {
                const value = event.target.value;
                let msg = "";
                if(value.length === 0) msg="* filed is required";
                if (value.length !== 11)
                msg = "Phone number should be 11 digit!";
                setStd({...std,guardian_phone:value});
                setError({...error, guardian_phone_err:msg});
            }} />
            <span className="text-danger">{error.guardian_phone_err}</span>
        </Form.Group>


        
        <Button variant="primary" type="submit">
            Update Profile!
        </Button>
    </Form>
  )}
  </div>
  )
}
