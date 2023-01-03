import SignUpNavbar from "../SignUp/SignUpNavbar";
import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import localConfig from "../../appConfig/local";

class ForgotPassword extends Component {
  state = {
    email: "",
  };

  sendForgotPasswordLink = async () => {
    console.log(this.state.email);
    let result = await fetch(
      `${localConfig.apiUrl}/public/api/v1/auth/sendForgotPasswordLink`,
      {
        method: "POST",
        body: JSON.stringify({ email: this.state.email }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    result = await result.json();
    if (result) {
      alert("Reset Password link sent successfully.");
      window.location.href = "/Login";
    }
  };

  render() {
    return (
      <div>
        <SignUpNavbar />
        <br />
        {/* <p>Forgot Password Page</p> */}
        <div style={{ marginLeft: "30px" }}>
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="1">
                Email
              </Form.Label>
              <Col sm="4">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </Col>
            </Form.Group>
          </Form>
          <div>
            <Button variant="primary" onClick={this.sendForgotPasswordLink}>
              Send Forgot Password Link
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
