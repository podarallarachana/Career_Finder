import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { Link } from "react-router-dom";

const Login = props => {
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
    console.log(formData);
  };

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
            <input type="submit" className="btn btn-primary" value="Register" />
          </form>
        </div>
      </div>
      <p className="my-1">
        Don't have an account yet? <Link to="/register">Register</Link>
      </p>
    </Fragment>
  );
};

export default connect(null, { setAlert })(Login);
