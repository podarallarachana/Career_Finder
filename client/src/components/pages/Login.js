import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../state-management/actions/authorization";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";
import Alert from "../shared/Alert";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  //REDIRECT IF SUCCESFUL LOGIN
  if (isAuthenticated) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="login">
      <div className="container h-100">
        <div className="row h-100  justify-content-center">
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-6">
            <Alert />
            <div
              className="card"
              style={{
                border: "0px"
              }}
            >
              <img
                className="card-img-top"
                src={require("../../assets/login.jpg")}
                alt="Card image cap"
              />
              <div className="card-body">
                <h1 className="font-weight-light">Login</h1>
                <Form onSubmit={e => onSubmit(e)}>
                  <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={e => onChange(e)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      minLength="8"
                      value={password}
                      onChange={e => onChange(e)}
                      required
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "	#ee5847",
                      border: "0px",
                      display: "table",
                      margin: "0 auto"
                    }}
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.authorization.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
