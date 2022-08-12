import React, { useEffect, useState, useContext } from 'react'
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import Axios from 'axios';
import SingleHostel from './SingleHostel';
import { storeData, getData, eraseData} from '../App';

import { PublicContex } from './PublicContext';

export default function NavBar(props) {

    const [publicData, setPublicData] = useContext(PublicContex);
    
    const handleClick = (selectedKey) => {
        //alert(`selected ${selectedKey}`);
        const msg = "You are in " + selectedKey;
        props.info(msg); //passing data to App.js
    }

    function isLogged() {
        console.log("Ultimate check");
        console.log(getData("user_role_id")>0);
        return (getData("user_role_id")>0);
    }
    function isAdministration() {
        return getData("user_role_id")>10;
    }

    const onClick = (event) => {
        storeData("user_role_id", -1);
        storeData("user_email", "");
        console.log(getData("user_role_id"));
    }

    let page1, page2;
    if (isLogged()) {
        page1 = "Profile";
        page2 = "Logout";
    }
    else {
        page1 = "Login";
        page2 = "Signup";
    }

    return (
        <div>
            <Navbar bg="dark" variant='dark' expand="lg">
                <Container fluid>
                    <Navbar.Brand ><b>Hostel Management</b></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                            onSelect={handleClick}
                        >
                            <Nav.Link href="/home">Home</Nav.Link>

                            <NavDropdown title="Hostels" id="navbarScrollingDropdown">
                                {publicData.hostel.map((val, idx) => {
                                    return <SingleHostel Hostel_ID={val.Hostel_ID} Name={val.Name} key={idx} />
                                }
                                )}

                                

                            </NavDropdown>

                            {isLogged() && isAdministration && (
                                <Nav.Link href={"/admin" + page1}>{page1}</Nav.Link>
                            ) }
                            {isLogged() && !isAdministration && (
                                <Nav.Link href={"/" + page1}>{page1}</Nav.Link>
                            ) }
                            {!isLogged() && (
                                <Nav.Link href={"/" + page1}>{page1}</Nav.Link>
                            ) }
                            {isLogged() && (
                                <Nav.Link onClick={onClick} href={"/home"}>{page2}</Nav.Link>
                            )}
                            {!isLogged() && (
                                <Nav.Link href={"/" + page2}>{page2}</Nav.Link>
                            )}

                            {!isAdministration() && isLogged() && (
                                <Nav.Link href={"/complain"}>Complain</Nav.Link>
                            )

                            }

                            {isAdministration()&&(<Nav.Link href="/administration">Administration</Nav.Link>)}                            

                        </Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    )
}


