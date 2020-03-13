import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../state-management/actions/authorization";
import PropTypes from "prop-types";

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
    <Fragment>
      <h1 className="large text-primary">Login</h1>
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
            <input type="submit" className="btn btn-primary" value="Login" />
          </form>
        </div>
      </div>
      <p className="my-1">
        Don't have an account yet? <Link to="/register">Register</Link>
      </p>
    </Fragment>
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
