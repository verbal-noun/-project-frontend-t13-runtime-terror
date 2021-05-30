import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "./signUp.css";

function SignUp(props) {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [redirectHome, setRedirectHome] = useState(false);

  function validateForm() {
    return (email.length > 0 || (password.length > 0 && password == passwordConfirm)) ;
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    axios
      .post(
        `https://info30005-customer-backend.herokuapp.com/api/customer/update`
        
      )
      .then((res) => {
        setRedirectHome(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  if (redirectHome) {
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
          <Form.Control className="form-field animation a3" placeholder="Full Name"
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group size="lg" controlId="text">
          <Form.Label className="form-name" ></Form.Label>
          <Form.Control className="form-field animation a3" placeholder="Email"
            autoFocus
            type="text"
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
        <Form.Group size="lg" controlId="confirmPassword">
          <Form.Label className="form-name" ></Form.Label>
          <Form.Control className="form-field animation a4" placeholder="Confirm Password"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </Form.Group>
        
        <p className="animation a5"><a href="#">Forgot Password</a></p>
        <Button
          className="button"
          block
          size="lg"
          type="submit"
          disabled={!validateForm()}
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
