import SplitterNavBar from "./SplitterNavBar";
import localConfig from "../../../appConfig/local";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GroupNavBar from "./GroupNavBar";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

const Balance = () => {
  const params = useParams();
  const [group, setGroup] = useState({});
  const [users, setUsers] = useState([]);
  const [balance, setBalance] = useState({});

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

    //{{baseurl}}/public/api/v1/groupExpenses/getBalance?groupId=6396d9f231101b72135c7462
    fetch(
      `${localConfig.apiUrl}/public/api/v1/groupExpenses/getBalance?groupId=${params.groupId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    ).then((balance) => {
      balance.json().then((balanceJson) => {
        setBalance(balanceJson.result);
        console.log(balanceJson.result);
      });
    });
  }, [params.id]);

  async function markAsPaid(groupId) {
    alert("Paid");
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Balance Amount</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(balance).map((key) => {
            return (
              <>
                {Object.keys(balance[key]).map((keyTo) => {
                  return (
                    <tr key={keyTo}>
                      <td>{key}</td>
                      <td>{keyTo}</td>
                      <td>{balance[key][keyTo].toFixed(2)}</td>
                    </tr>
                  );
                })}
              </>
            );
          })}
        </tbody>
      </Table>
      <div className="d-grid gap-2">
        <Button
          variant="primary"
          size="lg"
          onClick={() => markAsPaid(`${params.groupId}`)}
        >
          Pay your split
        </Button>
      </div>
    </div>
  );
};

export default Balance;
