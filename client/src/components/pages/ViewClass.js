import React,{useEffect, useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, Form, Table} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import { getClasses } from "../../state-management/actions/classRoom";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";


const ViewClass = ({authorization}) => {
    //type in class you want to view
    const [formData, setFormData] = useState({
        class_name: ""
    });

    const [submitted, toggleSubmitted] = useState(false);
    const [currentClass, toggleClass] = useState();

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
        axios.get("/api/class", {data: {name: class_name}} ).then(function(result) {
            toggleClass(result.data);
            console.log(result.data);
            console.log(currentClass);
            toggleSubmitted(true);
        });
    };
    //return either empty or render stuff about the class and student scores
    return (
        <div>
        <Form onSubmit={e => onSubmit(e)}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Class to be Viewed"
                    name="class_name"
                    value={class_name}
                    onChange={e => onChange(e)}
                    required
                />
            </Form.Group>
        </Form>
            <div>
                {submitted && <h1>{currentClass.data.name}</h1>}
            </div>

        </div>
    );
};

ViewClass.propTypes = {
    authorization: PropTypes.object
};

const mapStateToProps = state => ({
    authorization: state.authorization
});

export default connect(mapStateToProps)(ViewClass);