import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function SignUpNavbar() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">DollarManager</Navbar.Brand>
                  <Nav className="justify-content-end">
                    <Nav.Link href="/Login">Login</Nav.Link>
                  </Nav>
            </Container>
        </Navbar>
      </>
    );
  }
  
  export default SignUpNavbar;