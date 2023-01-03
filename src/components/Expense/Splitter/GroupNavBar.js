import { Component } from "react";
import Nav from "react-bootstrap/Nav";

class GroupNavBar extends Component {
  state = {
    groupId: "",
  };

  render() {
    return (
      <div>
        <Nav justify variant="tabs">
          <Nav.Item>
            <Nav.Link
              href={`/splitter/groups/addgroupexpense/${this.props.groupId}`}
              eventKey="link-1"
            >
              Add Expense
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href={`/splitter/groups/viewdeletegroupexpense/${this.props.groupId}`}
              eventKey="link-2"
            >
              View Expenses
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href={`/splitter/groups/balance/${this.props.groupId}`}
              eventKey="link-2"
            >
              Show Balance
            </Nav.Link>
          </Nav.Item>
        </Nav>
        {/* {this.props.groupId} */}
      </div>
    );
  }
}

export default GroupNavBar;
