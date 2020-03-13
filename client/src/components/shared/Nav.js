import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/authorization";

const Navbar = ({ authorization: { isAuthenticated, loading }, logout }) => {
  // MUST ALSO ADD TEACHER ADMIN LINKS

  const studentLinks = (
    <ul>
      <li>
        <Link to="/login" onClick={logout} href="#!">
          Logout
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <a href="#">Explore</a>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="#">About</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fa fa-home"></i>
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? studentLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  authorization: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authorization: state.authorization
});

export default connect(mapStateToProps, { logout })(Navbar);
