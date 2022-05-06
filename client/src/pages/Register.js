
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
        dept: "",
        merit: "",
        email: "",
        hostelID: "",
        roomID: "",
        phone: "",
        roleID:"1",
        roleTag: "Student",
        gurdian_name: "",
        gurdian_address:"",
        gurdian_phone: "",
    });

    const addStudent =()=> {
        Axios.post("http://localhost:3001/add/students/auto", {
            "reg":RegisterState.reg,
            "name":RegisterState.std_name,
            "dept": RegisterState.dept,
            "merit": RegisterState.merit,
            "email": RegisterState.email,
            "hostelID": RegisterState.hostelID,
            "roomID": RegisterState.roomID,
            "phone": RegisterState.phone,
            "roleID":RegisterState.roleID,
            "roleTag": RegisterState.roleTag,
            "gurdian_name": RegisterState.gurdian_name,
            "gurdian_address":RegisterState.gurdian_address,
            "gurdian_phone": RegisterState.gurdian_phone
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
                                    setRegisterState({...RegisterState,gurdian_name:value})
                                } }
                            />
                            <label for="gurdian">gurdian name</label>
                        </div>
                        <div className="form-floating my-3">
                            <input 
                                type="text" 
                                className="form-control"  
                                id="gurdian_address"
                                onChange={(event)=> {                                    
                                    const value = event.target.value;
                                    setRegisterState({...RegisterState,gurdian_adress:value})
                                } }
                            />
                            <label for="gurdian_address">gurdian address</label>
                        </div>
                        <div className="form-floating my-3">
                            <input 
                                type="number" 
                                className="form-control"  
                                id="gurdian_phone"
                                onChange={(event)=> {                                    
                                    const value = event.target.value;
                                    setRegisterState({...RegisterState,gurdian_phone:value})
                                } }
                            />
                            <label for="gurdian_phone">gurdian phone</label>
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