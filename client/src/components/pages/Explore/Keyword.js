import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { Form, Alert } from "react-bootstrap";

const Keyword = () => {
  return (
    <div className="keywordsearch">
      {" "}
      <Form>
        <label htmlFor="location">
          <h1>Keyword Search</h1>
        </label>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            placeholder="pottery..."
            id="keyword_search"
          />
        </InputGroup>
      </Form>
    </div>
  );
};

export default Keyword;
