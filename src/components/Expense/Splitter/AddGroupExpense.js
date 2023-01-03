import SplitterNavBar from "./SplitterNavBar";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GroupNavBar from "./GroupNavBar";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import localConfig from "../../../appConfig/local";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";

const AddGroupExpense = () => {
  const params = useParams();
  const [group, setGroup] = useState({});
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [cost, setCost] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(
      `${localConfig.apiUrl}/public/api/v1/groupExpenses/getGroup?groupId=${params.groupId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    ).then((group) => {
      group.json().then((groupJson) => {
        setGroup(groupJson.result);
        setUsers(groupJson.result.userIds);
      });
    });
  }, [params.id]);

  async function addGroupExpense() {
    let userId = JSON.parse(localStorage.getItem("user-info"))._id;
    let body = {
      groupId: params.groupId,
      itemName: itemName,
      itemCategory: itemCategory,
      cost: cost,
      paidBy: userId,
    };

    if (itemName === "" || itemCategory === "") {
      alert("Please enter missing fields.");
    } else if (isNaN(cost) || cost === "") {
      alert("Please enter a valid cost.");
    } else {
      let result = await fetch(
        `${localConfig.apiUrl}/public/api/v1/groupExpenses/createGroupExpenseDetail`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      result = await result.json();
      console.log(result);
      if (result.error == null) {
        alert("Group Expense Successfully");
        window.location.href = `/splitter/groups/viewdeletegroupexpense/${params.groupId}`;
      } else {
        alert(result.error);
      }
    }
  }

  return (
    <div>
      <SplitterNavBar />
      <h1>Group Name: {group.groupName} </h1>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="1">
          <Accordion.Header>Group Members</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover size="sm">
              <tbody>
                {users.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <br />
      <GroupNavBar groupId={params.groupId} />
      {/* AddExpense page */}
      <div>
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
                  value={itemName}
                  onChange={(e) => {
                    setItemName(e.target.value);
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
                  value={itemCategory}
                  onChange={(e) => {
                    setItemCategory(e.target.value);
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
                  value={cost}
                  onChange={(e) => {
                    setCost(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={addGroupExpense}>
            Add Expense
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddGroupExpense;
