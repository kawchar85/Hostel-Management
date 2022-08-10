import React, { useState, useEffect } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import UpdateHostel from './UpdateHostel';
import UpdateNotice from './UpdateNotice';

export default function NoticeList() {

    const [notices, setNotices] = useState([]);
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState(0);

    const getNotices = () => {
        Axios.get("http://localhost:3001/getData/", { params: { table: "notice_board" } }).then((response) => {
            setNotices(response.data);
        });
    };

    useEffect(() => {
        getNotices();
    }, []);
    useEffect(() => {
        console.log("loaded data");
        console.log(data);
    }, [data,edit]);
    const getLess = (s)=>{
        if(s.length<10) return s;
        else return s.substring(0,7)+"...";
    }

    const handleClick = e => {
        e.preventDefault();
        const id = e.target.id;
        setEdit(true);
        setData(id);
    }

    const showEditPage = ()=>{
        if(edit) return (<UpdateHostel notice={data}/>);
        else return(<></>);
    }

    if(!edit)
    return (
        <>
            <div className="shadow p-4" style={{
                width: "85%",
                border: "3px solid lightGray",
                marginLeft: "auto",
                marginRight: "auto",
            }} >

                <Table striped bordered hover>
                    <thead style={{
                        color: "blue",
                        letterSpacing: "2px",
                        font: "normal 20px/1 Comic Sans MS,Verdana, Helvetica",
                    }}>
                        <tr>
                            <th>Date Time</th>
                            <th>Title</th>
                            <th>Hostel ID</th>
                            <th>Priority</th>
                            <th>Description</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {notices.map((val, idx) => {
                            return <React.Fragment key={idx}>
                                    <tr>
                                        <td>{val.DateTime}</td>
                                        <td>{getLess(val.Title)}</td>
                                        <td>{val.Hostel_ID}</td>
                                        <td>{val.Priority}</td>
                                        <td>{getLess(val.Description)}</td>
                                        <td><Button id={idx} key={idx} variant="link" onClick={e => handleClick(e)} >Edit</Button></td>
                                        <td>del</td>
                                    </tr>
                    
                                    </React.Fragment>
                            }
                        )}
                        
                        
                    </tbody>
                </Table>

            </div>
            <br /><br />
        </>
    )
    else return (<UpdateNotice notice={notices[data]} />)
}
