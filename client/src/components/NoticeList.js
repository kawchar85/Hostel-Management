import React, { useState, useEffect } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import UpdateHostel from './UpdateHostel';
import UpdateNotice from './UpdateNotice';
import RemoveNotice from './RemoveNotice';

export default function NoticeList() {

    const [notices, setNotices] = useState([]);
    const [edit, setEdit] = useState(false);
    const [del, setDel] = useState(false);
    const [delID, setDelID] = useState(0);
    const [data, setData] = useState(0);
    const [dateSort, setDateSort] = useState({
        up : true,
        down : true,
    });
    const [prioritySort, setPrioritySort] = useState({
        up : true,
        down : true,
    });
    const [hostelIdSort, setHostelIdSort] = useState({
        up : true,
        down : true,
    });

    const [sortBy, setSortBy] = useState({
        name: "DateTime",
        type: "DESC",
    });

    const getNotices = () => {
        Axios.get("http://localhost:3001/getData/notice", { params: { name: sortBy.name, type: sortBy.type } }).then((response) => {
            setNotices(response.data);
        });
    };

    useEffect(() => {
        getNotices();
    }, []);
    useEffect(() => {
        getNotices();
        console.log(notices)
    }, [sortBy]);
    
    const getLess = (s) => {
        if (s.length < 10) return s;
        else return s.substring(0, 7) + "...";
    }

    const handleClick = e => {
        e.preventDefault();
        const id = e.target.id;
        setEdit(true);
        setData(id);
    }
    const handleDelete = e => {
        e.preventDefault();
        const id = e.target.id;
        setDel(true);
        setDelID(id);
    }
    

    const handleDateAsc = () =>{
        setSortBy({name: "DateTime", type: "ASC"});
        setDateSort({down: true, up: false});
        setPrioritySort({down: true, up: true});
        setHostelIdSort({down: true, up: true});
    }
    const handleDateDesc = () =>{
        setSortBy({name: "DateTime", type: "DESC"});
        setDateSort({down: false, up: true});
        setPrioritySort({down: true, up: true});
        setHostelIdSort({down: true, up: true});
    }

    const handlePriorityAsc = () =>{
        setSortBy({name: "Priority", type: "ASC"});
        setPrioritySort({down: true, up: false});
        setDateSort({down: true, up: true});
        setHostelIdSort({down: true, up: true});
    }
    const handlePriorityDesc = () =>{
        setSortBy({name: "Priority", type: "DESC"});
        setPrioritySort({down: false, up: true});
        setDateSort({down: true, up: true});
        setHostelIdSort({down: true, up: true});
    }

    const handleHostelAsc = () =>{
        setSortBy({name: "Hostel_ID", type: "ASC"});
        setHostelIdSort({down: true, up: false});
        setDateSort({down: true, up: true});
        setPrioritySort({down: true, up: true});
    }
    const handleHostelDesc = () =>{
        setSortBy({name: "Hostel_ID", type: "DESC"});
        setHostelIdSort({down: false, up: true});
        setDateSort({down: true, up: true});
        setPrioritySort({down: true, up: true});
    }

    if (!edit && !del)
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
                                <th>
                                    Date Time
                                    {dateSort.up && (
                                    <button onClick={handleDateAsc} style={{
                                        border: "none",
                                        padding: "0px",
                                        background: "none",
                                    }} >
                                        &#9660;
                                    </button>)}

                                    {dateSort.down && (
                                    <button onClick={handleDateDesc} style={{
                                        border: "none",
                                        padding: "0px",
                                        background: "none",
                                    }} >
                                        &#9650;
                                    </button>)}
                                    
                                </th>
                                <th>Title</th>
                                <th>
                                    Hostel ID
                                    {hostelIdSort.up && (
                                    <button onClick={handleHostelAsc} style={{
                                        border: "none",
                                        padding: "0px",
                                        background: "none",
                                    }} >
                                        &#9660;
                                    </button>)}

                                    {hostelIdSort.down && (
                                    <button onClick={handleHostelDesc} style={{
                                        border: "none",
                                        padding: "0px",
                                        background: "none",
                                    }} >
                                        &#9650;
                                    </button>)}
                                </th>
                                <th>
                                    Priority
                                    {prioritySort.up && (
                                    <button onClick={handlePriorityAsc} style={{
                                        border: "none",
                                        padding: "0px",
                                        background: "none",
                                    }} >
                                        &#9660;
                                    </button>)}

                                    {prioritySort.down && (
                                    <button onClick={handlePriorityDesc} style={{
                                        border: "none",
                                        padding: "0px",
                                        background: "none",
                                    }} >
                                        &#9650;
                                    </button>)}
                                </th>
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
                                        <td><Button id={idx} key={idx} variant="link" onClick={e => handleDelete(e)} >Delete</Button></td>
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
    else if (edit) return (<UpdateNotice notice={notices[data]} />)
    else if (del) return (<RemoveNotice notice={notices[delID]} />)

}
