import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../state-management/actions/authorization";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import authorization from "../../state-management/reducers/authorization";

const NavigationBar = ({
  authorization: { isAuthenticated, loading ,user},
  logout
}) => {

    //added 3/27/2020
    const adminLinks = (
        //REDIRECTS USER TO LOGIN PAGE ONCE LOGGED OUT
        <Nav className="mr-auto">
            <LinkContainer to="/login" onClick={logout} href="#!">
                <Nav.Link>logout</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/explore/11-9013.03">
                <Nav.Link>explore</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
                <Nav.Link>about</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin">
                <Nav.Link>admin</Nav.Link>
            </LinkContainer>
        </Nav>
    );

  const studentLinks = (
    //REDIRECTS USER TO LOGIN PAGE ONCE LOGGED OUT
    <Nav className="mr-auto">
      <LinkContainer to="/login" onClick={logout} href="#!">
        <Nav.Link>logout</Nav.Link>
      </LinkContainer>
        <LinkContainer to="/myinfo">
            <Nav.Link>my info</Nav.Link>
        </LinkContainer>
      {/* <LinkContainer to="/find">
        <Nav.Link>find</Nav.Link>
      </LinkContainer> */}
      <LinkContainer to="/explore/11-9013.03">
        <Nav.Link>explore</Nav.Link>
      </LinkContainer>
      {/* <LinkContainer to="/prepare">
        <Nav.Link>prepare</Nav.Link>
      </LinkContainer> */}
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
      {/* <LinkContainer to="/find">
        <Nav.Link>find</Nav.Link>
      </LinkContainer> */}
      <LinkContainer to="/explore/11-9013.03">
        <Nav.Link>explore</Nav.Link>
      </LinkContainer>
      {/* <LinkContainer to="/prepare">
        <Nav.Link>prepare</Nav.Link>
      </LinkContainer> */}
      <LinkContainer to="/about">
        <Nav.Link>about</Nav.Link>
      </LinkContainer>
    </Nav>
  );

let navbar;

//Finds out type of user
if(isAuthenticated)
{
    if(user != null && user.is_teacher == true)
    {
        navbar = adminLinks;
    }
    else
    {
        navbar = studentLinks;
    }
}
else
{
    navbar = guestLinks;
}


  return (
    <Navbar>
      <LinkContainer to="/">
        <Navbar.Brand>
          <i className="fa fa-home" aria-hidden="true"></i>
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Fragment>{navbar}</Fragment>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  logout: PropTypes.func.isRequired,
  authorization: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  authorization: state.authorization,
});

export default connect(mapStateToProps, { logout })(NavigationBar);
