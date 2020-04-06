import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Form } from "react-bootstrap";
import {Redirect} from "react-router-dom";
import Alert from "../shared/Alert";
import PropTypes from "prop-types";
import axios from "axios";

const AddClass = ({ authorization : {user}}) => {
    const [formData, setFormData] = useState({
        class_name: "",
        d1: null, d2: null, d3: null, d4: null, d5: null,
        d6 : null, d7 : null, d8 : null, d9 : null, d10 : null,
        d11 : null, d12 : null, d13 : null, d14 : null, d15 : null,
        d16 : null
    });
    const [submitted, toggleSubmitted] = useState(false)
    const {
        class_name,
        d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14,
        d15, d16
    } = formData;

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        axios.post("/api/class",{name : class_name, teacherId : user.first_name, d1: d1, d2: d2, d3: d3,
                                            d4: d4, d5: d5, d6: d6, d8 : d8, d9 :d9, d10: d10, d11 : d11, d12: d12,
                                            d13 : d13, d14: d14, d15: d15, d16: d16});
        toggleSubmitted(true);
    };

    return ( submitted? <Redirect to="/admin"/> :
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
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                            name="d1"
                                            value={d1}
                                            onChange={e => onChange(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                            name="d2"
                                            value={d2}
                                            onChange={e => onChange(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                            name="d3"
                                            value={d3}
                                            onChange={e => onChange(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                            name="d4"
                                            value={d4}
                                            onChange={e => onChange(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                            name="d5"
                                            value={d5}
                                            onChange={e => onChange(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                            name="d6"
                                            value={d6}
                                            onChange={e => onChange(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                            name="d7"
                                            value={d7}
                                            onChange={e => onChange(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                            name="d8"
                                            value={d8}
                                            onChange={e => onChange(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                            name="d9"
                                            value={d9}
                                            onChange={e => onChange(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                            name="d10"
                                            value={d10}
                                            onChange={e => onChange(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                            name="d11"
                                            value={d11}
                                            onChange={e => onChange(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                            name="d12"
                                            value={d12}
                                            onChange={e => onChange(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                            name="d13"
                                            value={d13}
                                            onChange={e => onChange(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                            name="d14"
                                            value={d14}
                                            onChange={e => onChange(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                            name="d15"
                                            value={d15}
                                            onChange={e => onChange(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                            name="d16"
                                            value={d16}
                                            onChange={e => onChange(e)}
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

export default connect(mapStateToProps)(AddClass);