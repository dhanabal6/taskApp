import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import { Dialog } from "material-ui";
import { FormControl, FormGroup, Button } from "react-bootstrap";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupOpen: false,
      index: -1
    };
  }

  userFormSubmit = e => {
    e.preventDefault();
    let name = document.getElementById("formName").value;
    let organizationEmail = document.getElementById("formorganizationEmail")
      .value;
    let organizationPassword = document.getElementById(
      "formorganizationPassword"
    ).value;
    let email = document.getElementById("formEmail").value;
    const formData = {
      name: name,
      organizationEmail: organizationEmail,
      organizationPassword: organizationPassword,
      email: email
    };
    axios
      .post(`/api/users`, formData)
      .then(res => {
        console.log(res.data);
        window.location = "/";
        this.props.history.push("/");
      })
      .catch(err => {
        window.location = "/";
        console.log(err);
      });
  };

  render() {
    return (
      <Dialog
        title={
          <div className="popheader">
            User Create{" "}
            <span className="close" onClick={this.props.handleClose}>
              X
            </span>{" "}
          </div>
        }
        modal={false}
        autoScrollBodyContent={true}
        open={true}
      >
        <div className="form">
          <form ref="userForm" onSubmit={this.userFormSubmit}>
            <FormGroup controlId="formName">
              <FormControl
                type="text"
                className="name"
                name="name"
                ref="name"
                placeholder="Enter your Name"
              />
            </FormGroup>
            <FormGroup controlId="formorganizationEmail">
              <FormControl
                type="email"
                className="organizationEmail"
                name="organizationEmail"
                ref="organizationEmail"
                placeholder="Enter your organizationEmail"
              />
            </FormGroup>
            <FormGroup controlId="formorganizationPassword">
              <FormControl
                type="password"
                className="organizationPassword"
                name="organizationPassword"
                ref="organizationPassword"
                placeholder="Enter your organizationPassword"
              />
            </FormGroup>
            <FormGroup controlId="formEmail">
              <FormControl
                type="email"
                className="email"
                name="email"
                ref="email"
                placeholder="Enter your Email"
              />
            </FormGroup>
            <Button type="submit" className="Button">
              Submit
            </Button>
          </form>
        </div>
      </Dialog>
    );
  }
}

export default withRouter(UserForm);
