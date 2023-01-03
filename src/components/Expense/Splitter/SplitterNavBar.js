import ExpenseNavbar from "../ExpenseNavBar";
import { Component } from "react";
import Nav from "react-bootstrap/Nav";

class SplitterNavBar extends Component {
  render() {
    return (
      <div>
        <ExpenseNavbar />
        <Nav justify variant="tabs">
          <Nav.Item>
            <Nav.Link href="/splitter/groups" eventKey="link-1">Groups</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/splitter/notification" eventKey="link-2">Notification</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default SplitterNavBar;
