
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import {useState} from "react";
import { Container } from 'react-bootstrap';
import validator from 'validator';
import Axios from 'axios';

function Register() {
    const [RegisterState, setRegisterState] = useState({
        reg: "",
        std_name: "",
        password: "",
        dept: "",
        merit: "",
        email: "",
        hostelID: "",
        roomID: "",
        phone: "",
        roleID:"1",
        roleTag: "Student",
        guardian_name: "",
        guardian_address:"",
        guardian_phone: "",
    });

    const addStudent =()=> {
        
        Axios.post("http://localhost:3001/add/students", {
            "reg":RegisterState.reg,
            "name":RegisterState.std_name,
            "dept": RegisterState.dept,
            "merit": RegisterState.merit,
            "email": RegisterState.email,
            "hostel_id": RegisterState.hostelID,
            "room_id": RegisterState.roomID,
            "phone": RegisterState.phone,
            "role_id":RegisterState.roleID
        }).then(()=> {
            console.log("yeeeee kaj korche")
        } );
        Axios.post("http://localhost:3001/add/guardian_info", {
            "name": RegisterState.guardian_name,
            "address":RegisterState.guardian_address,
            "phone": RegisterState.guardian_phone
        }).then(()=> {
            console.log("yeeeee kaj korche")
        } ); 
        Axios.post("http://localhost:3001/add/guardian", {
            "std_reg":RegisterState.reg,
            "phone": RegisterState.guardian_phone
        }).then(()=> {
            console.log("yeeeee kaj korche")
        } );
        Axios.post("http://localhost:3001/add/login", {
            "password":RegisterState.password,
            "role_id": RegisterState.roleID,
            "email": RegisterState.email
        }).then(()=> {
            console.log("yeeeee kaj korche")
        } ); 
    };

    return(
        <Container className="my-5">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <h4>Register</h4>
                    {JSON.stringify(RegisterState)}
                    <div className="my-4 w-50">
                        <div className="form-floating my-3">
                            <input 
                                type="number" 
                                className="form-control"  
                                id="reg"
                                onChange={(event)=> {                                    
                                    const value = event.target.value;
                                    setRegisterState({...RegisterState,reg:value})
                                } }
                            />
                            <label for="reg">Registration Number</label>
                        </div>
                        <div className="form-floating my-3">
                            <input 
                                type="text" 
                                className="form-control"  
                                id="pass"
                                onChange={(event)=> {                                    
                                    const value = event.target.value;
                                    setRegisterState({...RegisterState,password:value})
                                } }
                            />
                            <label for="pass">Password</label>
                        </div>
                        <div className="form-floating my-3">
                            <input 
                                type="text" 
                                className="form-control"  
                                id="name"
                                onChange={(event)=> {                                    
                                    const value = event.target.value;
                                    setRegisterState({...RegisterState,name:value})
                                } }
                            />
                            <label for="name">Name</label>
                        </div>
                        <div className="form-floating my-3">
                            <select class="form-select" onChange={(event)=> {
                                    const value = event.currentTarget.value;
                                    console.log(value);
                                    setRegisterState({...RegisterState,dept:value})
                                    JSON.stringify(RegisterState)
                                }}>
                                <option selected>Department</option>
                                <option value="1">CSE</option>
                                <option value="2">EEE</option>
                                <option value="3">SWE</option>
                                
                            </select>
                        </div>
                        <div className="form-floating my-3">
                            <input 
                                type="number" 
                                className="form-control"  
                                id="merit"
                                onChange={(event)=> {                                    
                                    const value = event.target.value;
                                    setRegisterState({...RegisterState,merit:value})
                                } }
                            />
                            <label for="merit">Merit Position</label>
                        </div>
                        <div className="form-floating my-3">
                            <input 
                                type="email" 
                                className="form-control"  
                                id="mail"
                                onChange={(event)=> {                                    
                                    const value = event.target.value;
                                    if(validator.isEmail(value))
                                    {
                                        setRegisterState({...RegisterState,email:value})
                                    }
                                    else {
                                        console.log(value);
                                    }
                                    
                                } }
                            />
                            <label for="mail">Email</label>
                        </div>
                        <div className="form-floating my-3">
                            <select class="form-select" onChange={(event)=> {
                                    const value = event.currentTarget.value;
                                    console.log(value);
                                    setRegisterState({...RegisterState,hostelID:value})
                                    
                                }}>
                                <option selected>Hostel</option>
                                <option value="1">H1</option>
                                <option value="2">H2</option>
                                <option value="3">H3</option>
                                
                            </select>
                        </div>
                        <div className="form-floating my-3">
                            <input 
                                type="number" 
                                className="form-control"  
                                id="room"
                                onChange={(event)=> {                                    
                                    const value = event.target.value;
                                    setRegisterState({...RegisterState,roomID:value})
                                } }
                            />
                            <label for="room">Room Number</label>
                        </div>
                        <div className="form-floating my-3">
                            <input 
                                type="number" 
                                className="form-control"  
                                id="phone"
                                onChange={(event)=> {                                    
                                    const value = event.target.value;
                                    setRegisterState({...RegisterState,phone:value})
                                } }
                            />
                            <label for="phone">Phone Number</label>
                        </div>
                        <div className="form-floating my-3">
                            <input 
                                type="text" 
                                className="form-control"  
                                id="gurdian"
                                onChange={(event)=> {                                    
                                    const value = event.target.value;
                                    setRegisterState({...RegisterState,guardian_name:value})
                                } }
                            />
                            <label for="gurdian">guardian name</label>
                        </div>
                        <div className="form-floating my-3">
                            <input 
                                type="text" 
                                className="form-control"  
                                id="gurdian_address"
                                onChange={(event)=> {                                    
                                    const value = event.target.value;
                                    setRegisterState({...RegisterState,guardian_address:value})
                                } }
                            />
                            <label for="gurdian_address">guardian address</label>
                        </div>
                        <div className="form-floating my-3">
                            <input 
                                type="number" 
                                className="form-control"  
                                id="gurdian_phone"
                                onChange={(event)=> {                                    
                                    const value = event.target.value;
                                    setRegisterState({...RegisterState,guardian_phone:value})
                                } }
                            />
                            <label for="gurdian_phone">guardian phone</label>
                        </div>
                        <button 
                                type="submit" 
                                className="btn btn-primary"
                                onClick={addStudent}
                            >
                                Submit
                            </button>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Register;