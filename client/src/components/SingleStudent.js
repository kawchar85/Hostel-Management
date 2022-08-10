import React from 'react'

export default function SingleStudent(props) {
    
    console.log("single student");
    console.log(props);
    
    return (
        <>
        
        <div className="shadow p-4" style={{
            width: "60%",
            border: "3px solid green",
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
                {props.data.Name} 
            </div>
            
            <div style={{
                color: "#666",
                letterSpacing: "4px",
                font: "normal 20px/1 Comic Sans MS,Verdana, Helvetica",
            }}>
                Registration : {props.data.Reg}<br/>
                Dept : {props.data.Dept}<br/>
                Phone : {props.data.Phone}<br/>
            </div>

        </div>

        </>
    )
}
