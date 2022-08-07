import React, { useEffect, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Axios from 'axios';

//import { PublicContex } from './PublicContext';

export default function SawpManual() {
    //const [publicData, setPublicData] = useContext(PublicContex);

    const [show, setShow] = useState(false);
    const [finalMsg, setFinalMsg] = useState("");

    const [reg, setReg] = useState({
        reg1: 0,
        reg2: 0,
    })

    const [info, setInfo] = useState({
        
        hostel1: null,
        room1: null,
        hostel2: null,
        room2: null
        
    })

    const [ready, setReady] = useState(true);
    const [user1, setUser1] = useState(null);
    const [user2, setUser2] = useState(null);

    const [error, setError] = useState({
        reg1: "* field is required",
        reg2: "* field is required",
    })

    useEffect(() => {
        console.log("effect... loading");
        console.log(info);

        const isOk = Object.values(info).every(x => x !== null);

        if(isOk && ready && reg.reg1 && reg.reg2){
            console.log("Ready to swap");
            setReady(false);
            console.log(info);
            setReg1();
        }
        

    }, [info]);

    const setReg2 = async () => {
        console.log("set reg 2 aise");
        setInfo(latestInfoState => { return {...latestInfoState} });
        try{
                await Axios.put("http://localhost:3001/update/students", {
                    reg: reg.reg2,
                    hostel_id: info.hostel1,
                    room_id: info.room1,

                }).then((response) => {

                    if(response.data === "error"){
                        setFinalMsg("Something Error!!");
                    } else {
                        setFinalMsg("Room Updated successfully...\n"+reg.reg1+" is assigned to Hostel: "+info.hostel2+", Room: "+info.room2+". \n"+reg.reg2+" is assigned to Hostel: "+info.hostel1+", Room: "+info.room1);
                    }
                    setShow(true);
                }).catch((e) => alert(e));
        } 
        catch(err) {
            console.log('err:  '+ err );
        }
    }

    const setReg1 = async () => {
        console.log("set reg 1 o dukse");
        setInfo(latestInfoState => { return {...latestInfoState} });
        console.log(info);

        try{
                await Axios.put("http://localhost:3001/update/students", {
                    reg: reg.reg1,
                    hostel_id: info.hostel2,
                    room_id: info.room2,

                }).then((response) => {
                    if(response.data === "error"){
                        setFinalMsg("Something Error!!");
                    } else {
                        setReg2();
                    }
                }).catch((e) => alert(e));
        } 
        catch(err) {            
            console.log('err:  '+ err );
        }
    }
    
    const checkReg2 = async (reg2) => {
        try {
                await Axios.get("http://localhost:3001/getData/student", { params: { reg: reg2 } }).then( (response)=>{

                    if(response.data === "error"){
                        alert("Something error!!");
                    } else if (response.data === "notRegistered"){
                        setError({ ...error, reg2: "Reg2 is not registered!!" });
                    } else {
                        //let data = JSON.stringify(response.data[0]);
                        let data = response.data[0];
                        console.log("res2 data");
                        console.log(data);
                        setInfo(latestInfoState => { return {...latestInfoState, hostel2: data.Hostel_ID, room2: data.Room_ID } });
                        
                       // setInfo({ ...info, hostel2: data.Hostel_ID, room2: data.Room_ID});
                    
                        //setUser2(data);
                        //setReg1();
                        console.log("ok??????");
                    }

                });
                
        }
        catch(err) {
            console.log('err:  '+ err );
        }
    }


    const handleSubmit =  (event) => {

        event.preventDefault();
        //check erro?
        const isEmpty = Object.values(error).every(x => x === null || x === "");
        console.log(isEmpty);
        console.log(error);
        
        if (isEmpty) {

            try {
                Axios.get("http://localhost:3001/getData/student", { params: { reg: reg.reg1 } }).then((response) =>{
                    if(response.data === "error"){
                        alert("Something error!!");
                    } else if (response.data === "notRegistered"){
                        setError({ ...error, reg1: "Reg1 is not registered!!" });
                    } else {
                        //let data = JSON.stringify(response.data[0]);
                        let data = response.data[0];
                        console.log("res1 data");
                        console.log(data);
                        setInfo(latestInfoState => { return {...latestInfoState, hostel1: data.Hostel_ID, room1: data.Room_ID } });

                        //setInfo({ ...info, room1: data.Room_ID, hostel1: data.Hostel_ID});
                        //setInfo({ ...info, hostel1: data.Hostel_ID});
                        
                        //setUser1(data);

                        checkReg2(reg.reg2);
                    }
                });


                
       } catch(err) {
            console.log('err:  '+ err );
       }

        //     try {
        //         const response = await Axios.get("http://localhost:3001/getData/student", { params: { reg: reg.reg1 } });
        //         if(response.data === "error"){
        //             alert("Something error!!");
        //         } else if (response.data === "notRegistered"){
        //             setError({ ...error, reg1: "Reg1 is not registered!!" });
        //         } else {
        //             //let data = JSON.stringify(response.data[0]);
        //             let data = response.data[0];
        //             console.log("res data");
        //             console.log(data);
        //             console.log("baaal: "+ JSON.stringify(data.Hostel_ID) + " ?? "+ data.Room_ID);
        //             console.log(typeof data);
        //             console.log(typeof JSON.stringify(data.Hostel_ID));
        //             console.log(typeof data.Room_ID);
        //             console.log(typeof info.hostel1);
        //             setInfo({ ...info, hostel1: JSON.stringify(data.Hostel_ID) });
        //             setInfo({ ...info, room1: data.Room_ID });

        //             hostel1 = data.Hostel_ID;
        //             room1 = data.Room_ID;

        //             console.log("check: "+hostel1+" --- "+room1);

        //             console.log("here "+ info);

        //             setOkReg1(true);
        //         }
        //    } catch(err) {
        //         console.log('err:  '+ err );
        //    }


            // Axios.get("http://localhost:3001/getData/student", { params: { reg: reg.reg1 } }).then((response) => {
            //     if(response.data === "error"){
            //         alert("Something error!!");
            //     } else if (response.data === "notRegistered"){
            //         setError({ ...error, reg1: "Reg1 is not registered!!" });
            //     } else {
            //         //let data = JSON.stringify(response.data[0]);
            //         let data = response.data[0];
            //         console.log("res data");
            //         console.log(data);
            //         console.log("baaal: "+ JSON.stringify(data.Hostel_ID) + " ?? "+ data.Room_ID);
            //         console.log(typeof data);
            //         console.log(typeof JSON.stringify(data.Hostel_ID));
            //         console.log(typeof data.Room_ID);
            //         console.log(typeof info.hostel1);
            //         setInfo({ ...info, hostel1: JSON.stringify(data.Hostel_ID) });
            //         setInfo({ ...info, room1: data.Room_ID });

            //         hostel1 = data.Hostel_ID;
            //         room1 = data.Room_ID;

            //         console.log("check: "+hostel1+" --- "+room1);

            //         console.log("here "+ info);

            //         setOkReg1(true);
            //     }
            // }).catch((e) => alert(e));


            // console.log(OkReg1 + " ... "+ OkReg2);
            // //if(OkReg1){
            //     const response2 = await Axios.get("http://localhost:3001/getData/student", { params: { reg: reg.reg2 } });
            //     if(response2.data === "error"){
            //         alert("Something error!!");
            //     } else if (response2.data === "notRegistered"){
            //         setError({ ...error, reg2: "Reg2 is not registered!!" });
            //     } else {
            //         let data = response2.data[0];
            //         hostel2 = data.Hostel_ID;
            //         room2 = data.Room_ID;

            //         console.log("check2: "+hostel2+" --- "+room2);

            //         setOkReg2(true);
            //         setShow(true);
            //     }
                
                // Axios.get("http://localhost:3001/getData/student", { params: { reg: reg.reg2 } }).then((response) => {
                //     if(response.data === "error"){
                //         alert("Something error!!");
                //     } else if (response.data === "notRegistered"){
                //         setError({ ...error, reg2: "Reg2 is not registered!!" });
                //     } else {
                //         let data = response.data[0];
                //         hostel2 = data.Hostel_ID;
                //         room2 = data.Room_ID;

                //         console.log("check2: "+hostel2+" --- "+room2);

                //         setOkReg2(true);
                //         setShow(true);
                //     }
                // }).catch((e) => alert(e));
            //}


                // Axios.put("http://localhost:3001/update/hostel", {
                //     hostel_id: hostel.id,
                //     type: hostel.type,
                //     name: hostel.name,
                //     address: hostel.address,
                //     contact: hostel.contact,
                //     occupied_seats: hostel.occupied_seats,
                //     total_seats: hostel.total_seats,
        
                // }).then((response) => {
                //     if(response.data === "error"){
                //         console.log("baaal error");
                //         setFinalMsg("Something Error!!");
                //     } else {
                //         setFinalMsg("Hostel Updated successfully...");
                //     }
                //     setShow(true);
                // }).catch((e) => alert(e));
                
        }

    };

    return (
        <>
        <div className="shadow p-4" style={{
            width: "60%",
            border: "3px solid lightGray",
            marginLeft: "auto",
            marginRight: "auto",
        }} >
            <Alert show={show} variant="success">
                <Alert.Heading>How's it going?!</Alert.Heading>
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
                    <Form.Group className="mb-3" controlId="hostelName">
                        <Form.Label>Reg of std 1</Form.Label>
                        <Form.Control type="number" placeholder="Registration number of std 1" onChange={(event) => {
                            const value = event.target.value;
                            setReg({ ...reg, reg1: value });
                            let msg = "";
                            if (value.length === 0)
                                msg = "* field is required";
                            else if (value.length < 10)
                                msg = "Too short! Registration number must be 10 digits.";
                            else if (value.length > 10)
                                msg = "Too long!";
                            setError({ ...error, reg1: msg });
                        }} />
                        <span className="text-danger">{error.reg1}</span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="hostelName">
                        <Form.Label>Reg of std 2</Form.Label>
                        <Form.Control type="number" placeholder="Registration number of std 2" onChange={(event) => {
                            const value = event.target.value;
                            setReg({ ...reg, reg2: value });
                            let msg = "";
                            if (value.length === 0)
                                msg = "* field is required";
                            else if (value.length < 10)
                                msg = "Too short! Registration number must be 10 digits.";
                            else if (value.length > 10)
                                msg = "Too long!";
                            setError({ ...error, reg2: msg });
                        }} />
                        <span className="text-danger">{error.reg2}</span>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Swap Room
                    </Button>
                </Form>
            )}
        </div>
        <br/><br/>
        </>
    )
}
