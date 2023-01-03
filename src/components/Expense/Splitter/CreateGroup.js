import ExpenseNavbar from "../ExpenseNavBar";
import SplitterNavBar from "./SplitterNavBar";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import localConfig from "../../../appConfig/local";

class CreateGroup extends Component {
  state = {
    groupName: "",
  };

  createGroup = async () => {
    if (this.state.groupName === "") {
      alert("Please enter GroupName.");
    } else {
      let userId = JSON.parse(localStorage.getItem("user-info"))._id;
      this.state = { ...this.state, userIds: [userId], createdBy: userId };
      let result = await fetch(
        // {{baseurl}}/public/api/v1/groupExpenses/createGroupExpense
        `${localConfig.apiUrl}/public/api/v1/groupExpenses/createGroup`,
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
        alert("Group created successfully!");
      }
      window.location.href = "/splitter/groups";
    }
  };

  render() {
    return (
      <div>
        <SplitterNavBar />
        <br />
        <div style={{ marginLeft: "30px", marginTop: "20px" }}>
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Group Name
              </Form.Label>
              <Col sm="4">
                <Form.Control
                  type="text"
                  placeholder="Item Name"
                  value={this.state.groupName}
                  onChange={(e) => {
                    this.setState({ groupName: e.target.value });
                  }}
                />
              </Col>
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={this.createGroup}>
            Create Group
          </Button>
        </div>
      </div>
    );
  }
}

export default CreateGroup;
