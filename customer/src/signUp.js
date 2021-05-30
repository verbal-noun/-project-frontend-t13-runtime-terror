import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "./signUp.css";

function SignUp(props) {
  const [givenname, setGivenName] = useState("");
  const [familyname, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectLogin, setRedirectLogin] = useState(false);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);

  function validateForm() {
    return (
      givenname.length > 0  && 
      familyname.length > 0 &&
      email.length > 0      && 
      password.length > 0
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setDisabled(true);
    let postData = {givenname, familyname, email, password};
    axios
      .post(
        `https://info30005-customer-backend.herokuapp.com/api/customer/register`,
        postData
      )
      .then((res) => {
        setRedirectLogin(true);
        setDisabled(false);
      })
      .catch((err) => {
        setError(err.response.data);
        setDisabled(false);
      });
  }

  if (redirectLogin) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="Login">
      <div className="left">
      <img className="logo-image" src="https://i.imgur.com/kiMFyeA.png" />
      <div className="header">
        
        <h4 className="animation a2"> Create a New Account</h4>
      </div>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="text">
          <Form.Label className="form-name" ></Form.Label>
          <Form.Control className="form-field animation a3" placeholder="Email"
            autoFocus
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group size="lg" controlId="text">
          <Form.Label className="form-name" ></Form.Label>
          <Form.Control className="form-field animation a3" placeholder="Given Name"
            autoFocus
            type="text"
            value={givenname}
            onChange={(e) => setGivenName(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group size="lg" controlId="text">
          <Form.Label className="form-name" ></Form.Label>
          <Form.Control className="form-field animation a3" placeholder="Family Name"
            autoFocus
            type="text"
            value={familyname}
            onChange={(e) => setFamilyName(e.target.value)}
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
        <p className="animation a5">Already have an account? <a href="#" onClick={setRedirectLogin}>Login</a></p>
        <Button
          className="button-b"
          block
          size="lg"
          type="submit"
          disabled={!validateForm() || disabled}
        >
          Save
        </Button>
      </Form>
      </div>
      <div className="right"></div>
    </div>

  );
}

export default SignUp;
