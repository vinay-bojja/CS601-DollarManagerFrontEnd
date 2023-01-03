import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { Component } from "react";

class ExpenseNavBar extends Component {
  state = {};

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">DollarManager</Navbar.Brand>
            <Nav className="justify-content-end">
              <Nav.Link href="/manageExpense/addExpense">
                ManageExpense
              </Nav.Link>
              <Nav.Link href="/splitter">Splitter</Nav.Link>
              <Nav.Link href="/view">View</Nav.Link>
              <Nav.Link href="/login" onClick={this.signOut}>
                SignOut
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }

  signOut() {
    localStorage.removeItem("user-info");
  }
}

export default ExpenseNavBar;
