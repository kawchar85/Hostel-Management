import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import RoomDetails from './RoomDetails';


export default function Hostel() {

  const {id} = useParams();
  const [modalShow, setModalShow] = React.useState(false);
  const [hostelData, setHostelData] = useState(null);

  const getData = async () => {

     await Axios.get("http://localhost:3001/getData/hostel", { params: { hostel_id: id } }).then((response) => {
        if(response.data === "error"){
            alert("Something Error!!");
        } else {
            let data = JSON.stringify(response.data[0]);
            console.log("res data");
            console.log(data);
            setHostelData(data);
            console.log("hostel data");
            console.log(hostelData);
        }
    }).catch((e) => alert(e));
  };
  
  useEffect(() => {
    console.log("data loading");
    getData();

  }, [id]);

  useEffect(() => {
    console.log("Loaded data");
    console.log(hostelData);
  }, [hostelData]);

  const handleClick = e => {
    e.preventDefault();
    console.log(e.target.id);
    setModalShow(true);
    
  };
  return (
    <>
    <div>Hostel {id} </div>

    <div style={{
            textShadow: "#f9fafb 0px 1px 0px, #0d6efd 3px 3px 3px",
            textAlign: "center",
            color: "#666",
            margin: "0 0 30px 0",
            letterSpacing: "4px",
            font: "normal 30px/2 Segoe Print,Verdana, Helvetica",
            position: "relative",
        }} >
          {JSON.parse(hostelData)}
          
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
              Total Seats : {JSON.parse(hostelData).Total_Seats} <br/>
              Occupied Seats : {JSON.parse(hostelData).Occupied_Seats} <br/>
              Type : {JSON.parse(hostelData).Type} <br/>
              Provost : ???(different card?)<br/> 
              Office : {JSON.parse(hostelData).Address} <br/>
              Contact : {JSON.parse(hostelData).Contact}
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
              <Button id={1} variant="link" onClick={e => handleClick(e)} >1</Button>, 2, 3, 4, 5, 6 <br/>
              7, 8, 9, 10, 11, 12<br/>

              <RoomDetails 
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    id={12}
              />
              
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
                Seat Available in Room(s) 
            </div>

            <hr style={{ backgroundColor: '#786017', height: 2.2, }} />
            
            <div style={{
                color: "#666",
                letterSpacing: "4px",
                font: "normal 20px/1 Comic Sans MS,Verdana, Helvetica",
            }}>
              1, 2, 4, 6 <br/>
              8, 10, 12<br/>
              
            </div>

        </div>
    </>


  )
}
