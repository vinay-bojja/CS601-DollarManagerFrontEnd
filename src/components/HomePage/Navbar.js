import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { Component } from 'react'

class NavBar extends Component {
    state = {  } 
    render() { 
        return(
            <>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">DollarManager</Navbar.Brand>
                            <Nav className="justify-content-end">
                            {/* <Nav.Link href="/AboutUs">AboutUs</Nav.Link> */}
                            {/* <Nav.Link href="/ContactUs">ContactUs</Nav.Link> */}
                            <Nav.Link href="/Login">Login/SignUp</Nav.Link>
                            </Nav>
                    </Container>
                </Navbar>
            </>
            ); 
    }
}
 
export default NavBar;