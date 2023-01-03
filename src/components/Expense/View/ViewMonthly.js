import React, { Component } from "react";
import localConfig from "../../../appConfig/local";
import ExpenseNavbar from "../ExpenseNavBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

class ViewMonthly extends Component {
  state = {
    expenses: [],
    startDate: Date(),
    endDate: Date(),
    totalCost: 0,
  };

  async getExpensesInDateRange() {
    let userId = JSON.parse(localStorage.getItem("user-info"))._id;
    let body = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    };
    let userExpenseData = await fetch(
      `${localConfig.apiUrl}/public/api/v1/expense/getExpensesInDateRange?userId=${userId}`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    userExpenseData = await userExpenseData.json();
    let allExpenses;
    if (userExpenseData.result.length !== 0) {
      allExpenses = userExpenseData.result;
      this.state.totalCost = 0;
      for (let expense in allExpenses) {
        this.state.totalCost =
          this.state.totalCost + parseInt(allExpenses[expense].cost);
      }
    }
    this.setState({ expenses: allExpenses });
  }

  componentDidMount = async () => {
    this.getExpensesInDateRange();
  };

  view = () => {
    this.getExpensesInDateRange();
  };

  render() {
    return (
      <div>
        <ExpenseNavbar />
        <div>
          StartDate
          <DatePicker
            onChange={(date) => this.setState({ startDate: date })}
            dateFormat="MM/dd/yyyy"
            isClearable
            showYearDropdown
            showMonthDropdown
            scrollableMonthYearDropdown
          />
          EndDate
          <DatePicker
            onChange={(date) => this.setState({ endDate: date })}
            minDate={this.state.startDate}
            isClearable
            showYearDropdown
            showMonthDropdown
            scrollableMonthYearDropdown
          />
          <br></br>
          <br></br>
          <Button variant="primary" onClick={this.view}>
            View
          </Button>
        </div>
        <br></br>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Item Category</th>
              <th>Cost($)</th>
              <th>Date of Purchase</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {this.state?.expenses?.map((expense) => {
              return (
                <tr key={expense._id}>
                  {/* colSpan={2} */}
                  <td input="text" value={expense.itemName}>
                    {expense.itemName}
                  </td>
                  <td>{expense.itemCategory}</td>
                  <td>{expense.cost}</td>
                  <td>{expense.createdAt.split("T")[0]}</td>
                </tr>
              );
            })}
            {
              <tr>
                {/* colSpan={2} */}
                <td input="text"></td>
                <td>Total Expenditure</td>
                <td>{this.state.totalCost}</td>
                <td></td>
              </tr>
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ViewMonthly;
