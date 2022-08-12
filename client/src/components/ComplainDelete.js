import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import ComplainView from './ComplainView';
import {Button} from 'react-bootstrap'
import RemoveComplain from './RemoveComplain';

export default function ComplainDelete() {

    const [complains, setComplains] = useState([]);
    const [del, setDel] = useState(false);
    const [id, setId] = useState(0);
    const [dateSort, setDateSort] = useState({
        up : true,
        down : true,
    });
    const [regSort, setRegSort] = useState({
        up : true,
        down : true,
    });

    const [sortBy, setSortBy] = useState({
        name: "DateTime",
        type: "DESC",
    });

    const getComplains = () => {
        Axios.get("http://localhost:3001/getData/complain", { params: { name: sortBy.name, type: sortBy.type } }).then((response) => {
            setComplains(response.data);
        });
    };

    useEffect(() => {
        getComplains();
    }, [sortBy]);
    
    const getLess = (s) => {
        if (s.length < 10) return s;
        else return s.substring(0, 7) + "...";
    }
    const handleDateAsc = () =>{
        setSortBy({name: "DateTime", type: "ASC"});
        setDateSort({down: true, up: false});
        setRegSort({down: true, up: true});
    }
    const handleDateDesc = () =>{
        setSortBy({name: "DateTime", type: "DESC"});
        setDateSort({down: false, up: true});
        setRegSort({down: true, up: true});
    }

    const handleRegAsc = () =>{
        setSortBy({name: "Std_reg", type: "ASC"});
        setRegSort({down: true, up: false});
        setDateSort({down: true, up: true});
    }
    const handleRegDesc = () =>{
        setSortBy({name: "Std_reg", type: "DESC"});
        setRegSort({down: false, up: true});
        setDateSort({down: true, up: true});
    }

    const handleClick = e => {
        e.preventDefault();
        setDel(true);
        setId(e.target.id);
    }

    if(!del)
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
                                <th>
                                    Std Reg
                                    {regSort.up && (
                                    <button onClick={handleRegAsc} style={{
                                        border: "none",
                                        padding: "0px",
                                        background: "none",
                                    }} >
                                        &#9660;
                                    </button>)}

                                    {regSort.down && (
                                    <button onClick={handleRegDesc} style={{
                                        border: "none",
                                        padding: "0px",
                                        background: "none",
                                    }} >
                                        &#9650;
                                    </button>)}
                                </th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {complains.map((val, idx) => {
                                return <React.Fragment key={idx}>
                                    <tr>
                                        <td>{val.DateTime}</td>
                                        <td>{val.Std_reg}</td>
                                        <td>{getLess(val.Title)}</td>
                                        <td>{getLess(val.Description)}</td>
                                        <td><Button id={idx} key={idx} variant="link" onClick={e => handleClick(e)} >Delete</Button></td>
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
    else if (del) return (<RemoveComplain complain={complains[id]} />)
}
