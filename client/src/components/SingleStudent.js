import React from 'react'

export default function SingleStudent(props) {
    
    console.log("single student");
    console.log(props);
    
    return (
        <React.Fragment key={props.data.Reg}>
        
        <div className="shadow p-4" style={{
            width: "40%",
            border: "3px solid green",
            borderRadius: "10px",
            marginLeft: "30px",
            marginRight: "10px",
            marginBottom: "50px",
            float:"left",
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

        </React.Fragment>
    )
}
