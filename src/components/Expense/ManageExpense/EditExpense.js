import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ManageExpense from "./ManageExpense";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import localConfig from "../../../appConfig/local";

const EditExpense = () => {
  const params = useParams();
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [cost, setCost] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `${localConfig.apiUrl}/public/api/v1/expense/getExpense?expenseId=${params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    ).then((result) => {
      result.json().then((result) => {
        setCost(result.result.cost);
        setItemCategory(result.result.itemCategory);
        setItemName(result.result.itemName);
      });
    });
  }, [params.id]);

  async function updateExpense() {
    let body = {
      itemName: itemName,
      itemCategory: itemCategory,
      cost: cost,
    };

    if (itemName === "" || itemCategory === "") {
      alert("Please enter missing fields.");
    } else if (isNaN(cost) || cost === "") {
      alert("Please enter a valid cost.");
    } else {
      let result = await fetch(
        `${localConfig.apiUrl}/public/api/v1/expense/updateExpense?expenseId=${params.id}`,
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
        alert("Updated Successfully");
        navigate("/manageExpense/updateExpense");
      } else {
        alert(result.error);
      }
    }
  }

  return (
    <div>
      <ManageExpense />
      <div style={{ marginLeft: "30px", marginTop: "20px" }}>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Item Name
            </Form.Label>
            <Col sm="4">
              <Form.Control
                type="text"
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => {
                  setItemName(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Item Category
            </Form.Label>
            <Col sm="4">
              <Form.Control
                type="text"
                placeholder="Item Category"
                value={itemCategory}
                onChange={(e) => {
                  setItemCategory(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Cost
            </Form.Label>
            <Col sm="4">
              <Form.Control
                type="text"
                placeholder="Cost"
                value={cost}
                onChange={(e) => {
                  setCost(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
        </Form>
        <Button variant="primary" onClick={updateExpense}>
          Update Expense
        </Button>
      </div>
    </div>
  );
};

export default EditExpense;
