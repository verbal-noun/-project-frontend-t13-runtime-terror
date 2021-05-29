
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./editUser.css";
import {Field, reduxForm} from 'redux-form';


const ChangePasswordForm = (props) => {
  return (
    <form  className="form-change-details">

      
        <Field component="input"
             name="userName"
             type="text"
             placeholder="Current Username"
             className="form-control"
      />
      
      
      
      <Field component="input"
             name="currentPassword"
             type="password"
             placeholder="Current Password"
             required="required"
             className="form-control"
      />

      <Field component="input"
             name="newPassword"
             type="password"
             placeholder="New Password"
             required="required"
             className="form-control"
      />

      <Field component="input"
             name="newPasswordRepeated"
             type="password"
             placeholder="New Password Repeated"
             required="required"
             className="form-control"
      />

      <Button type="submit"
              size="lg"
              block
              color="success"
      >
        Change Password
      </Button>
    </form>
  );

};

ChangePasswordForm.propTypes = {
};

export default reduxForm({
  form: 'change-password'
})(ChangePasswordForm);