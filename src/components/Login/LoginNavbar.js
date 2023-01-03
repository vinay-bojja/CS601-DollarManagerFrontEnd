import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function LoginNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
          <Navbar.Brand href="/">DollarManager</Navbar.Brand>
            <Nav  className="justify-content-end">
              <Nav.Link href="/SignUp">SignUp</Nav.Link>
            </Nav>
      </Container>
    </Navbar>
  );
}

export default LoginNavbar;
