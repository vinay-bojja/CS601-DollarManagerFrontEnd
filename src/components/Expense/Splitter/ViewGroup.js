import SplitterNavBar from "./SplitterNavBar";
import localConfig from "../../../appConfig/local";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GroupNavBar from "./GroupNavBar";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";

const ViewGroup = () => {
  const params = useParams();
  const [group, setGroup] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function a() {
      fetch(
        `${localConfig.apiUrl}/public/api/v1/groupExpenses/getGroup?groupId=${params.id}`,
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
    }
    a();
  }, [params.id]);

  return (
    <div>
      <SplitterNavBar />
      <h1>
        <b>Group Name:</b> {group.groupName}
      </h1>
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
      <GroupNavBar groupId={params.id} />
    </div>
  );
};

export default ViewGroup;
