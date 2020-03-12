import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/authorization";
import { Link, Redirect } from "react-router-dom";
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
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <div className="card">
        <div className="card-body">
          <form
            className="form"
            action="create-profile.html"
            onSubmit={e => onSubmit(e)}
          >
            <div className="form-group">
              <input
                type="text"
                placeholder="First Name"
                name="first_name"
                value={first_name}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={last_name}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                minLength="8"
                value={password}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                minLength="8"
                value={password2}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Code"
                name="code"
                value={code}
                onChange={e => onChange(e)}
              />
              <small className="form-text">
                Only required if you are a student and your teacher has given
                you a registration code.
              </small>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="is_teacher"
                name="is_teacher"
                value={is_teacher}
                onClick={cb => onClick(cb)}
              />
              <label htmlFor="is_teacher">&nbsp;I am a teacher</label>
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
          </form>
        </div>
      </div>
      <p className="my-1">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </Fragment>
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
