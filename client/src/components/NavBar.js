import React, { useEffect, useState, useContext } from 'react'
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import Axios from 'axios';
import SingleHostel from './SingleHostel';

import { PublicContex } from './PublicContext';

export default function NavBar(props) {

    const [publicData, setPublicData] = useContext(PublicContex);
    
    const handleClick = (selectedKey) => {
        //alert(`selected ${selectedKey}`);
        const msg = "You are in " + selectedKey;
        props.info(msg); //passing data to App.js
    }

    function isLogged() {
        return false;
    }
    function isAdministration() {
        return true;
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

                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/hostel/420">Custom Test</NavDropdown.Item>

                            </NavDropdown>


                            <Nav.Link href={"/" + page1}>{page1}</Nav.Link>
                            <Nav.Link href={"/" + page2}>{page2}</Nav.Link>
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


