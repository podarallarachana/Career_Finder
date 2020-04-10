//Added 3/27/2020
import React,{useEffect, useState, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Accordion, Button, Card, Form, Table} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import { getClasses } from "../../state-management/actions/classRoom";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";


const Admin = ({authorization: {isAuthenticated,user},getClasses, classes : {classes}}) => {

    const [datas, setDatas] = useState([]);
    const [isLoading, toggleLoading] = useState(true);
    const [selected, changeSelection] = useState("");
    const [currentClass, selectCurrentClass] = useState(null);
    const [view, changeView] = useState("classes");
    const [formData, setFormData] = useState({
        class_name: ""
    });

    useEffect(() => {
        axios.get("/api/class/classes").then(function(results) {
            setDatas(results.data);
        toggleLoading(false);
        })}, [view]
    );


    if (!isAuthenticated || !user.is_teacher) {
        return <Redirect to="/" />;
    }

    const {
        class_name
    } = formData;

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = async e => {
        e.preventDefault();
        await axios.post("/api/class",{name : class_name, teacherId : user.first_name}).then(
            function() {
                changeView("classes");
                setFormData({class_name: ""});
                console.log("submitted");
            }
            );
    };

    async function onDelete() {
        if(view !== "classes") {
            await axios.delete("/api/class", {data: {name: selected}}).then(
                function() {
                    changeView("classes");
                    changeSelection("");
                }
            );
        }
    }

    function onAdd() {
        changeView("addclass");
    }

    function studentData() {
        console.log(currentClass.ofStudentId);
        return currentClass.ofStudentId.map((student) =>
                <Card key={student}>
                    <Card.Header>
                        {student.name}
                    </Card.Header>
                </Card>
        );

    }
    //maps all class names to table
    function tableData() {
        return datas.map((className) =>
            <tr key={className.name}>
                <td onClick = {() => {changeSelection(className.name); selectCurrentClass(className); changeView("viewclass")}}>
                    {className.name}
                </td>
                <td>
                    {className._id}
                </td>
            </tr>
        );
    }

    function currentView() {
            switch(view) {
                case "classes":
                    return (
                        <div>
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
                        </div>
                    );
                case "viewclass":
                    return (
                        <Accordion>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        {currentClass.name}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <h1>Total Points</h1>
                                        <h1>Points by Module</h1>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        Students
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        {studentData()}
                                        <Button>Add Student</Button>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    );
                case "addclass":
                    return (
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
                            >
                                Add
                            </Button>
                        </Form>
                    );
                default:
                    return (<div></div>);
            }
    }

    return (
        <div>
            {isLoading && <p>Loading</p>}
            <h1 className="font-weight-light">Admin</h1>
            <h2 className="font-weight-lighte">Hello {user.first_name}</h2>
            {view!== "classes" ? <Button onClick={() => {changeView("classes"); changeSelection("")}}>View Classes</Button> : <div></div>}
            {selected !== "" ? <Button onClick={() => {onDelete()}}>Delete Current Class</Button> : <div></div>}
            {view !== "addclass" ? <Button onClick={() => {onAdd(); changeSelection("")}}>Add Class</Button> : <div></div>}
            {!isLoading && currentView()
            }
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