import SplitterNavBar from "./SplitterNavBar";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import localConfig from "../../../appConfig/local";

class Groups extends Component {
  state = {
    groups: [],
    userId: "",
  };

  componentDidMount = async () => {
    let userId = JSON.parse(localStorage.getItem("user-info"))._id;
    let groups = await fetch(
      `${localConfig.apiUrl}/public/api/v1/groupExpenses/getGroup?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    groups = await groups.json();
    this.setState({ groups: groups.result });
    this.state.userId = userId;
  };

  render() {
    return (
      <div>
        <SplitterNavBar />
        <br />
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" href="/splitter/groups/create">
            Create Group
          </Button>
        </div>
        <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Group Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.groups.map((group) => {
              return (
                <tr key={group._id}>
                  <td>{group.groupName}</td>
                  <td>
                    <Button
                      variant="primary"
                      href={`/splitter/groups/view/${group._id}`}
                    >
                      View
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      href={`/splitter/groups/addfriends/${group._id}`}
                    >
                      Add friends
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Groups;
