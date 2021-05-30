import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "./login.css";


// Function for displaying the login page where a user gets to login
function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectSignup, setRedirectSignup] = useState(false);
  const [redirectHome, setRedirectHome] = useState(false);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);

  // Requires a valid credential to login
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  // Function that deals with the backend validation
  function handleSubmit(event) {
    event.preventDefault();
    let postData = { email, password };
    setDisabled(true);
    axios
      .post(
        `https://info30005-customer-backend.herokuapp.com/api/customer/login`,
        postData
      )
      .then((res) => {
        // Set global auth token for whenever an axios request is sent
        localStorage.setItem('token', res.data.token);
        setRedirectHome(true);
        setDisabled(false);
      })
      .catch((err) => {
        setError("Incorrect email or password.");
        setDisabled(false);
      });
  }

  if (redirectHome) {
    return <Redirect to="/" />;
  }
  if (redirectSignup) {
    return <Redirect to="/signup" />;
  }

  // login page display jsx part to display components
  return (

    <div className="Login">
      <div className="left">
      <img className="logo-image" src="https://i.imgur.com/kiMFyeA.png" />
      <div className="header">
        <h2 className="animation a1">Welcome Back</h2>
        <h4 className="animation a2"> Log in to your account using email and password</h4>
      </div>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label className="form-name" ></Form.Label>
          <Form.Control className="form-field animation a3" placeholder="Email Address"
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label className="form-name" ></Form.Label>
          <Form.Control className="form-field animation a4" placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {error.length ? <p className="error">{error}</p> : null}
        <p className="animation a5">Don't have an account yet? <a href="#" onClick={setRedirectSignup}>Sign up</a></p>
        <Button
          className="button-b"
          block
          size="lg"
          type="submit"
          disabled={!validateForm() || disabled}
        >
          Login
        </Button>
      </Form>
      </div>
      <div className="right"></div>
    </div>

  );
}

export default LoginPage;
