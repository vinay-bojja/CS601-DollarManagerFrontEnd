import SplitterNavBar from "./SplitterNavBar";
import React from "react";
import { useState, useEffect } from "react";
import localConfig from "../../../appConfig/local";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Notifications = () => {
  const [groupExpenses, setGroupExpenses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let userId = JSON.parse(localStorage.getItem("user-info"))._id;
    fetch(
      `${localConfig.apiUrl}/public/api/v1/groupExpenses/getUserPendingApprovalExpense?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    ).then((groupExpenses) => {
      groupExpenses.json().then((groupExpensesJson) => {
        setGroupExpenses(groupExpensesJson.result);
      });
    });
  });

  async function approveExpense(groupExpenseId) {
    let userId = JSON.parse(localStorage.getItem("user-info"))._id;

    let body = {
      expenseApprovedByUser: {},
    };
    body.expenseApprovedByUser[userId] = message;

    let result = await fetch(
      `${localConfig.apiUrl}/public/api/v1/groupExpenses/updateGroupExpenseDetail?groupExpenseDetailsId=${groupExpenseId}&isApproved=1`,
      {
        method: "PUT",
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
      alert("Accepted group expense successfully.");
      window.location.reload(true);
    } else {
      alert(result.error);
    }
  }

  async function rejectExpense(groupExpenseId) {
    let userId = JSON.parse(localStorage.getItem("user-info"))._id;

    let body = {
      expenseRejectedByUser: {},
    };
    body.expenseRejectedByUser[userId] = message;

    let result = await fetch(
      `${localConfig.apiUrl}/public/api/v1/groupExpenses/updateGroupExpenseDetail?groupExpenseDetailsId=${groupExpenseId}&isApproved=0`,
      {
        method: "PUT",
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
      alert("Rejected group expense successfully.");
      window.location.reload(true);
    } else {
      alert(result.error);
    }
  }

  return (
    <div>
      <SplitterNavBar />
      {/* {groupExpenses.map((groupExpense) => {
        return <h1>{groupExpense.itemName}</h1>;
      })} */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item</th>
            <th>Category</th>
            <th>Cost</th>
            <th>PaidBy</th>
          </tr>
        </thead>
        <tbody>
          {groupExpenses.map((groupExpense) => {
            return (
              <tr key={groupExpense._id}>
                <td>{groupExpense.itemName}</td>
                <td>{groupExpense.itemCategory}</td>
                <td>{groupExpense.cost}</td>
                <td>{groupExpense.paidBy.name}</td>
                <td>
                  <Form>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Col sm="14">
                        <Form.Control
                          type="text"
                          placeholder="Enter message"
                          onChange={(e) => {
                            setMessage(e.target.value);
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Form>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => approveExpense(`${groupExpense._id}`)}
                  >
                    Approve
                  </Button>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => rejectExpense(`${groupExpense._id}`)}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Notifications;
