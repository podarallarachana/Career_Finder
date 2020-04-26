import React,{useEffect, useState, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Accordion, Button, Card, Form, Table} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import { getClasses } from "../../state-management/actions/classRoom";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";

/*
Student will be able to see their info such as name, id, and points
 */

const MyInfo = ({authorization: {isAuthenticated,user}}) => {

    return (
        <div>
            <h1>
                Name
            </h1>
            <p>
                {user.first_name} {user.last_name}
            </p>
            <h1>
                Id
            </h1>
            <p>
                {user._id}
            </p>
        </div>);
};

MyInfo.propTypes = {
    getClasses : PropTypes.func.isRequired,
    authorization: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authorization: state.authorization,
});

export default connect(mapStateToProps)(MyInfo);