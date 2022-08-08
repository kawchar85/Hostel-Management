
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect } from "react";
import { Alert, Container } from 'react-bootstrap';
import validator from 'validator';
import Axios from 'axios';
import SingleHostel from '../components/SingleHostel';
import { Component } from 'react';
class Register extends Component{
    constructor(props){
        super(props);
        this.state = ({
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
            hostels : []
        });
        let mp = new Map();
        //get Hostel list from Database
    };
    getHostels = async() => {
        const response= await Axios.get("http://localhost:3001/getData/", { params: { table: "hostel" } }).then((response) => {
            let tmp = {hostels : response.data};
            this.setState({hostels : response.data} , ()=>{
                console.log(this.state);
            });
        });
    };
    /* handleChange=(e)=>{
        this.setState({
            ...this.state,
            [e.target.id]:e.target.value
        })
    }*/
    addStudent =()=> {

        Axios.get("http://localhost:3001/getData/student", { params: { reg: this.state.reg } }).then((response) => {
            if(response.data === "notRegistered")
            {
                Alert("Not registered"); 
            }
            else if(response.data === "Registered") {
                Alert("This registration number already exists!");
            }
            else {
                Alert("Something went wrong! try again!");
            }
            console.log(response.data);
        }).catch((e) => alert(e));

        Axios.post("http://localhost:3001/add/students", {
                "reg":this.state.reg,
                "name":this.state.std_name,
                "dept": this.state.dept,
                "merit": this.state.merit,
                "email": this.state.email,
                "hostel_id": this.state.hostelID,
                "room_id": this.state.roomID,
                "phone": this.state.phone,
                "role_id":this.state.roleID
            }).then(()=> {
                console.log("student added")
            } );
            Axios.post("http://localhost:3001/add/guardian_info", {
                "name": this.state.guardian_name,
                "address":this.state.guardian_address,
                "phone": this.state.guardian_phone
            }).then(()=> {
                console.log("guardian info added")
            } ); 
            Axios.post("http://localhost:3001/add/guardian", {
                "std_reg":this.state.reg,
                "phone": this.state.guardian_phone
            }).then(()=> {
                console.log("guardian added")
            } );
            Axios.post("http://localhost:3001/add/login", {
                "password":this.state.password,
                "role_id": this.state.roleID,
                "email": this.state.email
            }).then(()=> {
                console.log("login added")
            } );




            /*

        let cur= this.state.reg;
        console.log("dukse"+ cur);
        Axios.get("http://localhost:3001/getData/hostel", { params: { email: cur } }).then((response) => {
            if(response.data === "error"){
                console.log("noooo error");                    
            //    setError({ ...error, id: "This Email already exists!!!!..." });
            } else {
                Axios.post("http://localhost:3001/add/students", {
                "reg":this.state.reg,
                "name":this.state.std_name,
                "dept": this.state.dept,
                "merit": this.state.merit,
                "email": this.state.email,
                "hostel_id": this.state.hostelID,
                "room_id": this.state.roomID,
                "phone": this.state.phone,
                "role_id":this.state.roleID
            }).then(()=> {
                console.log("student added")
            } );
            Axios.post("http://localhost:3001/add/guardian_info", {
                "name": this.state.guardian_name,
                "address":this.state.guardian_address,
                "phone": this.state.guardian_phone
            }).then(()=> {
                console.log("guardian info added")
            } ); 
            Axios.post("http://localhost:3001/add/guardian", {
                "std_reg":this.state.reg,
                "phone": this.state.guardian_phone
            }).then(()=> {
                console.log("guardian added")
            } );
            Axios.post("http://localhost:3001/add/login", {
                "password":this.state.password,
                "role_id": this.state.roleID,
                "email": this.state.email
            }).then(()=> {
                console.log("login added")
            } ); 
            }
        }).catch((e) => alert(e));  */
        
    };
    componentDidMount(){
        this.getHostels();
    }
    render(){
        return(
            <Container className="my-5">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <h4>Register</h4>
                        {JSON.stringify(this.state)}
                        <div className="my-4 w-50">
                            <div className="form-floating my-3">
                                <input 
                                    type="number" 
                                    className="form-control"  
                                    id="reg"
                                    onChange={(event)=> {                                    
                                        const value = event.target.value;
                                        this.setState({...this.state,reg:value})
                                    } }
                                />
                                <label htmlFor="reg">Registration Number</label>
                            </div>
                            <div className="form-floating my-3">
                                <input 
                                    type="text" 
                                    className="form-control"  
                                    id="pass"
                                    onChange={(event)=> {                                    
                                        const value = event.target.value;
                                        this.setState({...this.state,password:value})
                                    } }
                                />
                                <label htmlFor="pass">Password</label>
                            </div>
                            <div className="form-floating my-3">
                                <input 
                                    type="text" 
                                    className="form-control"  
                                    id="name"
                                    onChange={(event)=> {                                    
                                        const value = event.target.value;
                                        this.setState({...this.state,name:value})
                                    } }
                                />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating my-3">
                                <select className="form-select" onChange={(event)=> {
                                        const value = event.currentTarget.value;
                                        console.log(value);
                                        this.setState({...this.state,dept:value})
                                        JSON.stringify(this.state)
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
                                        this.setState({...this.state,merit:value})
                                    } }
                                />
                                <label htmlFor="merit">Merit Position</label>
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
                                            try{
                                                this.setState({...this.state,email:value});
                                            }
                                            catch(e) 
                                            {
                                                console.log(e);
                                            }
                                        }
                                        else {
                                            console.log(value);
                                        }
                                        
                                    } }
                                />
                                <label htmlFor="mail">Email</label>
                            </div>
                            <div className="form-floating my-3">
                                <select className="form-select" onChange={(event)=> {
                                        const value = event.currentTarget.value;
                                        console.log(value);
                                        this.setState({...this.state,hostelID:value});
                                        console.log(" preityy preity");
                                        
                                    }}>
                                    {this.state.hostels.map((option, index) => (
                                        <option key={index} value={option.Hostel_ID}>
                                          {option.Name}
                                        </option>
                                      ))}
                                </select>
                            </div>
                            <div className="form-floating my-3">
                                <input 
                                    type="number" 
                                    className="form-control"  
                                    id="room"
                                    onChange={(event)=> {                                    
                                        const value = event.target.value;
                                        this.setState({...this.state,roomID:value})
                                    } }
                                />
                                <label htmlFor="room">Room Number</label>
                            </div>
                            <div className="form-floating my-3">
                                <input 
                                    type="number" 
                                    className="form-control"  
                                    id="phone"
                                    onChange={(event)=> {                                    
                                        const value = event.target.value;
                                        this.setState({...this.state,phone:value})
                                    } }
                                />
                                <label htmlFor="phone">Phone Number</label>
                            </div>
                            <div className="form-floating my-3">
                                <input 
                                    type="text" 
                                    className="form-control"  
                                    id="gurdian"
                                    onChange={(event)=> {                                    
                                        const value = event.target.value;
                                        this.setState({...this.state,guardian_name:value})
                                    } }
                                />
                                <label htmlFor="gurdian">guardian name</label>
                            </div>
                            <div className="form-floating my-3">
                                <input 
                                    type="text" 
                                    className="form-control"  
                                    id="gurdian_address"
                                    onChange={(event)=> {                                    
                                        const value = event.target.value;
                                        this.setState({...this.state,guardian_address:value})
                                    } }
                                />
                                <label htmlFor="gurdian_address">guardian address</label>
                            </div>
                            <div className="form-floating my-3">
                                <input 
                                    type="number" 
                                    className="form-control"  
                                    id="gurdian_phone"
                                  //  onChange={(e)=>handleChange}
                                     onChange={(event)=> {                                    
                                         const value = event.target.value;
                                         this.setState({...this.state,guardian_phone:value})
                                     } }
                                />
                                <label htmlFor="gurdian_phone">guardian phone</label>
                            </div>
                            <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    onClick={this.addStudent}
                                >
                                    Submit
                                </button>
                                <p className="text-right my-4">
                                    <a href="http://localhost:3000/AdminReg">Not a student??</a>
                                </p>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }

}

export default Register;