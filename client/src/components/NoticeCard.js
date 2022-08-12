import React, { useState, useEffect, useContext } from 'react'

export default function NoticeCard(props) {

    return (
        <React.Fragment key={props.id}>

            <div className="shadow p-4" style={{
                width: "60%",
                border: "3px solid #d3e5ff",
                borderRadius: "10px",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "40px",
                marginTop: "10px",
            }} >

                <div style={{
                    color: "#666",
                    letterSpacing: "4px",
                    font: "normal 30px/1 Gabriola,Verdana, Helvetica",
                    fontWeight: 'bold',
                }}>
                    {props.notice.Title}
                </div>
                <div style={{
                    color: "#666",
                    font: "normal 15px/1 Verdana, Helvetica",
                }}>
                    {props.notice.DateTime}</div>
                <hr style={{ backgroundColor: 'green', height: 2.2, }} />

                <div style={{
                    color: "#666",
                    letterSpacing: "3px",
                    font: "normal 20px/1 Helvetica",
                }}>
                    {props.notice.Description}

                </div>

            </div>

        </React.Fragment>

    )
}
