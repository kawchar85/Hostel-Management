import React from 'react'
import { NavDropdown } from 'react-bootstrap';

export default function SingleHostel(props) {
    let link = "/hostel/" + props.Hostel_ID;
    return (
        <NavDropdown.Item href={link} > {props.Name} </NavDropdown.Item>
    )
}
