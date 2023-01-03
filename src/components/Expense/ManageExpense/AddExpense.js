import React, { Component } from "react";
import ManageExpense from "./ManageExpense";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import localConfig from "../../../appConfig/local";

class AddExpense extends Component {
  state = {
    itemName: "",
    itemCategory: "",
    cost: "",
  };

  addExpense = async () => {
    if (this.state.itemName === "" || this.state.itemCategory === "") {
      alert("Please enter missing fields.");
    } else if (isNaN(this.state.cost) || this.state.cost === "") {
      alert("Please enter a valid cost.");
    } else {
      let userId = JSON.parse(localStorage.getItem("user-info"))._id;
      let result = await fetch(
        `${localConfig.apiUrl}/public/api/v1/expense/addExpense?userId=${userId}`,
        {
          method: "POST",
          body: JSON.stringify(this.state),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      result = await result.json;
      if (result != null) {
        alert("Expense added successfully!");
      }
    }
  };

  render() {
    return (
      <div>
        <ManageExpense />
        <div style={{ marginLeft: "30px", marginTop: "20px" }}>
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Item Name
              </Form.Label>
              <Col sm="4">
                <Form.Control
                  type="text"
                  placeholder="Item Name"
                  value={this.state.itemName}
                  onChange={(e) => {
                    this.setState({ itemName: e.target.value });
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Item Category
              </Form.Label>
              <Col sm="4">
                <Form.Control
                  type="text"
                  placeholder="Item Category"
                  value={this.state.itemCategory}
                  onChange={(e) => {
                    this.setState({ itemCategory: e.target.value });
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Cost
              </Form.Label>
              <Col sm="4">
                <Form.Control
                  type="text"
                  placeholder="Cost"
                  value={this.state.cost}
                  onChange={(e) => {
                    this.setState({ cost: e.target.value });
                  }}
                />
              </Col>
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={this.addExpense}>
            Add Expense
          </Button>
        </div>
      </div>
    );
  }
}

export default AddExpense;
