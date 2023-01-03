import ExpenseNavbar from "./ExpenseNavBar";
import { Component } from "react";

class ExpenseHome extends Component {
  state = {};
  render() {
    return (
      <div>
        <ExpenseNavbar />
        <h1>{this.welcome()}</h1>
      </div>
    );
  }

  welcome() {
    let userInfo = localStorage.getItem("user-info");
    userInfo = JSON.parse(userInfo);
    return `Welcome ${userInfo.name}`;
  }
}

export default ExpenseHome;
