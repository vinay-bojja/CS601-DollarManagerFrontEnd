import React, { Component } from "react";
import ManageExpense from "./ManageExpense";
import localConfig from "../../../appConfig/local";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

class DeleteExpense extends Component {
  state = {
    expenses: [],
  };

  async setStateData(){
    let userId = JSON.parse(localStorage.getItem("user-info"))._id;
    let userExpenseData = await fetch(
      `${localConfig.apiUrl}/public/api/v1/expense/getAllExpenseOfUser?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    userExpenseData = await userExpenseData.json();
    let allExpenses = userExpenseData.result.expenseIds.reverse();
    this.setState({ expenses: allExpenses });
  }

  componentDidMount = async () => {
    this.setStateData();
  };

  async deleteExpense(expenseId){
    const result = await fetch(
        `${localConfig.apiUrl}/public/api/v1/expense/deleteExpense?expenseId=${expenseId}`,
        {
          method: "DELETE",
        }
      );
      console.log(result);
      this.setStateData();
  }

  render() {
    return (
      <div>
        <ManageExpense />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Item Category</th>
              <th>Cost($)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
            this.state.expenses.map((expense) => {
              return (
                <tr key={expense._id}>
                  {/* colSpan={2} */}
                  <td input="text" value={expense.itemName}>{expense.itemName}</td>
                  <td>{expense.itemCategory}</td>
                  <td>{expense.cost}</td>
                  <td>
                    <Button variant="danger" onClick={() =>this.deleteExpense(expense._id)}>Delete</Button>
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

export default DeleteExpense;
