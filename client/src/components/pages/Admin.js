//Added 3/27/2020
import React,{useEffect, useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, Table} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import { getClasses } from "../../state-management/actions/classRoom";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";




const Admin = ({authorization: {isAuthenticated,user},getClasses, classes : {classes}}) => {


    useEffect(() => {
        getClasses();
    });

    if (!isAuthenticated || !user.is_teacher) {
        return <Redirect to="/" />;
    }

    function deleteClass(input) {
        axios.delete("/api/class",{data :{name : input}})
    }

    //maps all class names to table
    function tableData() {
        return classes.data.map((className) =>
            <tr key={className.name}>
                <td>{className.name}</td>
                <Button onlClick={deleteClass(className.name)}>Delete</Button>
                <Button>Edit</Button>
            </tr>
        );
    }

    let adminName = user.first_name + " " + user.last_name;
    return (
        <div>
            <h1 className="font-weight-light">Admin</h1>
            <h2 className="font-weight-lighte">{adminName}</h2>
            <LinkContainer to="/AddClass">
                <Button>Add Class</Button>
            </LinkContainer>
            <Table>
                <thead>
                <tr>
                    <th>Class Name</th>
                </tr>
                </thead>
                <tbody>
                {tableData()}
                </tbody>
            </Table>
        </div>);
};

Admin.propTypes = {
    getClasses : PropTypes.func.isRequired,
    authorization: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authorization: state.authorization,
    classes: state.classRoom,
});

export default connect(mapStateToProps, {getClasses})(Admin);