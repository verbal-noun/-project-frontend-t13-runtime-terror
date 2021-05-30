import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function LoginPage(props) {
  const [vendor_id, setVendorID] = useState("");
  const [password, setPassword] = useState("");
  const [redirectHome, setRedirectHome] = useState(false);
  const [failed, setFailed] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const token = sessionStorage.getItem('token');
  if (token) {
    return (
      <Redirect to="/" />
    )
  }

  function validateForm() {
    return vendor_id.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setDisabled(true);
    let postData = { name: vendor_id, password };
    axios
      .post(
        `https://info30005-vendor-backend.herokuapp.com/api/vendor/login`,
        postData
      )
      .then((res) => {
        // Set global auth token for whenever an axios request is sent
        sessionStorage.setItem('token', res.data.token);
        setRedirectHome(true);
      })
      .catch((err) => {
        setFailed(true);
        setDisabled(false);
      });
  }

  if (redirectHome) {
    return <Redirect push to="/" />;
  }
  return (

    <div className="Login">
      <div className="left">
      <img className="logo-image" src="https://i.imgur.com/kiMFyeA.png" />
      <div className="header">
        <h2 className="animation a1"> Welcome!</h2>
        <h4 className="animation a2"> Log in to your account with your vendor ID and password.</h4>
      </div>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="vendor_id">
          <Form.Label className="form-name" ></Form.Label>
          <Form.Control className="form-field animation a3" placeholder="Vendor ID"
            autoFocus
            type="Vendor ID"
            value={vendor_id}
            onChange={(e) => setVendorID(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label className="form-name" ></Form.Label>
          <Form.Control className="form-field animation a4" placeholder="Password"
            type="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {failed ? <p class="login-error">Incorrect name or password</p> : null}
        <p className="animation a5"><a href="#">Forgot Password</a></p>
        <Button
          className="button"
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
