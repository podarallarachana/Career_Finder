import React from "react";
import PropTypes from "prop-types";
<<<<<<< HEAD
import {connect} from "react-redux";
=======
import { connect } from "react-redux";
>>>>>>> 5a2c9ba139ce87947400fbbc9634f4b0570f98a8
/*
Student will be able to see their info such as name, id, and points
 */

<<<<<<< HEAD
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
            <h1>Points</h1>
            <p>
                {user.points[0]}
            </p>
        </div>);
};

MyInfo.propTypes = {
    authorization: PropTypes.object.isRequired,
=======
const MyInfo = ({ authorization: { isAuthenticated, user } }) => {
  return (
    <div>
      <h1>Name</h1>
      <p>
        {user.first_name} {user.last_name}
      </p>
      <h1>Id</h1>
      <p>{user._id}</p>
    </div>
  );
};

MyInfo.propTypes = {
  getClasses: PropTypes.func.isRequired,
  authorization: PropTypes.object.isRequired,
>>>>>>> 5a2c9ba139ce87947400fbbc9634f4b0570f98a8
};

const mapStateToProps = (state) => ({
  authorization: state.authorization,
});

export default connect(mapStateToProps)(MyInfo);
