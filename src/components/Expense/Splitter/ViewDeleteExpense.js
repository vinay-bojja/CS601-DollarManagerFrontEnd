import SplitterNavBar from "./SplitterNavBar";
import localConfig from "../../../appConfig/local";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GroupNavBar from "./GroupNavBar";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";

const ViewDeleteExpense = () => {
  const params = useParams();
  const [group, setGroup] = useState({});
  const [groupExpenses, setGroupExpenses] = useState([]);
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

    fetch(
      `${localConfig.apiUrl}/public/api/v1/groupExpenses/getGroupExpenseDetail?groupId=${params.groupId}`,
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
  }, [params.id]);

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
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Expense Details</Accordion.Header>
                      <Accordion.Body>
                        <Table striped bordered hover size="sm">
                          <thead>
                            <tr>
                              <th>Expense Approval Status: Accepted</th>
                            </tr>
                          </thead>
                          <tbody>
                            {groupExpense.approvedUsers.map((user) => {
                              return (
                                <tr key={user._id}>
                                  <td>{user.name}</td>
                                </tr>
                              );
                            })}
                          </tbody>

                          <thead>
                            <tr>
                              <th>Expense Approval Status: Rejected</th>
                            </tr>
                          </thead>
                          <tbody>
                            {groupExpense.rejectedUsers.map((user) => {
                              return (
                                <tr key={user._id}>
                                  <td>{user.name}</td>
                                </tr>
                              );
                            })}
                          </tbody>

                          <thead>
                            <tr>
                              <th>Expense Approval Status: Pending</th>
                            </tr>
                          </thead>
                          <tbody>
                            {groupExpense.pendingUsers.map((user) => {
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewDeleteExpense;
