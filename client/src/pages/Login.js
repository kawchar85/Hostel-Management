
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import {useState} from "react";
import Axios from 'axios';
import { Alert, Container } from 'react-bootstrap';
import axios from 'axios';

function Login() {
    const [LoginState, setLoginState] = useState({
        email: "",
        password: "",
        ck: false,

    });
    const[LoginStatus, setLoginStatus] = useState(false);
    
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
                        setLoginStatus(true);
                        localStorage.setItem("token",response.data.token);
                       // alert(response.data.token);
                        alert("Logged in!");
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
                    <h4>Login</h4>
                    
                    <div className="my-4 w-50">
                        <div className="form-floating my-3">
                            <input 
                                type="email" 
                                className="form-control"  
                                id="mailId"
                                onChange={(event)=> {
                                    const value = event.target.value;
                                    setLoginState({...LoginState,email:value})
                                } }
                            />
                            <label for="mailId">Email address</label>
                        </div>
                        <div className="form-floating my-3">
                            <input 
                                type="password"
                                className="form-control" 
                                id="pass" 
                                onChange={(event)=> {
                                    const value = event.target.value;
                                    setLoginState({...LoginState,password:value})
                                } }
                            />
                            <label for="pass">Password</label>
                        </div>
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
                            {LoginStatus && <button onClick={demoMethod}>demo check</button>}
                        </div>
                        <p className="forgot-password text-right my-4">
                            <a href="#">Forgot password?</a>
                        </p>    
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Login;