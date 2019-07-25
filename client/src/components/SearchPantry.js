import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  margin-top: 50px;
`;

const SearchPantry = props => {
  return (
    <Div className="container">
      <div className="row">
        <div className="input-field col l12 center-align">
          <textarea
            id="textarea1"
            className="materialize-textarea center-align"
            onChange={props.handleInputChangePantryFood}
            value={props.value}
            name="search"
            type="text"
            placeholder="Apples, cheese, lettuce, chicken"
            id="search"
          />
          <a
            className="indigo darken-4 waves-effect waves-light btn"
            onClick={props.handleFormSubmitPantryFood}
          >
            search
          </a>
        </div>
      </div>
    </Div>
  );
};

export default SearchPantry;
