import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Dialog } from "material-ui";
import { FormControl, FormGroup, ControlLabel, Button } from "react-bootstrap";

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupOpen: false,
      index: -1
    };
  }

  uploadFormSubmit = e => {
    e.preventDefault();
    let organizationEmail = document.getElementById("formorganizationEmail")
      .value;
    let uploadFile = document.getElementById("formControlsFiles").files[0];
    const formData = new FormData();
    formData.append("organizationEmail", organizationEmail);
    formData.append("uploadFile", uploadFile);
    const userId = this.props.match.params.userId;
    axios
      .post(`/api/upload/${userId}`, formData)
      .then(res => {
        console.log(res.data);
        // window.location = "/";
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
        // window.location = "/";
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
          <form ref="uploadForm" onSubmit={this.uploadFormSubmit}>
            <FormGroup controlId="formorganizationEmail">
              <FormControl
                type="email"
                className="organizationEmail"
                name="organizationEmail"
                ref="organizationEmail"
                placeholder="Enter your organizationEmail"
              />
            </FormGroup>

            <FormGroup controlId="formControlsFiles" className="files">
              <ControlLabel className="fileUpload">
                <span>Select Files</span>
              </ControlLabel>
              <FormControl type="file" name="uploadFile" ref="uploadFile" />
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

export default withRouter(UploadForm);
