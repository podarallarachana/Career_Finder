import React, { useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../state-management/actions/alert";
import { register } from "../../state-management/actions/authorization";
import { Button, Form } from "react-bootstrap";
import {Redirect} from "react-router-dom";
import Alert from "../shared/Alert";
import PropTypes from "prop-types";
import axios from "axios";

const AddClass = ({ authorization : {user}}) => {
    const [formData, setFormData] = useState({
        class_name: "",
    });

    const {
        class_name
    } = formData;

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        axios.post("/api/class",{name : class_name, teacherId : user.first_name});
        return <Redirect to="/admin"/>;
    };

    return (
        <div className="register">
            <div className="container h-100">
                <div className="row h-100  justify-content-center">
                    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-6">
                        <Alert />
                        <div
                            className="card"
                            style={{
                                border: "0px"
                            }}
                        >
                            <div className="card-body">
                                <h3 className="font-weight-light">Add Class</h3>
                                <br />
                                <Form onSubmit={e => onSubmit(e)}>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder="Class Name"
                                            name="class_name"
                                            value={class_name}
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                    </Form.Group>
                                    <Button
                                        type="submit"
                                        style={{
                                            backgroundColor: "#ee5847",
                                            border: "0px",
                                            display: "table",
                                            margin: "0 auto"
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AddClass.propTypes = {
    authorization: PropTypes.object
};

const mapStateToProps = state => ({
    authorization : state.authorization
});

export default connect(mapStateToProps, { setAlert, register })(AddClass);