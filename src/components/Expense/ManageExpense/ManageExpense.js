import ExpenseNavbar from "../ExpenseNavBar";
import { Component } from "react";
import Nav from "react-bootstrap/Nav";

class ManageExpense extends Component {
  render() {
    return (
      <div>
        <ExpenseNavbar />
        <Nav justify variant="tabs" defaultActiveKey="/manageExpense">
          <Nav.Item>
            <Nav.Link href="/manageExpense/addExpense" eventKey="link-1">Add Expense</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/manageExpense/updateExpense" eventKey="link-2">Update Expense</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/manageExpense/deleteExpense" eventKey="link-3">Delete Expense</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default ManageExpense;
