
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import {useState} from "react";
import Axios from 'axios';
import { Container } from 'react-bootstrap';

function Login() {
    const [LoginState, setLoginState] = useState({
        email: "",
        password: "",
        ck: false,

    });
    const auth =()=> {
        
        Axios.get("http://localhost:3001/loginCred", {
            params: { table: "login", email:"'"+LoginState.email+"'" },
            
            
        }).then((response)=> {
            console.log("yeeeee loginer kaj korche")
            console.log(response.data);
        } );
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