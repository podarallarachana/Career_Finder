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

    const [datas, setDatas] = useState([]);
    const [isLoading, toggleLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/class/classes").then(function(results) {
            setDatas(results.data);
        toggleLoading(false);
        })}, [isLoading]
    );


    if (!isAuthenticated || !user.is_teacher) {
        return <Redirect to="/" />;
    }

    //maps all class names to table
    function tableData() {
        return datas.map((className) =>
            <tr key={className.name}>
                <td>
                    {className.name}
                </td>
                <td>
                    {className._id}
                </td>
            </tr>
        );
    }

    let adminName = user.first_name + " " + user.last_name;
    return (
        <div>
            {isLoading && <p>Loading</p>}
            {!isLoading &&
            <div>
            <h1 className="font-weight-light">Admin</h1>
            <h2 className="font-weight-lighte">{adminName}</h2>
            <LinkContainer to="/AddClass">
                <Button>Add Class</Button>
            </LinkContainer>
                <LinkContainer to="/DeleteClass">
                    <Button>Delete Class</Button>
                </LinkContainer>
            <Table>
                <thead>
                <tr>
                    <th>Class Name</th>
                    <th>Registration Code</th>
                </tr>
                </thead>
                <tbody>
                {tableData()}
                </tbody>
            </Table>
            </div>}
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