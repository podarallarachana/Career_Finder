import React, { Fragment } from "react";
import Pagination from "react-js-pagination";

class CollegePrograms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 15,
    };
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  displayData = () => {
    if (this.props.college_programs.collegeProgramsData === undefined) {
      return <div>loading</div>;
    } else if (this.props.college_programs.collegeProgramsData === null) {
      return <div>sorry, unavailable right now</div>;
    } else {
      console.log(this.props.college_programs.collegeProgramsData);
      return <div>hello</div>;
    }
  };

  displayCollegeList = () => {};

  render() {
    return (
      <Fragment>
        <div>College Programs</div>
        {this.displayData()}
        <div>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          />
        </div>
      </Fragment>
    );
  }
}

export default CollegePrograms;
