import ExpenseNavbar from "../ExpenseNavBar";
import SplitterNavBar from "../Splitter/SplitterNavBar";
import React, { Component } from "react";

class Splitter extends Component {
  state = {};
  render() {
    return (
      <div>
        <SplitterNavBar />
        <h2>Splitter Page</h2>
      </div>
    );
  }
}

export default Splitter;
