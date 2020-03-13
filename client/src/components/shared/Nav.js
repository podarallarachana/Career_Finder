import React, { Fragment } from "react";
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
        <Nav.Link>logout</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/explore">
        <Nav.Link>explore</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/about">
        <Nav.Link>about</Nav.Link>
      </LinkContainer>
    </Nav>
  );

  const guestLinks = (
    <Nav className="mr-auto">
      <LinkContainer to="/login">
        <Nav.Link>login</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/register">
        <Nav.Link>register</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/explore">
        <Nav.Link>explore</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/about">
        <Nav.Link>about</Nav.Link>
      </LinkContainer>
    </Nav>
  );

  return (
    <Navbar
      style={{
        backgroundColor: "#fff",
        boxShadow: " 0px 3px 3px 0px rgba(0,0,0,0.25)"
      }}
      expand="lg"
    >
      <LinkContainer to="/">
        <Navbar.Brand>
          <i className="fa fa-home" aria-hidden="true"></i>
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
