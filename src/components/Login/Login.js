import LoginNavbar from "./LoginNavbar";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import GoogleButton from "react-google-button";
import { useState } from "react";
import localConfig from "../../appConfig/local";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === "") {
      alert("Please enter email address");
    } else if (!email.match(mailformat)) {
      alert("You have entered an invalid email address!");
    } else if (password === "") {
      alert("Please enter Password");
    } else {
      let body = { email, password };

      let result = await fetch(
        `${localConfig.apiUrl}/public/api/v1/auth/signIn`,
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
        localStorage.setItem("user-info", JSON.stringify(result.result));
        navigate("/expenseHome");
      }
    }
  }

  async function googleSignIn() {
    window.location.href = `${localConfig.apiUrl}/public/api/v1/auth/google`;
  }

  return (
    <div>
      <LoginNavbar />
      <br />
      <div style={{ marginLeft: "30px" }}>
        <Form>
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
            className="mb-3"
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
        </Form>
        <div>
          <Button variant="primary" onClick={login}>
            Login
          </Button>

          <a href="/ForgotPassword" style={{ marginLeft: "375px" }}>
            Forgot Password?
          </a>
        </div>
      </div>
      <GoogleButton
        target="_blank"
        onClick={googleSignIn}
        style={{ marginTop: "20px", marginLeft: "30px" }}
      />
    </div>
  );
}

export default Login;
