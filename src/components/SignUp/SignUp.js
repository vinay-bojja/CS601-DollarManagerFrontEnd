import SignUpNavbar from "./SignUpNavbar";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import GoogleButton from "react-google-button";
import React, { useState } from "react";
import localConfig from "../../appConfig/local";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function signUp() {
    let body = { email, name, password };

    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (name === "") {
      alert("Please enter your name.");
    } else if (!email.match(mailformat)) {
      alert("Invalid email address.");
    } else if (!password.match(passw)) {
      alert(
        "Input Password should be 8 characters atleast which contain only characters, numeric digits, special characters and first character must be a letter."
      );
    } else if (JSON.stringify(password) === JSON.stringify(confirmPassword)) {
      let result = await fetch(
        `${localConfig.apiUrl}/public/api/v1/auth/signUp`,
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
        navigate("/Login");
        alert("Signed up successfully! Please login.");
      }
    } else {
      alert("Please enter Password and Confirm Password correct.");
    }
  }

  async function googleSignIn() {
    window.location.href = `${localConfig.apiUrl}/public/api/v1/auth/google`;
  }

  return (
    <div>
      <SignUpNavbar />
      <br />
      <div style={{ marginLeft: "30px" }}>
        {/* Login Page */}
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="1">
              Name
            </Form.Label>
            <Col sm="4">
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="1">
              Email
            </Form.Label>
            <Col sm="4">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-4"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="1">
              Password
            </Form.Label>
            <Col sm="4">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="1">
              Confirm Password
            </Form.Label>
            <Col sm="4">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
        <div>
          <Button variant="primary" onClick={signUp}>
            SignUp
          </Button>
          <a href="/ForgotPassword" style={{ marginLeft: "365px" }}>
            Forgot Password?
          </a>
        </div>
      </div>
      <GoogleButton
        onClick={googleSignIn}
        style={{ marginTop: "20px", marginLeft: "30px" }}
      />
    </div>
  );
}

export default SignUp;
