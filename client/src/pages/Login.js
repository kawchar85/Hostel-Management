
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import {useState, useEffect, useContext} from "react";
import validator from 'validator';
import { useNavigate } from "react-router-dom"
import Axios from 'axios';
import { storeData, getData, eraseData} from '../App';

import { Alert, Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { PublicContex } from './../components/PublicContext';

function Login() {
    const [publicData, setPublicData] = useContext(PublicContex);
    const [LoginState, setLoginState] = useState({
        email: "",
        email_err: "* field can not be empty",
        password: "",
        password_err: "* field can not be empty",
        ck: false

    });
    const[LoginStatus, setLoginStatus] = useState(false);
    const navigate = useNavigate()

    
/*
    const auth =()=> {
        
        Axios.get("http://localhost:3001/loginCred", {
            params: { table: "login", email:"'"+LoginState.email+"'" },
            
            
        }).then((response)=> {
            console.log("yeeeee loginer kaj korche");
            const len = response.data.length;
            if(len==0) {
                alert("Invalid Email");
            }
            else 
            {
                console.log(response.data[0]);
                const {Email,RoleID,Password} = response.data[0];
                console.log(Email);
                if(LoginState.password == Password) {
                    alert("Login successful");
                }
                else 
                {
                    alert("Wrong Password");
                }
            }
            
            
        } );
    }
    */
   const demoMethod =()=>{
        Axios.get("http://localhost:3001/isAuth",{
            "headers" : {
                "x-access-token": localStorage.getItem("token"),
            },
        }).then((response)=>{
            console.log(response);
        });
   };


    const auth =() => {
        Axios.post("http://localhost:3001/authMail", {
            "email":LoginState.email,
        }).then((response)=> {
            console.log(response);
            if(response.data.length > 0)
            {
                Axios.post("http://localhost:3001/auth", {
                    "email":LoginState.email,
                    "password":LoginState.password
                }).then((response)=> {
                    if(response.data.result.length > 0)
                    {
                        console.log(response.data.result[0].Email);
                        let obj = publicData.user;
                        obj.email= response.data.result[0].Email;
                        obj.rule_id= response.data.result[0].Role_ID;
                        setPublicData({...publicData, user: obj });
                        storeData("user_email", obj.email);
                        console.log("hola "+getData("user_email"));
                        storeData("user_role_id", response.data.result[0].Role_ID);
                        console.log("hola "+getData("user_role_id"));
                        console.log(publicData.user);
                        setLoginStatus(true);
                        localStorage.setItem("token",response.data.token);
                        console.log("last check");
                        console.log(obj);
                        navigate(`/home`);
                    }
                    else
                    {
                        alert("Wrong password!");
                        setLoginStatus(false);
                    } 
                });
            }
            else 
            {
                setLoginStatus(false);
                alert("Invalid mail address");
            }
        });
    }

    return(
        <Container className="my-5">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    
                    
                    <div className="shadow p-4" style={{
                        width: "60%",
                        border: "3px solid lightGray",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }} >
                    <div style={{
                        textShadow: "#f9fafb 0px 1px 0px, #0d6efd 3px 3px 3px",
                        textAlign: "center",
                        color: "#666",
                        margin: "0 0 30px 0",
                        letterSpacing: "4px",
                        font: "normal 30px/2 Segoe Print,Verdana, Helvetica",
                        position: "relative",
                    }} > <h4>USER LOGIN </h4> </div>
                    <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                            <Form.Control type="text" placeholder="email" onChange={(event) => {
                                const value = event.target.value;
                                let msg = "";
                                if(validator.isEmail(value))
                                {
                                    try{
                                        setLoginState({...LoginState,email:value,email_err: msg});
                                    }
                                    catch(e) 
                                    {
                                        console.log(e);
                                    }
                                }
                                else {
                                    if(value.length === 0) msg="* field is required";
                                    else msg="Invalid Mail!!"
                                    setLoginState({...LoginState,email_err:msg});
                                    console.log(value);
                                }
                            }} />
                            <span className="text-danger">{LoginState.email_err}</span>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                                <Form.Control type="text" placeholder="password" onChange={(event) => {
                                    const value = event.target.value;
                                    let msg = "";
                                    if(value.length === 0) msg="* field is required";
                                    else if(value.length <5) msg = "Password should be at least 5 digit long!";
                                    setLoginState({...LoginState, password:value, password_err:msg});
                                
                            }} />
                            <span className="text-danger">{LoginState.password_err}</span>
                        </Form.Group>
                            
                        <div className="my-4">
                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="ckbox"
                                    onChange={(event)=> {
                                        const value = event.target.checked;
                                        setLoginState({...LoginState,ck:value})
                                    } }
                                />
                                <label className="custom-control-label" for="ckbox">
                                    Remember me
                                </label>
                            </div>
                        </div>
                        <div className="d-grid">
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled= {!LoginState.email || !LoginState.password}
                                onClick={auth}
                            >
                                Submit
                            </button>
                            
                        </div>
                        
                           
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Login;