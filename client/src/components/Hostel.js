import React, { useState, useEffect, useContext } from 'react'
import Axios from 'axios';
import { useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';


import { PublicContex } from './PublicContext';
import RoomDetails from './RoomDetails';


export default function Hostel() {

  const [publicData, setPublicData] = useContext(PublicContex);

  const {id} = useParams();
  const [modalShow, setModalShow] = React.useState([]);
  const [hostelData, setHostelData] = useState({
    Hostel_ID: 0,
    Type: "Loading...",
    Name: "Hostel Name Loading...",
    Address: "Loading...",
    Contact: "Loading...",
    Total_Seats: 0,
    Occupied_Seats: 0,
});

const [rooms, setRooms] = useState([]);
const [roomID, setRoomID] = useState(0);

  const getData = async () => {

    await Axios.get("http://localhost:3001/getData/hostel", { params: { hostel_id: id } }).then((response) => {
        if(response.data === "error"){
            alert("Invalid Hostel ID!!!");
        } else {
              let data = response.data[0];
              console.log("res data");
              console.log(data);
              setHostelData({...hostelData,Hostel_ID: data.Hostel_ID, Type:data.Type, Name: data.Name, Address: data.Address, Contact: data.Contact, Total_Seats: data.Total_Seats, Occupied_Seats: data.Occupied_Seats});
        }
    }).catch((e) => alert(e));

  };
  
    const getRooms = async () => {
    await Axios.get("http://localhost:3001/getData/rooms", { params: { hostel_id: id } }).then((response) => {
          if(response.data === "error"){
              alert("Something Error");
          } else {
              setRooms(response.data);
              const arr = Array(response.data.length).fill(false);
              console.log("length ----> ");
              console.log(arr);
              setModalShow(arr);
              setPublicData({...publicData,modalShow: arr});

          }
        }).catch((e) => alert(e));
    };
  
  useEffect(() => {
    console.log("data loading");
    getData();
    getRooms();
  }, []);

  useEffect(() => {
    console.log("Loaded data");
    console.log(hostelData);
    console.log(rooms)
  }, [hostelData,rooms]);

  const handleClick = e => {
    e.preventDefault();
    const id = e.target.id;
    setRoomID(rooms[id].Room_ID);
    const arr = modalShow;
    arr[id] = true;
    setModalShow(arr);
    setPublicData({...publicData,modalShow: arr});

  };

  return (
    <>
    <div style={{
            textShadow: "#f9fafb 0px 1px 0px, #0d6efd 3px 3px 3px",
            textAlign: "center",
            color: "#666",
            margin: "0 0 30px 0",
            letterSpacing: "4px",
            font: "normal 30px/2 Segoe Print,Verdana, Helvetica",
            position: "relative",
        }} >          
          
          {hostelData.Name}
        </div>

        <div className="shadow p-4" style={{
            width: "60%",
            border: "3px solid #d3e5ff",
            borderRadius: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "50px",
        }} > 

            <div style={{
                color: "#666",
                letterSpacing: "4px",
                font: "normal 30px/1 Gabriola,Verdana, Helvetica",
                fontWeight: 'bold',
            }}>
                <Spinner animation="grow" variant="info" />
                Summary 
            </div>

            <hr style={{ backgroundColor: 'green', height: 2.2, }} />
            
            <div style={{
                color: "#666",
                letterSpacing: "4px",
                font: "normal 20px/1 Comic Sans MS,Verdana, Helvetica",
            }}>
              Total Seats : {hostelData.Total_Seats} <br/>
              Occupied Seats : {hostelData.Occupied_Seats} <br/>
              Type : {hostelData.Type} <br/>
              Office : {hostelData.Address} <br/>
              Contact : {hostelData.Contact}

                
            </div>
        
        </div>


        <div className="shadow p-4" style={{
            width: "60%",
            border: "3px solid #d3e5ff",
            borderRadius: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "50px",
        }} > 

            <div style={{
                color: "#666",
                letterSpacing: "4px",
                font: "normal 30px/1 Gabriola,Verdana, Helvetica",
                fontWeight: 'bold',
            }}>
                <Spinner animation="grow" variant="primary" />
                Rooms 
            </div>

            <hr style={{ backgroundColor: '#16d59a', height: 2.2, }} />
            
            <div style={{
                color: "#666",
                letterSpacing: "4px",
                font: "normal 20px/1 Comic Sans MS,Verdana, Helvetica",
            }}>

              {rooms.map((val, idx) => {
                  return <React.Fragment key={idx}>
                          <Button id={idx} key={idx} variant="link" onClick={e => handleClick(e)} >{val.Room_ID}, </Button>
                          <RoomDetails 
                              id={idx}
                              room_id = {val.Room_ID}
                              hostel_id = {id}
                          />
                        </React.Fragment>
                }
              )}

              
              
            </div>
        
        </div>

        <div className="shadow p-4" style={{
            width: "60%",
            border: "3px solid #d3e5ff",
            borderRadius: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "50px",
        }} > 
            <div style={{
                color: "#666",
                letterSpacing: "4px",
                font: "normal 30px/1 Gabriola,Verdana, Helvetica",
                fontWeight: 'bold',
            }}>
                <Spinner animation="grow" variant="warning" />
                Administration
            </div>

            <hr style={{ backgroundColor: '#786017', height: 2.2, }} />
            
            <div style={{
                color: "#666",
                letterSpacing: "4px",
                font: "normal 20px/1 Comic Sans MS,Verdana, Helvetica",
            }}>
              Provost: Abdul Karim<br/>
              Assistant Provost: Kuddus Sir<br/>
              Assistant Provost: Abc Xyz<br/>
              Supervisor: Shanto Ahmed
              
            </div>

        </div>
    </>


  )
}
