import React, { Component } from "react";
import axios from "axios";
import { Link, Route, withRouter } from "react-router-dom";

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import { FlatButton } from "material-ui";
import UserForm from "./UserForm";
import UploadForm from "./UploadForm";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupOpen: false,
      index: -1,
      users: []
    };
  }
  componentDidMount() {
    axios.get("/api/users").then(res => {
      const users = res.data;
      this.setState({ users });
    });
  }
  handleOpen = () => {
    this.setState({ index: -1 });
  };

  handleClose = () => {
    this.props.history.push("/");
  };
  render() {
    const { data } = this.state.users;
    if (!data) {
      return (
        <div className="Loading bouncing-loader">
          <div />
          <div />
          <div />
        </div>
      );
    } else {
      return (
        <div className="App table">
          <div className="headingTop">
            <h3 className="header">UseList</h3>
            <Link to="/users">
              <FlatButton
                label="Create User"
                primary={true}
                style={{ color: "#2196f3" }}
                onClick={this.handleOpen}
              />
            </Link>
          </div>
          <Route
            path="/users"
            render={() => (
              <UserForm
                handleClose={this.handleClose}
                userFormSubmit={this.userFormSubmit}
              />
            )}
          />

          <div className="table">
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>OrganizationEmail</TableHeaderColumn>
                  <TableHeaderColumn>Email</TableHeaderColumn>
                  <TableHeaderColumn>Files</TableHeaderColumn>
                  <TableHeaderColumn />
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {data.map(value => {
                  return (
                    <TableRow>
                      <TableRowColumn>{value.name}</TableRowColumn>
                      <TableRowColumn>{value.organizationEmail}</TableRowColumn>
                      <TableRowColumn>{value.email}</TableRowColumn>
                      <TableRowColumn>{value.uploadFile}</TableRowColumn>
                      <TableRowColumn>
                        <Link
                          to={"/upload/" + value._id}
                          onClick={() => this.props.handleOpen()}
                        >
                          upload & ShareFile
                        </Link>
                      </TableRowColumn>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Route
              path="/upload/:userId"
              render={() => (
                <UploadForm
                  handleClose={this.handleClose}
                  uploadFormSubmit={this.uploadFormSubmit}
                />
              )}
            />
          </div>
        </div>
      );
    }
  }
}

export default withRouter(App);
