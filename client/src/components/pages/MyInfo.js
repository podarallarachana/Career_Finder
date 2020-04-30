import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

/*
Student will be able to see their info such as name, id, and points
 */
const MyInfo = ({ authorization: { isAuthenticated, user } }) => {
    let count = 0;
    user.points.forEach(point => {
        count += point;
    });
  return (
    <div>
      <h1>Name</h1>
      <p>
        {user.first_name} {user.last_name}
      </p>
      <h1>Id</h1>
        <p>
            {user._id}
        </p>
        <h1>Id</h1>
        <p>{count}</p>
    </div>

  );
};

MyInfo.propTypes = {
  getClasses: PropTypes.func.isRequired,
  authorization: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authorization: state.authorization,
});

export default connect(mapStateToProps)(MyInfo);
