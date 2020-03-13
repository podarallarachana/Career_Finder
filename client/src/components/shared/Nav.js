import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../state-management/actions/authorization";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

const NavigationBar = ({
  authorization: { isAuthenticated, loading },
  logout
}) => {
  // MUST ALSO ADD TEACHER ADMIN LINKS

  const studentLinks = (
    //REDIRECTS USER TO LOGIN PAGE ONCE LOGGED OUT
    <Nav className="mr-auto">
      <LinkContainer to="/login" onClick={logout} href="#!">
        <Nav.Link>Logout</Nav.Link>
      </LinkContainer>
      <LinkContainer to="#">
        <Nav.Link>Explore</Nav.Link>
      </LinkContainer>
      <LinkContainer to="#">
        <Nav.Link>About</Nav.Link>
      </LinkContainer>
    </Nav>
  );

  const guestLinks = (
    <Nav className="mr-auto">
      <LinkContainer to="/login">
        <Nav.Link>Login</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/register">
        <Nav.Link>Register</Nav.Link>
      </LinkContainer>
      <LinkContainer to="#">
        <Nav.Link>Explore</Nav.Link>
      </LinkContainer>
      <LinkContainer to="#">
        <Nav.Link>About</Nav.Link>
      </LinkContainer>
    </Nav>
  );

  return (
    <Navbar bg="light" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>
          <i className="fa fa-home"></i>
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Fragment>{isAuthenticated ? studentLinks : guestLinks}</Fragment>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  logout: PropTypes.func.isRequired,
  authorization: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authorization: state.authorization
});

export default connect(mapStateToProps, { logout })(NavigationBar);
