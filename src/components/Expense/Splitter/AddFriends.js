import SplitterNavBar from "./SplitterNavBar";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import localConfig from "../../../appConfig/local";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const AddFriends = () => {
  const params = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(
      `${localConfig.apiUrl}/public/api/v1/auth/getAddFriendUsers/${params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    ).then((result) => {
      result.json().then((result) => {
        setUsers(result.result);
      });
    });
  }, [params.id]);

  async function addFriend(userId) {
    let body = {
      userIds: [userId],
    };

    if (userId === "") {
      alert("Please enter missing fields.");
    } else {
      let result = await fetch(
        `${localConfig.apiUrl}/public/api/v1/groupExpenses/updateGroup?id=${params.id}`,
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
        alert("Friend Added to the group");
        window.location.reload(true);
      } else {
        alert(result.error);
      }
    }
  }

  return (
    <div>
      <SplitterNavBar />
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => addFriend(`${user._id}`)}
                  >
                    Add Friend
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

export default AddFriends;
