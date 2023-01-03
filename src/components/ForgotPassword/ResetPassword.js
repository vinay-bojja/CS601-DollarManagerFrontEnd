import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import SignUpNavbar from "../SignUp/SignUpNavbar";
import localConfig from "../../appConfig/local";

const ResetPassword = () => {
  const params = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function resetPassword(){

    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if(password === "" || confirmPassword === ""){
      alert("You cannot have an empty password.");
    }
    else if (!password.match(passw)) {
      alert(
        "Input Password should be 8 characters atleast which contain only characters, numeric digits, special characters and first character must be a letter."
      );
    } 
    else if(JSON.stringify(password) === JSON.stringify(confirmPassword)){
      let body ={
        "ssouid":params.ssouid,
        "newPassword":password
      }
      let result = await fetch(
        `${localConfig.apiUrl}/public/api/v1/auth/forgotPassword`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      result = await result.json();
      if (typeof result.result !== "object") {
        alert(result.result);
      } else {
        console.log(JSON.stringify(result.result));
        window.location.href = "/Login";
        alert("Password reset successfully. Please login");
      }
    } else {
      alert("Password and Confirm Password does not match.");
    }

  }


  return (
    <div>
      <SignUpNavbar/>
      {/* {console.log(JSON.stringify(params.hashPassword))} */}
      <div style={{ marginLeft: "30px", marginTop: "20px" }}>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="4">
              <Form.Control
                type="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Confirm Password
            </Form.Label>
            <Col sm="4">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
        </Form>
        <Button variant="primary" onClick={resetPassword}>
          Reset Password
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;