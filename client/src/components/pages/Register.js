import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../state-management/actions/alert";
import { register } from "../../state-management/actions/authorization";
import { Link, Redirect } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Alert from "../shared/Alert";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
    is_teacher: false,
    code: "" //only empty for students with no teacher
  });

  const {
    first_name,
    last_name,
    email,
    password,
    password2,
    is_teacher,
    code
  } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onClick = cb => {
    setFormData({
      ...formData,
      is_teacher: cb.target.checked
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Make sure passwords match", "danger");
    } else {
      register({
        first_name,
        last_name,
        email,
        password,
        is_teacher,
        code
      });
    }
  };

  //REDIRECT IF SUCCESFUL REGISTER
  if (isAuthenticated) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="register">
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
                src={require("../../assets/register.jpg")}
                alt="Card image cap"
              />
              <div className="card-body">
                <h3 className="font-weight-light">Register</h3>
                <br />
                <Form onSubmit={e => onSubmit(e)}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      name="first_name"
                      value={first_name}
                      onChange={e => onChange(e)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      name="last_name"
                      value={last_name}
                      onChange={e => onChange(e)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
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
                  <Form.Group>
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                      name="password2"
                      minLength="8"
                      value={password2}
                      onChange={e => onChange(e)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Code"
                      name="code"
                      value={code}
                      onChange={e => onChange(e)}
                    />
                    <Form.Text className="text-muted">
                      *Only required if you are a student and your teacher has
                      given you a registration code.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      id="is_teacher"
                      name="is_teacher"
                      value={is_teacher}
                      onClick={cb => onClick(cb)}
                      label="I'm a teacher"
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#ee5847",
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.authorization.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
